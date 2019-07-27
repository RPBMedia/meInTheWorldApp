import React, { Component } from 'react';
import { getCode } from 'country-list';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import Modal from './Modal';
import { parseCountryName } from '../utils'
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
        const parsedName = parseCountryName(country.name);
        if(getCode(parsedName)){
          mapData[getCode(parsedName)] = country.locations.length
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
          modalMessage2: `: ${this.state.mapData[countryCode]} locations visited`,
          modalShowing: true,
          selectedCountry: countryCode,
        })
      } else {
        this.setState({
          modalMessage: 'You haven\'t visited ',
          modalMessage2: ' yet',
          modalShowing: true,
          selectedCountry: countryCode,
        })
      }
    } else {
      this.setState({
        modalMessage: null,
        modalMessage2: null,
        modalShowing: null,
        selectedCountry: null,
      });
    }
  };

  modalClosing() {
    this.setState({
      modalMessage: null,
      modalMessage2: null,
      modalShowing: null,
      selectedCountry: null,
    });
  }

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
          message2={this.state.modalMessage2}
          countryCode={this.state.selectedCountry}
          onClose={this.modalClosing.bind(this)}
        />
      }
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(DashboardMap);