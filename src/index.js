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

  genLowerStardate(stardate, digits) {
    return stardate.toString().match(new RegExp(`\\d+.\\d{${digits}}`))[0].padStart(5, '0');
  }

  genTimeIndex(stardate) {
    // doing stupid nonsense so I have access to the length of a string without creating a variable
    return ((ti) => ti.substring(ti.length-3))(Math.floor(stardate * 10000).toString());
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
        {this.year_str}{this.genLowerStardate(this.state.stardate, 1)}<br />
        time index: {this.genTimeIndex(this.state.stardate)}
      </div>
    );
  }
}

render(
  <Stardate />,
  document.getElementById('root')
);
