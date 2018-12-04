import { checkIsValidDomain, getEndDateForSimilarWeb, getStartDateForSimilarWeb, validDomainRegEX } from './utils';
import { ddata, dTraffic } from './dummydata';
import na_report from '../asset/img/report_dummy.png';

$(document).ready(function () {
  const $app = $(app);
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
  let lookup_domain;
  let ext, yt;

  function domainLookup($context){
    // const bwKey = '410b0fe8-ebb7-406b-933e-8a3b5b189687';
    const bwKey = '0b91cc98-17be-4328-a0e8-d2a213c0c431';
    const urlLookUp = 'https://api.builtwith.com/v12/api.json?KEY=' + bwKey + '&LOOKUP=';
    const $domain = $('#domain-lookup-text', $context);
    const $btn = $('#domain-lookup-btn', $context);
    const $wrongDomainFormatAlert = $(
      `<div class="alert alert-warning" role="alert">dmoji.net 과 같은 형식으로 입력 해 주세요.</div>`,
      $context);

    $domain.on('keyup', function (e) {
      if(e.keyCode === 13) {
        lookup(e);
      }
    });
    $btn.on('click', function (e) {
      lookup(e);
    });

    function lookup (e) {
      $('div.res', $app).remove();

      const domainVal = $domain.val();
      lookup_domain = domainVal;
      if(!checkIsValidDomain(domainVal)) {
        $context.append($wrongDomainFormatAlert);
        return;
      }

      $wrongDomainFormatAlert.detach();

      /* $.ajax(urlLookUp + domainVal, {
        success: successLookup,
        error: errorLookup
      }); */
      successLookup(ddata);
    };
  }
  domainLookup($('section.intro', $app));

  function successLookup(data, textStatus, jqXHR){
    if(data['Errors'].length > 0) {
      errorLookup(data, textStatus);
      // return; // ##for-dummy##
    }

    retrieveANTool(data); // ##for-dummy## 
  }

  function errorLookup(data, textStatus) {
    console.log('BuiltWith의 Domain Lookup API 호출이 실패하였습니다.');
  }

  function retrieveANTool(data) {
    const $res = $(`<div class="res res-1"></div>`);

    let exist = [[],[]];
    let yet = [[],[]];
    let flattenData = [];

    for (let i = 0, l = data['Results'][0]['Result']['Paths'].length; i < l; i++) {
      flattenData = flattenData.concat(data['Results'][0]['Result']['Paths'][i]['Technologies']);
    }
    
    for (let i = 0, l = keysCheck.length; i < l; i++){
      keysCheck[i].forEach(key => {
        if(flattenData.some(tech => key[0].test(tech['Name']))) {
          exist[i].push(key[1]);
        } else {
          yet[i].push(key[1]);
        };      
      });
    }

    for (let i = 0, l = exist.length; i < l; i++) {
      exist[i] = exist[i].length === 0 ? null : exist[i];
      yet[i] = yet[i].length === 0 ? null : yet[i];
    }

    ext = exist;
    yt = yet;

    appendANList(exist[0], yet[0], $res);
    if(exist[0].length >= 0 && exist[0].length < 4) {
      appendANCost(yet[0], $res);
    }
    if(exist[0].length >= 1 && exist[0].length < 5) {
      appendANReport($res);
    }

    $app.append($res);
  }

  function appendANList(exist, yet, $context) {
    let $exist;
    let $yet;
    let existItems, yetItems;
    const $section = $(`<section class="thumb"></section>`);
    const $sectionWrapper = $(`<div><h2>${lookup_domain}의 분석도구 설치 현황</h2></div>`);

    if(exist) {
      existItems = '';
      for (let i = 0, l = exist.length; i < l; i++) {
        existItems += `<li>${exist[i]}</li>`;
      }
      $exist = $(
      `<ul class="exist thumb-list">
        <h3>설치 완료 된 분석 도구</h3>
        <div>
        ${existItems}
        </div>
      </ul>`);
      $sectionWrapper.append($exist);
    }

    if(yet) {
      yetItems = '';
      for (let i = 0, l = yet.length; i < l; i++) {
        yetItems += `<li>${yet[i]}</li>`;
      }
      $yet = $(
      `<ul class="yet thumb">
        <h3>미 설치 분석 도구</h3>
        <div>
        ${yetItems}
        </div>
      </ul>`);
      $sectionWrapper.append($yet);
    }

    $context.append($section.append($sectionWrapper));
  }

  function appendANCost(yet, $context) {
    const mention = `<h3>분석 도구 추가</h3>
    <p>더 정확한 분석을 위해 모든 분석 도구를 설치 해 보시는건 어떨까요?</p>
      <p>필요성을 느끼지만 설치가 힘드시다면?</p>
      <p>모지가 도와드릴게요</p>
      <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>`;
    const costTable = {
      'Acecounter': 100000,
      'Google Analytics': 100000,
      'Google Tag Manager': 100000,
      'Naver Analytics': 100000,
    };
    const yetCostTable = yet.map(el => `<tr>
      <td>${el}</td>
      <td>${costTable[el]}원</td>
    </tr>`);

    const $costTable = $(
      `<section class="cost">
        <div>
          ${mention}
          <table class="table">
          <tr><th>분석 도구</th><th>설치 단가</th></tr>
          ${yetCostTable.join('')}
          </table>
        </div>
      </section>`);

    $context.append($costTable);
  }

  function appendANReport($context) {
    const mention = `<h3>주기적이고, 자동화된 분석 리포트</h3>
      <p>이미 도구를 사용하고 계시는군요!</p>
      <p>아래와 같은 분석 리포트는 받아 보고 계신가요?</p>`;
    const report = `<div class="report-sample"><img src="${na_report}" alt="분석 리포트 샘플" /></div>`;

    const $ANReport = $(`
      <section class="report">
        <div>
          ${mention}
          ${report}
          <button id="na-report-yes">예</button>
          <button id="na-report-no">아니오</button>
        </div>
      </section>
    `);

    const $btnYes = $('#na-report-yes', $ANReport).on('click', function () {
      appendTRTool($context, detachBtns);
    });
    const $btnNo = $('#na-report-no', $ANReport).on('click', function () {
      appendANReportCost($context, detachBtns);
    });

    function detachBtns () {
      $btnYes.prop('disabled', true);
      $btnNo.prop('disabled', true);
    }

    $context.append($ANReport);
  }

  function appendANReportCost($context, detachBtns) {
    const mention = `<h3>분석 리포트 신청하기</h3>
      <p>분석된 데이터를 가장 효과적으로 활용하는 방법,</p>
      <p>주기적이고 자동화된 분석 리포트를 생성하는 것입니다.</p>
      <p>힘드시다면, 모지가 도와드릴게요!</p>`;

    const costTable = {
      '0~10000': 100000,
      '10000~100000': 200000,
      '100000~1000000': 300000,
    };
    
    const now = new Date();
/* 
    $.ajax(`https://api.similarweb.com/v1/website/${lookup_domain}/total-traffic-and-engagement/visits?api_key=88b8b524f7c04567ad26b97afd990996&start_date=${getStartDateForSimilarWeb(now)}&end_date=${getEndDateForSimilarWeb(now)}&main_domain_only=true&granularity=monthly`, {
      error: errorTraffic,
      success: successTraffic
    });

    function errorTraffic(data, textStatus) {
      console.log('SimilarWeb의  API 호출이 실패하였습니다.');

      // successTraffic(dTraffic); // ##for-dummy##
    }
 */
    successTraffic(dTraffic);
    function successTraffic(data, textStatus, jqXHR) {
      if(data['meta']['status'] !== 'Success') {
        errorTraffic(data, textStatus);
      }

      const startDate = data['meta']['request']['start_date'];
      const endDate = data['meta']['request']['end_date'];
      const avgTraffic = Math.round(((data['visits'].map(e => e['visits'])).reduce((acc, cur) => acc + cur)) / 3);
      let cost;

      if (avgTraffic < 10000) {
        cost = costTable['0~10000'];
      } else if(avgTraffic < 100000) {
        cost = costTable['100000~1000000'];
      } else if(avgTraffic < 1000000) {
        cost = costTable['100000~1000000'];
      }

      const $section = $(`
      <section class="report-cost">
        <div>
          ${mention}
          <p>${lookup_domain}의 ${startDate} ~ ${endDate} 평균 방문자 량은 ${avgTraffic} 입니다.</p>
          <p>${cost}원/회/주 의 가격으로 분석 보고서를 받아 보실 수 있습니다.</p>
          <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>
        </div>
      </section>
      `);

      $context.append($section);
      detachBtns();
    }
  }

  function appendTRTool($context, detachBtns) {
    const $res = $(`<div class="res res-2"></div>`);

    const exist = ext;
    const yet = yt;

    appendTRList(exist[1], yet[1], $res);
    if(exist[1].length >= 0 && exist[1].length < 2) {
      appendTRCost(yet[1], $res);
    }
    if(exist[1].length >= 1 && exist[1].length < 3) {
      appendTRReport($res);
    }

    $app.append($res);
    detachBtns();
  }

  function appendTRList(exist, yet, $context) {
    let $exist;
    let $yet;
    let existItems, yetItems;
    const $section = $(`<section class="thumb"></section>`);
    const $sectionWrapper = $(`<div><h2>${lookup_domain}의 추적 도구 설치 현황</h2></div>`);

    if(exist) {
      existItems = '';
      for (let i = 0, l = exist.length; i < l; i++) {
        existItems += `<li>${exist[i]}</li>`;
      }
      $exist = $(
      `<ul class="exist thumb-list">
        <h3>설치 완료 된 추적 도구</h3>
        <div>
        ${existItems}
        </div>
      </ul>`);
      $sectionWrapper.append($exist);
    }

    if(yet) {
      yetItems = '';
      for (let i = 0, l = yet.length; i < l; i++) {
        yetItems += `<li>${yet[i]}</li>`;
      }
      $yet = $(
      `<ul class="yet thumb">
        <h3>미 설치 추적 도구</h3>
        <div>
        ${yetItems}
        </div>
      </ul>`);
      $sectionWrapper.append($yet);
    }

    $context.append($section.append($sectionWrapper));
  }

  function appendTRCost(yet, $context) {
    const mention = `<h3>추적 도구 추가</h3>
    <p>더 정확한 추적을 위해 모든 추적 도구를 설치 해 보시는건 어떨까요?</p>
      <p>필요성을 느끼지만 설치가 힘드시다면?</p>
      <p>모지가 도와드릴게요</p>
      <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>`;
    const costTable = {
      'Google Analytics Ecommerce': 100000,
      'Facebook Pixel': 100000,
    };
    const yetCostTable = yet.map(el => `<tr>
      <td>${el}</td>
      <td>${costTable[el]}원</td>
    </tr>`);

    const $costTable = $(
      `<section class="cost">
        <div>
          ${mention}
          <table class="table">
          <tr><th>추적 도구</th><th>설치 단가</th></tr>
          ${yetCostTable.join('')}
          </table>
        </div>
      </section>`);

    $context.append($costTable);
  }

  function appendTRReport($context) {
    const mention = `<h3>주기적이고, 자동화된 전환 추적 리포트</h3>
      <p>구슬이 서말이라도 꿰어야 보배!</p>
      <p>아래와 같은 추적 리포트는 받아 보고 계신가요?</p>`;
    const report = `<div class="report-sample"><img src="${na_report}" alt="추적 리포트 샘플" /></div>`;

    const $TRReport = $(`
      <section class="report">
        <div>
          ${mention}
          ${report}
          <button id="tr-report-yes">예</button>
          <button id="tr-report-no">아니오</button>
        </div>
      </section>
    `);

    const $btnYes = $('#tr-report-yes', $TRReport).on('click', function () {
      appendTRDemoLink($context,detachBtns);
    });
    const $btnNo = $('#tr-report-no', $TRReport).on('click', function () {
      appendTRReportCost($context, detachBtns);
    });

    function detachBtns () {
      $btnYes.prop('disabled', true);
      $btnNo.prop('disabled', true);
    }

    $context.append($TRReport);
  }

  function appendTRDemoLink ($context, detachBtns) {
    const $section = $(`
    <section class="demo-link">
      <div>
        <h2>마케팅 자동화</h2>
        <p>귀사의 웹페이지에 온 사이트 마케팅, 마케팅 자동화등은 하고 계신가요?</p>
        <p>용어가 생소하다면 저희가 준비한 데모사이트를 방문해 보시는 건 어떠실지요?</p>
        <p><a href="#">https://demo.dmoji.net</a></p>
      </div>
    </section>
    `);
    $context.append($section);
    detachBtns();
  }

  function appendTRReportCost($context, detachBtns) {
    const mention = `<h3>추적 리포트 신청하기</h3>
      <p>추적된 데이터를 가장 효과적으로 활용하는 방법,</p>
      <p>주기적이고 자동화된 추적 리포트를 생성하는 것입니다.</p>
      <p>힘드시다면, 모지가 도와드릴게요!</p>`;

    const costTable = {
      '0~10000': 100000,
      '10000~100000': 200000,
      '100000~1000000': 300000,
    };

    const now = new Date();
/* 
    $.ajax(`https://api.similarweb.com/v1/website/${lookup_domain}/total-traffic-and-engagement/visits?api_key=88b8b524f7c04567ad26b97afd990996&start_date=${getStartDateForSimilarWeb(now)}&end_date=${getEndDateForSimilarWeb(now)}&main_domain_only=true&granularity=monthly`, {
      error: errorTraffic,
      success: successTraffic
    });

    function errorTraffic(data, textStatus) {
      console.log('SimilarWeb의  API 호출이 실패하였습니다.');

      successTraffic(dTraffic); // ##for-dummy##
    }
 */
    successTraffic(dTraffic);
    function successTraffic(data, textStatus, jqXHR) {
      if(data['meta']['status'] !== 'Success') {
        errorTraffic(data, textStatus);
      }

      const startDate = data['meta']['request']['start_date'];
      const endDate = data['meta']['request']['end_date'];
      const avgTraffic = Math.round(((data['visits'].map(e => e['visits'])).reduce((acc, cur) => acc + cur)) / 3);
      let cost;

      if (avgTraffic < 10000) {
        cost = costTable['0~10000'];
      } else if(avgTraffic < 100000) {
        cost = costTable['100000~1000000'];
      } else if(avgTraffic < 1000000) {
        cost = costTable['100000~1000000'];
      }

      const $section = $(`
      <section class="report-cost">
        <div>
          ${mention}
          <p>${lookup_domain}의 ${startDate} ~ ${endDate} 평균 방문자 량은 ${avgTraffic} 입니다.</p>
          <p>${cost}원/회/주 의 가격으로 분석 보고서를 받아 보실 수 있습니다.</p>
          <p><a href="mailto:mkt@dmoji.net">mkt@dmoji.net</a></p>
        </div>
      </section>
      `);

      $context.append($section);
      detachBtns();
    }
  }

});
