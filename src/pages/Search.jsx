import React, { Component } from 'react';
import Header from '../component/Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        Search
      </div>
    );
  }
}
