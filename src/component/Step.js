import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import { getEndDateForSimilarWeb, getStartDateForSimilarWeb } from '../utils';

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trRes: null
    };
  }

  reqTraffic() {
    if(!(this.props.exist && this.props.exist.length > 0)) return;

    const now = new Date();
    const headers = new Headers({'x-requested-with': 'XMLHttpRequest'});

    fetch(`https://moji-cors-anywhere.herokuapp.com/https://api.similarweb.com/v1/website/${this.props.lookupDomain}/total-traffic-and-engagement/visits?api_key=88b8b524f7c04567ad26b97afd990996&start_date=${getStartDateForSimilarWeb(now)}&end_date=${getEndDateForSimilarWeb(now)}&main_domain_only=true&granularity=monthly`, {
      method: 'GET',
      headers: headers
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="res res-1">
        <section className="thumb">
          <div>
            <h2>{this.props.lookupDomain}의 {this.props.stepLabel}도구 설치 현황</h2>
          </div>
          <If condition={this.props.exist && this.props.exist.length > 0}>
            <ul className="exist thumb-list">
              <h3>설치 완료 된 {this.props.stepLabel} 도구</h3>
              <div>
                {this.props.exist.map((item, i) => <li key={(this.props.stepLabel === '분석' && 'an-exist-') + i}>{item}</li>)}
              </div>
            </ul>
          </If>
          <If condition={this.props.yet && this.props.yet.length > 0}>
            <ul className="yet thumb-list">
              <h3>설치 완료 된 {this.props.stepLabel} 도구</h3>
              <div>
                {this.props.yet.map((item, i) => <li key={(this.props.stepLabel === '분석' && 'an-exist-') + i}>{item}</li>)}
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
                  {this.props.yet.map((li, i) => (<tr key={(this.props.stepLabel === '분석' && 'an-cost-') + i}>
                    <td>{li}</td>
                    <td>{this.props.costTable[li]}원</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          </section>
        </If>
        <If condition={this.props.exist && this.props.exist.length > 0}>
          <section className="report">
            <div>
              <Carousel>
                {this.props.reportImg.map((img, i) => 
                  (<Carousel.Item key={(this.props.stepLabel === '분석' && 'an-rimg-') + i}>
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
      </div>
    );
  }
}

export default Step;


/*
<section className="report-cost">
            <div>
              <h3>{this.props.stepLabel} 리포트 신청하기</h3>
              <p>{this.props.stepLabel}된 데이터를 가장 효과적으로 활용하는 방법,</p>
              <p>주기적이고 자동화된 {this.props.stepLabel} 리포트를 생성하는 것입니다.</p>
              <p>힘드시다면, 모지가 도와드릴게요!</p>
              <p>${this.props.lookupDomain}의 ${startDate} ~ ${endDate} 평균 방문자 량은 ${avgTraffic} 입니다.</p>
              <p>${cost}원/회/주 의 가격으로 {this.props.stepLabel} 보고서를 받아 보실 수 있습니다.</p>
              <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>
            </div>
          </section>
*/