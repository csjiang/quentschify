import React from 'react';
import T from 'prop-types';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';

// Using CSS Modules so we assign the styles to a variable
import s from './App.styl';
const cx = classnames.bind(s);
import logo from './quentsch.png';

// Favicon link is in the template, this just makes webpack package it up for us
import './favicon.ico';

import Form from './Form';

export class Home extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <img src={logo} alt='React Logo' />
          <h1>Happy Birthday, Quentsch.</h1>
        </div>
        <p>Why are you amazing?</p>
        <ul>
          <li><span className={cx('hl')}>Steak</span> friendly</li>
          <li><span className={cx('hl')}>Dog</span> friendly</li>
          <li><span className={cx('hl')}>Shade</span> friendly</li>
        </ul>
        <Form/>
      </div>
    );
  }
}

export class About extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <h1>About Page</h1>
        </div>
        <p>Welcome to the about page...</p>
      </div>
    );
  }
}

export class NotFound extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <h4>Not found</h4>
      </div>
    );
  }
}

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export class App extends React.Component {
  static propTypes = {
    children: T.node,
  };

  render() {
    return (
      <div className={cx('App')}>
        <nav className={cx('nav')}>
          <IndexLink to='/' activeClassName={cx('active')}>Home</IndexLink>
          <Link to='/about' activeClassName={cx('active')}>About</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
