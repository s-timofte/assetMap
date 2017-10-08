import { connect, } from 'react-redux';

import { closePanel, fetchAssetData, onAssetClick, } from './../ducks/map';

import Map from './../components/Map';

const mapStateToProps = state => ({
  mapData: state.map,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    closePanel: () => dispatch(closePanel()),
    fetchData: () => dispatch(fetchAssetData()),
    onAssetClick: assets => dispatch(onAssetClick(assets)),
  },
});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(Map);

export default ConnectedMap;
