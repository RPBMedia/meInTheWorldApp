import React, { Component } from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';

const BackButton = ({to}) => (
  <Link
    to={to}
  >
    <i
      className="medium clickable material-icons"
    >
      navigate_before
    </i>
  </Link>
);

export default BackButton;