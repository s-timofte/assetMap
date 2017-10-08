import classnames from 'classnames';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component, } from 'react';

import asyncLoad from './../utils/async';
import CONST from './../utils/const';
import MAP_STYLE from './../utils/mapStyle';

import './map.scss';

class Map extends Component {
  constructor() {
    super();

    this.listeners = [];

    this.initMap = this.initMap.bind(this);
    this.onMapReady = this.onMapReady.bind(this);

    window.initMap = this.initMap;
  }

  componentDidMount() {
    /**
     * Google Maps Support
     */
    asyncLoad(`https://maps.googleapis.com/maps/api/js?key=${CONST.GOOGLE.MAPS_API_KEY}&callback=initMap`);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.mapData.get('loading') === true &&
      this.props.mapData.get('loading') === false
    ) {
      const initialMarkers = this.props.mapData.get('assets').map((asset) => {
        const marker = new google.maps.Marker({
          customData: asset.toJS(),
          label: asset.get('label'),
          position: asset.get('coordinates').toJS(),
        });

        this.listeners.push(google.maps.event.addListener(marker, 'click', () => {
          this.props.actions.onAssetClick([
            marker.customData,
          ]);
        }));

        return marker;
      });

      const { map, } = this;

      this.markerClusterer = new MarkerClusterer(map, initialMarkers.toJS(), {
        zoomOnClick: false,
      });

      this.listeners.push(google.maps.event.addListener(this.markerClusterer, 'clusterclick', (cluster) => {
        this.props.actions.onAssetClick(cluster.getMarkers().map(marker => marker.customData));
      }));
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.listeners.forEach((listener) => {
        google.maps.event.removeListener(listener);
      });
    }
  }

  onMapReady() {
    if (this.props.mapData.get('loading') === true) {
      this.props.actions.fetchData();
    }
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement, CONST.GOOGLE.MAPS_DEFAULTS);
    const styledMapType = new google.maps.StyledMapType(MAP_STYLE, {
      name: 'Aubergine',
    });

    this.map.mapTypes.set(CONST.GOOGLE.MAPS_STYLE, styledMapType);
    this.map.setMapTypeId(CONST.GOOGLE.MAPS_STYLE);

    this.listeners.push(google.maps.event.addListener(this.map, 'tilesloaded', this.onMapReady));
  }

  render() {
    return (
      <div className="Map-Wrapper">
        <div
          className="Map-Container"
          ref={(map) => {
            this.mapElement = map;
          }}
        />
        <div
          className={classnames('Map-Panel', {
            'Map-Panel-showing': this.props.mapData.get('panelShowing') === true,
          })}
        >
          <h1 className="Map-Title">Assets:</h1>
          <span
            className="Map-PanelClose"
            onClick={() => {
              this.props.actions.closePanel();
            }}
          />
          {
            this.props.mapData.get('panelAssets', Immutable.List()).map(asset => (
              <div
                className="Map-Asset"
                key={asset.get('name')}
              >
                <div className="Map-AssetIdentification">
                  <span
                    className={classnames('Map-AssetStatus', {
                      'Map-AssetStatus-good': asset.get('status') === CONST.HEALTH_STATUS.GOOD,
                      'Map-AssetStatus-warning': asset.get('status') === CONST.HEALTH_STATUS.WARNING,
                      'Map-AssetStatus-bad': asset.get('status') === CONST.HEALTH_STATUS.BAD,
                    })}
                    title={`Health Status: ${asset.get('status') === CONST.HEALTH_STATUS.GOOD ? 'GOOD' : ''}${asset.get('status') === CONST.HEALTH_STATUS.WARNING ? 'WARNING' : ''}${asset.get('status') === CONST.HEALTH_STATUS.BAD ? 'BAD' : ''}`}
                  />
                  <span className="Map-AssetLabel">Asset Name:</span>
                  <span className="Map-AssetName">{asset.get('name')}</span>
                </div>
                <div className="Map-AssetLocation Map-AssetLocation-padded">
                  <span className="Map-AssetLabel">Latitude:</span>
                  <span
                    className="Map-AssetName"
                  >
                    {asset.getIn([
                      'coordinates',
                      'lat',
                    ])}
                  </span>
                </div>
                <div className="Map-AssetLocation Map-AssetLocation-padded">
                  <span className="Map-AssetLabel">Longitude:</span>
                  <span
                    className="Map-AssetName"
                  >
                    {asset.getIn([
                      'coordinates',
                      'lng',
                    ])}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  actions: PropTypes.object.isRequired,
  mapData: PropTypes.object.isRequired,
};

export default Map;
