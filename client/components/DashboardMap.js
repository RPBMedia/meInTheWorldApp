import React, { Component } from 'react';
import { getCode, getData } from 'country-list';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import Modal from './Modal';
import { getCountryName } from '../utils'
import Map from './Map';

class DashboardMap extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      mapData: {},
      modalShowing: false,
      selectedCountry: null,
      modalMessage: null,
    }
  }

  componentDidMount() {
    let mapData = {}
    if(this.props.data.loading === false) {
      this.props.data.user.countries.forEach(country =>{
        if(getCode(country.name)){
          mapData[getCode(country.name)] = country.locations.length
        }
      });
      this.setState({
        mapData
      });
    }
  }

  handleClick(e, countryCode) {
    e.preventDefault();
    // eslint-disable-next-line react/no-string-refs
    console.log(countryCode);
    if(this.state.selectedCountry === null) {
      if(this.state.mapData.hasOwnProperty(countryCode)){
        this.setState({
          modalMessage: `${getCountryName(countryCode)}: ${this.state.mapData[countryCode]} locations visited`,
          modalShowing: true,
          selectedCountry: countryCode,
        })
      } else {
        this.setState({
          modalMessage: ` You haven't visited ${getCountryName(countryCode)} yet`,
          modalShowing: true,
          selectedCountry: countryCode,
        })
      }
    } else {
      this.setState({
        modalMessage: null,
        modalShowing: null,
        selectedCountry: null,
      })
    }
  };

  render() {
    if(this.props.data.loading) {
      return null;
    }
    const mapData = {};
    

    


    return (
      <div>
        <Map
          mapData={this.state.mapData}
          handleClick={this.handleClick.bind(this)}
        />
      {this.state.modalShowing && 
        <Modal
          message={this.state.modalMessage}
        />
      }
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(DashboardMap);