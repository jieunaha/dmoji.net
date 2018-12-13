import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ToolList from './ToolList';

class ToolListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exist: [],
      yet: [],
    };
  }

  componentDidMount(){}

  render() {
    return (
      <section className="thumb">
        <div>
          <h2>{this.props.domain}의 {this.props.categoryName} 도구 설치 현황</h2>
          <If condition={this.state.exist.length > 0}>
            <ToolList
              list={this.state.exist}
              category={this.props.categoryName}
            />
          </If>
          <If condition={this.state.yet.length > 0}>
            <ToolList
              list={this.state.yet}
              category={this.props.categoryName}
            />
          </If>
        </div>
      </section>
    );
  }
}

export default ToolListContainer;

/* 
ToolListContainer.propTypes = {
  children: PropTypes.func,
};
 */