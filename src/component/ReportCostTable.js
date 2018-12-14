import React from 'react';
import loadingSpinner from '../../asset/img/loading-icon.gif';

const ReportCostTable = ({ children, isLoading, domain, cost, categoryName, startDate, endDate, avgTraffic }) => (
  <section className="report-cost">
    <div>
      {children}
      <If condition={isLoading}>
        <div className="now-loading">
          <img src={loadingSpinner} alt="서버 API 통신중임을 나타내는 이미지 입니다." />
        </div>
      </If>
      <If condition={!isLoading}>
        <p>{domain}의 {startDate} ~ {endDate} 평균 방문자 량은 {avgTraffic} 입니다.</p>
        <p>{cost}원/회/주 의 가격으로 {categoryName} 보고서를 받아 보실 수 있습니다.</p>
        <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>
      </If>
    </div>
  </section>
);

export default ReportCostTable;
