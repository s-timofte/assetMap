import Immutable from 'immutable';

import MOCKED_ASSETS from './../mocks/assets';

export const CLOSE_PANEL = 'CLOSE_PANEL';
export const FETCH_ASSET_DATA = 'FETCH_ASSET_DATA';
export const ON_ASSET_CLICK = 'ON_ASSET_CLICK';

export const closePanel = () => ({ type: CLOSE_PANEL, });
export const fetchAssetData = () => ({ type: FETCH_ASSET_DATA, });
export const onAssetClick = assets => ({ type: ON_ASSET_CLICK, assets, });

const defaultState = Immutable.fromJS({
  loading: true,
  assets: Immutable.List(),
  panelShowing: false,
  panelAssets: Immutable.List(),
});

const dataLayerState = (state = defaultState, action) => {
  switch (action.type) {
    case CLOSE_PANEL:
      return state.merge({
        panelShowing: false,
        panelAssets: Immutable.List(),
      });

    case FETCH_ASSET_DATA:
      return state.merge({
        assets: Immutable.fromJS(MOCKED_ASSETS),
        loading: false,
      });

    case ON_ASSET_CLICK:
      return state.merge({
        panelShowing: true,
        panelAssets: Immutable.fromJS(action.assets),
      });

    default:
      return state;
  }
};

export default dataLayerState;
