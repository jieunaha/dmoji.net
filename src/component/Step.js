import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import Button from 'react-bootstrap/lib/Button';

import { getEndDateForSimilarWeb, getStartDateForSimilarWeb } from '../utils';
import { extractedDummy } from '../dummydata';
import loadingSpinner from '../../asset/img/loading-icon.gif';

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trRes: null,
      isReportYesClicked: this.props.isExpended,
      isReportNoClicked: false,
      startDate: '',
      endDate: '',
      reportCost: '',
      avgTraffic: '',
      isLoading: false,
    };
  }

  reqTraffic() {
    if(!(this.props.exist && this.props.exist.length > 0 && !this.state.isReportNoClicked)) return;

    if(this.props.lookupDomain === 'dummy.data') {
      this.setState({
        ...extractedDummy,
        isLoading: false,
      });
      return;
    }

    const isCached = localStorage.getItem(this.props.lookupDomain + '-r');
    const cached = isCached && JSON.parse(isCached);
    const isNotExpired = cached && (((new Date()).valueOf() - cached['date']) < 2.628e+9);

    if(isNotExpired) {
      this.setState({
        ...cached,
        isLoading: false,
      });
      return;
    }

    const now = new Date();
    const headers = new Headers({'x-requested-with': 'XMLHttpRequest'});

    fetch(`https://moji-cors-anywhere.herokuapp.com/https://api.similarweb.com/v1/website/${this.props.lookupDomain}/total-traffic-and-engagement/visits?api_key=88b8b524f7c04567ad26b97afd990996&start_date=${getStartDateForSimilarWeb(now)}&end_date=${getEndDateForSimilarWeb(now)}&main_domain_only=true&granularity=monthly`, {
      method: 'GET',
      headers: headers
    })
    .then(res => res.json())
    .then(data => {
      const startDate = data['meta']['request']['start_date'];
      const endDate = data['meta']['request']['end_date'];
      const avgTraffic = Math.round(((data['visits'].map(e => e['visits'])).reduce((acc, cur) => acc + cur)) / 3);
      let reportCost;

      if (avgTraffic < 10000) {
        reportCost = this.props.reportCostTable['0~10000'];
      } else if(avgTraffic < 100000) {
        reportCost = this.props.reportCostTable['100000~1000000'];
      } else if(avgTraffic < 1000000) {
        reportCost = this.props.reportCostTable['100000~1000000'];
      }

      const reportCostState = {
        startDate: startDate,
        endDate: endDate,
        reportCost: reportCost,
        avgTraffic: avgTraffic
      };

      localStorage.setItem(this.props.lookupDomain + '-r', JSON.stringify({
        ...reportCostState,
        date: (new Date()).valueOf()
      }));

      this.setState({
        ...reportCostState,
      });
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  onClickYes(e) {
    this.setState({
      isReportYesClicked: true,
    });
    this.props.onClickYes();
  }

  onClickNo(e) {
    this.setState({
      isReportNoClicked: true,
      isLoading: true,
    });
    this.reqTraffic();
  }

  render() {
    return (
      <div className={"res res-" + (this.props.stepLabel === '전환' ? '2' : '1')}>
        <section className="thumb">
          <div>
            <h2>{this.props.lookupDomain}의 {this.props.stepLabel}도구 설치 현황</h2>
          </div>
          <If condition={this.props.exist && this.props.exist.length > 0}>
            <ul className="exist thumb-list">
              <h3>설치 완료 된 {this.props.stepLabel} 도구</h3>
              <div>
                {this.props.exist.map((item, i) => <li key={(this.props.stepLabel === '전환' ? 'tr-exist-' : 'an-exist-') + i}>{item}</li>)}
              </div>
            </ul>
          </If>
          <If condition={this.props.yet && this.props.yet.length > 0}>
            <ul className="yet thumb-list">
              <h3>미 설치 {this.props.stepLabel} 도구</h3>
              <div>
                {this.props.yet.map((item, i) => <li key={(this.props.stepLabel === '전환' ? 'tr-yet-' : 'an-yet-') + i}>{item}</li>)}
              </div>
            </ul>
          </If>
        </section>
        <If condition={this.props.yet && this.props.yet.length > 0}>
          <section className="cost">
            <div>
              <h3>{this.props.stepLabel} 도구 추가</h3>
              <p>더 정확한 {this.props.stepLabel}을 위해 모든 {this.props.stepLabel} 도구를 설치 해 보시는건 어떨까요?</p>
              <p>필요성을 느끼지만 설치가 힘드시다면?</p>
              <p>모지가 도와드릴게요</p>
              <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>
              <table className="table">
                <tbody>
                  <tr><th>{this.props.stepLabel} 도구</th><th>설치 단가</th></tr>
                  {this.props.yet.map((li, i) => (<tr key={(this.props.stepLabel === '전환' ? 'tr-cost-' : 'an-cost-') + i}>
                    <td>{li}</td>
                    <td>{this.props.toolCostTable[li]}원</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          </section>
        </If>
        <If condition={this.props.exist && this.props.exist.length > 0}>
          <section className="report">
            <div>
              <h3>주기적이고, 자동화된 {this.props.stepLabel} 리포트</h3>
              <p>이미 도구를 사용하고 계시는군요!</p>
              <p>아래와 같은 {this.props.stepLabel} 리포트는 받아 보고 계신가요?</p>
              <Button variant="primary" onClick={e => this.onClickYes(e)} disabled={this.state.isReportNoClicked || this.state.isReportYesClicked}>예</Button>
              <Button variant="secoandary" onClick={e => this.onClickNo(e)} disabled={this.state.isReportNoClicked || this.state.isReportYesClicked}>아니오</Button>
              <Carousel>
                {this.props.reportImg.map((img, i) => 
                  (<Carousel.Item key={(this.props.stepLabel === '전환' ? 'tr-rimg-' : 'an-rimg-') + i}>
                    <img
                      className="d-block w-100"
                      src={img}
                      alt={'slide-' + i}
                    />
                  </Carousel.Item>)
                )}
              </Carousel>
            </div>
          </section>
        </If>
        <If condition={this.state.isReportNoClicked}>
          <section className="report-cost">
            <div>
              <h3>{this.props.stepLabel} 리포트 신청하기</h3>
              <p>분석된 데이터를 가장 효과적으로 활용하는 방법,</p>
              <p>주기적이고 자동화된 {this.props.stepLabel} 리포트를 생성하는 것입니다.</p>
              <p>힘드시다면, 모지가 도와드릴게요!</p>
              <If condition={this.state.isLoading}>
                <div className="now-loading">
                  <img src={loadingSpinner} alt="서버 API 통신중임을 나타내는 이미지 입니다." />
                </div>
              </If>
              <If condition={!this.state.isLoading}>
                <p>{this.props.lookupDomain}의 {this.state.startDate} ~ {this.state.endDate} 평균 방문자 량은 {this.state.avgTraffic} 입니다.</p>
                <p>{this.state.reportCost}원/회/주 의 가격으로 분석 보고서를 받아 보실 수 있습니다.</p>
                <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>
              </If>
            </div>
          </section>
        </If>
      </div>
    );
  }
}

export default Step;
