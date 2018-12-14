import React from 'react';

import ToolListContainer from './TooListContainer';
import ToolCostTable from './ToolCostTable';
import ReportDemo from './ReportDemo';
import ReportCostTableContainer from './ReportCostTableContainer';

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

    this.onClickYes = this.onClickYes.bind(this);
    this.onClickNo = this.onClickNo.bind(this);
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
    });
  }

  render() {
    return (
      <div className={"res res-" + (this.props.stepLabel === '전환' ? '2' : '1')}>
        <If condition={(this.props.exist && this.props.exist.length > 0) || (this.props.yet && this.props.yet.length > 0)}>
          <ToolListContainer
            exist={this.props.exist}
            yet={this.props.yet}
            categoryName={this.props.stepLabel}
            domain={this.props.lookupDomain}
          />
        </If>        
        <If condition={this.props.yet && this.props.yet.length > 0}>
          <ToolCostTable
            categoryName={this.props.stepLabel}
            yet={this.props.yet}
            refTable={this.props.toolCostTable}
          > 
            <h3>{this.props.stepLabel} 도구 추가</h3>
            <p>더 정확한 {this.props.stepLabel}을 위해 모든 {this.props.stepLabel} 도구를 설치 해 보시는건 어떨까요?</p>
            <p>필요성을 느끼지만 설치가 힘드시다면?</p>
            <p>모지가 도와드릴게요</p>
            <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>
          </ToolCostTable>
        </If>
        <If condition={this.props.exist && this.props.exist.length > 0}>
          <ReportDemo
            onClickYes={this.onClickYes}
            onClickNo={this.onClickNo}
            reports={this.props.reportImg}
            keyPrefix={this.props.stepLabel === '분석' ? 'an' : 'tr'}
            isDisabled={this.state.isReportNoClicked || this.state.isReportYesClicked}
            categoryName={this.props.stepLabel}
          >
            <h3>주기적이고, 자동화된 {this.props.stepLabel} 리포트</h3>
            <p>이미 도구를 사용하고 계시는군요!</p>
            <p>아래와 같은 {this.props.stepLabel} 리포트는 받아 보고 계신가요?</p>
          </ReportDemo>
        </If>
        <If condition={this.state.isReportNoClicked && this.props.exist && this.props.exist.length > 0}>
          <ReportCostTableContainer
            domain={this.props.lookupDomain}
            refCostTable={this.props.reportCostTable}
            categoryName={this.props.stepLabel}
          />          
        </If>
      </div>
    );
  }
}

export default Step;
