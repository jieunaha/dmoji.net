import React, {Component} from 'react';

import ToolList from './ToolList';

class ToolListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exist: [],
      yet: [],
    };
  }

  componentDidMount(){
    this.setState({
      exist: this.props.exist,
      yet: this.props.yet,
    });
  }

  render() {
    return (
      <section className="thumb">
        <div>
          <div className="section-heading">
            <h2>{this.props.domain}의 {this.props.categoryName} 도구 설치 현황</h2>
          </div>
          <If condition={this.state.exist.length > 0}>
            <ToolList
              list={this.state.exist}
              listType={'exist'}
              heading={`설치 완료 된 ${this.props.categoryName} 도구`}
              category={this.props.categoryName === '분석' ? 'an' : 'tr'}
            />
          </If>
          <If condition={this.state.yet.length > 0}>
            <ToolList
              list={this.state.yet}
              listType={'yet'}
              heading={`미 설치 ${this.props.categoryName} 도구`}
              category={this.props.categoryName === '분석' ? 'an' : 'tr'}
            />
          </If>
        </div>
      </section>
    );
  }
}

export default ToolListContainer;
