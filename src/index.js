"use strict";

import React, { Component } from 'react';
import { render } from 'react-dom';

class Stardate extends Component {
  constructor(props) {
    super(props);
    this.current_year = new Date().getUTCFullYear();
    this.year_str = this.current_year - 2000;
    this.start_of_year = Date.UTC(this.current_year);
    this.secs_in_year = Date.UTC(this.current_year+1) - this.start_of_year;
    this.state = { stardate: this.calcStardate() };
  }

  componentDidMount() {
    this.clock = setInterval(
      () => this.tick(),
      3155 // This pretty closely follows the time index so you don't notice any jumping
    );
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  calcStardate() {
    return 1000 * ((Date.now() - this.start_of_year) / this.secs_in_year);
  }

  tick() {
    this.setState({ stardate: this.calcStardate() });
  }

  render() {
    return (
      <div style={{
          color: '#FF9900',
          fontFamily: ["Helvetica LT Ultra Condensed", "Helvetica Ultra Condensed", 'sans-serif'],
          fontSize: '130px',
          textTransform: 'uppercase',
        }}
      >
        {this.year_str}{this.state.stardate.toFixed(1).toString().padStart(5, '0')}<br />
        time index: {(this.state.stardate * 10000).toFixed().toString().padStart(8, '0').substring(5)}
      </div>
    );
  }
}

render(
  <Stardate />,
  document.getElementById('root')
);
