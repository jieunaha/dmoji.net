import React, {Component} from 'react';
import ReportCostTable from './ReportCostTable';
import { extractedDummy } from '../dummydata';


const threeMonthInMs = 7.884e+9;
const twoMonthInMs = 5.256e+9;
const oneMonthInMs = 2.628e+9;
const now = new Date();
const headers = new Headers({'x-requested-with': 'XMLHttpRequest'});

class ReportCostTableContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      startDate: '',
      endDate: '',
      reportCost: 0,
      avgTraffic: 0,
    };
  }

  getStartDateForSimilarWeb (now) {
    const endDate = new Date(now.valueOf() - twoMonthInMs);
    return `${endDate.getFullYear()}-${endDate.getMonth()}`;
  }
  
  getEndDateForSimilarWeb (now) {
    const endDate = new Date(now.valueOf()/*  - oneMonthInMs */);
    return `${endDate.getFullYear()}-${endDate.getMonth()}`;
  }

  componentDidMount() {
    if(this.props.domain === 'dummy.data') {
      this.setState({
        ...extractedDummy,
        isLoading: false,
      });
      return;
    }

    fetch(`https://moji-cors-anywhere.herokuapp.com/https://api.similarweb.com/v1/website/${this.props.domain}/total-traffic-and-engagement/visits?api_key=88b8b524f7c04567ad26b97afd990996&start_date=${this.getStartDateForSimilarWeb(now)}&end_date=${this.getEndDateForSimilarWeb(now)}&main_domain_only=true&granularity=monthly`, {
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
        reportCost = this.props.refCostTable['0~10000'];
      } else if(avgTraffic < 100000) {
        reportCost = this.props.refCostTable['100000~1000000'];
      } else if(avgTraffic < 1000000) {
        reportCost = this.props.refCostTable['100000~1000000'];
      }

      const reportCostState = {
        startDate: startDate,
        endDate: endDate,
        reportCost: reportCost,
        avgTraffic: avgTraffic
      };

      localStorage.setItem(this.props.domain + '-r', JSON.stringify({
        ...reportCostState,
        date: now.valueOf()
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

  render() {
    return (
      <ReportCostTable
        isLoading={this.state.isLoading}
        domain={this.props.domain}
        cost={this.state.reportCost}
        categoryName={this.props.categoryName}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        avgTraffic={this.state.avgTraffic}
      >
        <h3>{this.props.categoryName} 리포트 신청하기</h3>
        <p>분석된 데이터를 가장 효과적으로 활용하는 방법,</p>
        <p>주기적이고 자동화된 {this.props.categoryName} 리포트를 생성하는 것입니다.</p>
        <p>힘드시다면, 모지가 도와드릴게요!</p>
      </ReportCostTable>
    );
  }
}

export default ReportCostTableContainer;
