import React from 'react';

import Carousel from 'react-bootstrap/lib/Carousel';
import Button from 'react-bootstrap/lib/Button';

const ReportDemo = ({ children, onClickYes, onClickNo, reports, keyPrefix, isDisabled, categoryName }) => (
  <section className="report">
    <div>
      {children}
      <Button
        variant="primary"
        onClick={(e) => onClickYes(e)}
        disabled={isDisabled}
      >예</Button>
      <Button
        variant="secondary"
        onClick={(e) => onClickNo(e)}
        disabled={isDisabled}
      >아니오</Button>
      <Carousel>
        {reports.map((report, i) => (
          <Carousel.Item key={`${keyPrefix}-report-${i}`}>
            <img
              className="d-block w-100"
              src={report}
              alt={`${i}번째 데모 ${categoryName} 리포트 이미지 입니다.`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  </section>
);

export default ReportDemo;
