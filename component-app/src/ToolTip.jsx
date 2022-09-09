import React from 'react';
import css from './tooltip.css';
const styleObj = {};
export default class ToolTip extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="tool-tip" data-content={this.props.message}>
        {this.props.content}
      </div>
    );
  }
}
