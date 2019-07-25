import React, { Component } from 'react';
import { VectorMap } from 'react-jvectormap';
import { getCode, getName, getData } from 'country-list';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';

class DashboardMap extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      mapData: {},
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
    debugger;
    console.log(countryCode);
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
        onRegionClick={(e, code) => this.handleClick(e, code)} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#2938bc" //color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: this.state.mapData, //this is your data
              scale: ["#002200", "#004400", "#006600", "#008800"], //your color game's here, 
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(DashboardMap);