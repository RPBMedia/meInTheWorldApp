import React, { Component } from 'react';
import { Link } from 'react-router';

const BackButton = ()=> (
  <Link
    to="/dashboard/manager"
  >
    <i
      className="medium clickable material-icons"
    >
      navigate_before
    </i>
  </Link>
)

export default BackButton;