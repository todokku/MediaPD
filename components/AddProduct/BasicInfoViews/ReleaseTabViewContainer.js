/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import ReleaseTabView from './ReleaseTabView';

import {
  showReleaseDialog
} from '../../../actions/releaseAction';

import {
  setProductWithIndex
} from '../../../actions/productAction';

const mapStateToProps = state => {
  return {
    release: state.release,
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showReleaseDialog: index => {
      dispatch(showReleaseDialog(index));
    },
    setProductWithIndex: (index, productItem) => {
      dispatch(setProductWithIndex(index, productItem));
    },
  };
};

const ReleaseTabViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseTabView);

export default ReleaseTabViewContainer;
