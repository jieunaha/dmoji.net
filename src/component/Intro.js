import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';

import { flattenDummy } from '../dummydata';
import loadingSpinner from '../../asset/img/loading-icon.gif';

class Intro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lookupDomain: '',
      gotError: false,
      error: null,
      isLoading: false
    };
  }

  onChangeLookupDomain(e) {
    this.setState({
      lookupDomain: e.target.value
    });
  }

  onReqLookup(e) {
    this.setState({
      gotError: false,
      error: null,
      isLoading: true
    });

    if(this.state.lookupDomain === ''){
      this.props.onLDomainSuccess('dummy.data');
      this.props.onTechsSuccess(flattenDummy);
      this.setState({
        lookupDomain: 'dummy.data',
        isLoading: false
      });
      return;
    }


    const isCached = localStorage.getItem(this.state.lookupDomain);
    const cached = isCached && JSON.parse(isCached);
    const isNotExpired = cached && (((new Date()).valueOf() - cached['date']) < 2.628e+9)
    
    if(isNotExpired){
      this.props.onLDomainSuccess(this.state.lookupDomain);
      this.props.onTechsSuccess(cached['techs']);
      this.setState({
        isLoading: false
      });
      return;
    }

    const bwKey = '410b0fe8-ebb7-406b-933e-8a3b5b189687';
    const headers = new Headers({'x-requested-with': 'XMLHttpRequest'});
    const urlLookUp = `https://moji-cors-anywhere.herokuapp.com/api.builtwith.com/v12/api.json?KEY=${bwKey}&LOOKUP=${this.state.lookupDomain}`;

    fetch(urlLookUp, {
      method: 'GET',
      headers: headers
    })
    .then((res) => res.json())
    .then((data) => {
      if(data['Errors'].length > 0) {
        this.setState({
          gotError: true,
          error: data['Errors']
        });
        return;
      }

      let flattenData = [];
      for (let i = 0, l = data['Results'][0]['Result']['Paths'].length; i < l; i++) {
        flattenData = flattenData.concat(data['Results'][0]['Result']['Paths'][i]['Technologies']);
      }

      localStorage.setItem(this.state.lookupDomain, JSON.stringify({
        techs: flattenData,
        date: (new Date()).valueOf()
      }));

      this.props.onLDomainSuccess(this.state.lookupDomain);
      this.props.onTechsSuccess(flattenData);
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        gotError: true,
        error: error
      });
    })
    .finally(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  onCloseAlaert(e) {
    this.setState({
      lookupDomain: '',
      gotError: false,
      error: null,
      isLoading: false
    });
  }

  render() {
    return (
      <section className="intro">
        <div>
        <h1>moji</h1>
          <h2>모으고 지키는 온라인 마케팅</h2>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="도메인을 입력해 주세요"
              aria-label="lookup domain"
              onChange={(e) => this.onChangeLookupDomain(e)}
              onKeyUp={(e) => e.keyCode === 13 && this.onReqLookup(e)}
              value={this.state.lookupDomain}
              disabled={this.state.isLoading}
            />
            <InputGroup.Append>
              <Button
                variant="Light"
                onClick={(e) => this.onReqLookup(e)}
              >lookup!</Button>
            </InputGroup.Append>
          </InputGroup>
          <If condition={this.state.isLoading}>
            <div className="now-loading">
              <img src={loadingSpinner} alt="서버 API 통신중임을 나타내는 이미지 입니다." />
            </div>
          </If>
          <Alert dismissible variant="danger" show={this.state.gotError} onClose={(e) => this.onCloseAlaert(e)}>
            <Alert.Heading>웹사이트 살펴보기 실패</Alert.Heading>
            <p>잠시 후 다시 시도 하시거나, moji에게 <Alert.Link href="mailto:mkt@dmoji.net">이메일</Alert.Link>로 알려주세요!</p>
          </Alert>
        </div>
      </section>
    );
  }
}

export default Intro;
