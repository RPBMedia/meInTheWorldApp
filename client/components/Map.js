import React, { Component } from 'react';
import { VectorMap } from 'react-jvectormap';

class Map extends Component {

  handleClickInitiated(e, code) {
    // eslint-disable-next-line react/no-string-refs
    this.refs.map.$mapObject.tip.hide();
    this.props.handleClick(e, code);
  }

  render() {
    return (
      <div>
        <VectorMap
          map={"world_mill"}
          // eslint-disable-next-line react/no-string-refs
          ref={"map"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px"
          }}
          onRegionClick={(e, code) => this.handleClickInitiated(e, code)}
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
          labels={null}
          series={{
            regions: [
              {
                values: this.props.mapData, //this is your data
                scale: ["#00ff00", "#009900"], //your color game's here, 
                normalizeFunction: 'polynomial',
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default Map;