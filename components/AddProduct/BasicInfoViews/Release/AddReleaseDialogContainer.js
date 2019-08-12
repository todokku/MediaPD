/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import AddReleaseDialog from './AddReleaseDialog';

import {
  getRelease,
  checkReleaseHandler,
  uploadNewRelease,
  addReleaseFiles,
  cancelAllUploadFile,
  doneUploadFile,
  cancelUploadWithIndex
} from '../../../../actions/releaseAction';

const mapStateToProps = state => {
  return {
    release: state.release
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkReleaseHandler: index => {
      dispatch(checkReleaseHandler(index));
    },
    addReleaseFiles: files => {
      dispatch(addReleaseFiles(files));
    },
    uploadNewRelease: index => {
      dispatch(uploadNewRelease(index));
    },
    cancelUploadWithIndex: index => {
      dispatch(cancelUploadWithIndex(index));
    },
    cancelAllUploadFile: () => {
      dispatch(cancelAllUploadFile());
    },
    doneUploadFile: index => {
      dispatch(doneUploadFile(index));
    },
    getRelease: index => {
      dispatch(getRelease(index));
    }
  };
};

const AddReleaseDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReleaseDialog);

export default AddReleaseDialogContainer;
