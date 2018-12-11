import React from 'react';

import Intro from './Intro';
import Step from './Step';

import report_1_1 from '../../asset/img/an_report (1).jpg';
import report_1_2 from '../../asset/img/an_report (2).jpg';
import report_1_3 from '../../asset/img/an_report (3).jpg';
import report_1_4 from '../../asset/img/an_report (4).jpg';
import report_1_5 from '../../asset/img/an_report (5).jpg';

import report_2_1 from '../../asset/img/tr_report (1).jpg';
import report_2_2 from '../../asset/img/tr_report (2).jpg';
import report_2_3 from '../../asset/img/tr_report (3).jpg';
import report_2_4 from '../../asset/img/tr_report (4).jpg';
import report_2_5 from '../../asset/img/tr_report (5).jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lDomain: '',
      anExist: [],
      anYet: [],
      trExist: [],
      trYet: [],
      isBecameStep1: false,
      isBecameStep2: false,
      isBecameStep3: false,
    };
  }

  setLDomain(domain) {
    this.setState({
      lDomain: domain,
      anExist: [],
      anYet: [],
      trExist: [],
      trYet: [],
      isBecameStep1: false,
      isBecameStep2: false,
      isBecameStep3: false,
    });
  }

  setTechs(techs) {
    const keysCheck = [
      [
        [/Acecounter/, 'Acecounter'],
        [/^Google Universal Analytics$|^Google Analytics$/, 'Google Analytics'],
        [/Google Tag Manager/, 'Google Tag Manager'],
        [/Naver Analytics/, 'Naver Analytics']
      ],
      [
        [/Facebook Pixel/, 'Facebook Pixel'],
        [/^Google Analytics \w*\s{0,1}Ecommerce/, 'Google Analytics Ecommerce']
      ]
    ];
    const techsTmp = [[[],[]],[[],[]]];

    keysCheck.forEach((category, i, catArr) => {
      category.forEach((key, j, keyArr) => {
        if(techs.some((tech => key[0].test(tech['Name'])))) techsTmp[0][i].push(key[1]);
        else techsTmp[1][i].push(key[1]);
      });
    });
    
    this.setState({
      anExist: techsTmp[0][0],
      anYet: techsTmp[1][0],
      trExist: techsTmp[0][1],
      trYet: techsTmp[1][1],
      isBecameStep1: true
    });
  }

  showStep2(e) {
    this.setState({
      isBecameStep2: true,
    });
  }

  showDemoShop(e) {
    this.setState({
      isBecameStep3: true
    });
  }

  render() {
    return (
      <div>
        <div className="req">
          <Intro
            onLDomainSuccess={(domain) => this.setLDomain(domain)}
            onTechsSuccess={(techs) => this.setTechs(techs)}
          >
          </Intro>
          <If condition={this.state.isBecameStep1}>
            <Step
              key={`step-1-${(new Date()).valueOf()}`}
              stepLabel={'분석'}
              mention={''}
              toolCostTable={({
                'Acecounter': 100000,
                'Google Analytics': 100000,
                'Google Tag Manager': 100000,
                'Naver Analytics': 100000,
              })}
              reportCostTable={({
                '0~10000': 100000,
                '10000~100000': 200000,
                '100000~1000000': 300000,
              })}
              lookupDomain={this.state.lDomain}
              exist={this.state.anExist}
              yet={this.state.anYet}
              isExpended={this.state.isBecameStep2}
              reportImg={[report_1_1, report_1_2, report_1_3, report_1_4, report_1_5]}
              onClickYes={(e) => this.showStep2(e)}
            ></Step>
          </If>
          <If condition={this.state.isBecameStep2}>
            <Step
              key={`step-2-${(new Date()).valueOf()}`}
              stepLabel={'전환'}
              mention={''}
              toolCostTable={({
                'Google Analytics Ecommerce': 100000,
                'Facebook Pixel': 100000,
              })}
              reportCostTable={({
                '0~10000': 100000,
                '10000~100000': 200000,
                '100000~1000000': 300000,
              })}
              lookupDomain={this.state.lDomain}
              exist={this.state.trExist}
              yet={this.state.trYet}
              isExpended={this.state.isBecameStep3}
              reportImg={[report_2_1, report_2_2, report_2_3, report_2_4, report_2_5]}
              onClickYes={(e) => {this.showDemoShop()}}
            ></Step>
          </If>
          <If condition={this.state.isBecameStep3}>
            <section className="demo-link">
              <div>
                <h2>마케팅 자동화</h2>
                <p>귀사의 웹페이지에 온 사이트 마케팅, 마케팅 자동화등은 하고 계신가요?</p>
                <p>용어가 생소하다면 저희가 준비한 데모사이트를 방문해 보시는 건 어떠실지요?</p>
                <p><a href="#">https://demo.dmoji.net</a></p>
              </div>
            </section>
          </If>
        </div>
      </div>
    );
  }
}

export default App;
