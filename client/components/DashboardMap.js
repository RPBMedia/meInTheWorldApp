import React, { Component } from 'react';
import { VectorMap } from 'react-jvectormap';
import { getCode, getData } from 'country-list';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import Modal from './Modal';
import { getCountryName } from '../utils'

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
    console.log(countryCode);
    if(this.state.selectedCountry === null) {
      if(this.state.mapData.hasOwnProperty(countryCode)){
        this.setState({
          // modalMessage: `${getCountryName(countryCode)}: ${this.state.mapData[countryCode]} locations visited`,
          // modalShowing: true,
          // selectedCountry: countryCode,
        })
      } else {
        this.setState({
          // modalMessage: ` You haven't visited ${getCountryName(countryCode)} yet`,
          // modalShowing: true,
          // selectedCountry: countryCode,
        })
      }
    } else {
      this.setState({
        // modalMessage: null,
        // modalShowing: null,
        // selectedCountry: null,
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
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px"
          }}
          onRegionClick={(e, code) => this.handleClick(e, code)}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            selected: {
              fill: "#ff0000" //color for the clicked country
            },
            
          }}
          regionsSelectable={false}
          series={{
            regions: [
              {
                values: this.state.mapData, //this is your data
                scale: ["#001100", "#00ff00"], //your color game's here, 
                normalizeFunction: 'polynomial',
              }
            ]
          }}
        />
      {/* {this.state.modalShowing && 
        <Modal
          message={this.state.modalMessage}
        />
      } */}
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(DashboardMap);