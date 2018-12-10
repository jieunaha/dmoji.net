import React from 'react';

import Intro from './Intro';
import Step from './Step';

import report_1_1 from '../../asset/img/an_report (1).jpg';
import report_1_2 from '../../asset/img/an_report (2).jpg';
import report_1_3 from '../../asset/img/an_report (3).jpg';
import report_1_4 from '../../asset/img/an_report (4).jpg';
import report_1_5 from '../../asset/img/an_report (5).jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lDomain: '',
      anExist: [],
      anYet: [],
      trExist: [],
      trYet: []
    };
  }

  setLDomain(domain) {
    this.setState({
      lDomain: domain
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
      trYet: techsTmp[1][1]
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
          <If condition={(this.state.anExist.length + this.state.anYet.length) > 0}>
            <Step
              stepLabel={'분석'}
              mention={''}
              costTable={({
                'Acecounter': 100000,
                'Google Analytics': 100000,
                'Google Tag Manager': 100000,
                'Naver Analytics': 100000,
              })}
              lookupDomain={this.state.lDomain}
              exist={this.state.anExist}
              yet={this.state.anYet}
              reportImg={[report_1_1, report_1_2, report_1_3, report_1_4, report_1_5]}
            ></Step>
          </If>
        </div>
      </div>
    );
  }
}

export default App;
