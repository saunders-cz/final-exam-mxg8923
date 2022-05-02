import React, { Component } from "react";

export const PageHeaderFC = (props) => {
  return <h1>{props.children}</h1>;
};

export class PageHeaderClass extends Component {
  render() {
    return <h1>{this.props.children}</h1>;
  }
}
