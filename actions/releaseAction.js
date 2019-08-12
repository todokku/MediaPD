/* eslint-disable import/prefer-default-export */
import {
  GET_RELEASE,
  ADD_RELEASE_FILES,
  UPLOAD_RELEASE_PERCENTCOMPLETED,
  SAVE_RELEASE_UPLOADFILESINFO,
  UPLOAD_NEW_RELEASE,
  CHECK_RELEASE_ITEM,
  CANCEL_ALL_RELEASE_UPLOAD,
  CANCEL_RELEASE_UPLOAD_INDEX,
  SHOW_RELEASE_DIALOG,
  DONE_RELEASE_UPLOAD
} from '../constants';

export function getRelease(index) {
  return {
    type: GET_RELEASE,
    payload: { index }
  };
}

export function checkReleaseHandler(index) {
  return {
    type: CHECK_RELEASE_ITEM,
    payload: { index }
  };
}

export function showReleaseDialog(index) {
  return {
    type: SHOW_RELEASE_DIALOG,
    payload: { index }
  };
}

export function addReleaseFiles(files) {
  return {
    type: ADD_RELEASE_FILES,
    payload: { files }
  };
}

export function uploadNewRelease(index) {
  return {
    type: UPLOAD_NEW_RELEASE,
    payload: { index }
  };
}

export function setUploadPercentCompleted(percentCompleted, index) {
  return {
    type: UPLOAD_RELEASE_PERCENTCOMPLETED,
    payload: { percentCompleted, index }
  };
}

export function saveReleaseFile(name, path, index) {
  return {
    type: SAVE_RELEASE_UPLOADFILESINFO,
    payload: { name, path, index }
  };
}

export function cancelAllUploadFile() {
  return {
    type: CANCEL_ALL_RELEASE_UPLOAD,
    payload: {}
  };
}

export function cancelUploadWithIndex(index) {
  return {
    type: CANCEL_RELEASE_UPLOAD_INDEX,
    payload: { index }
  };
}

export function doneUploadFile(index) {
  return {
    type: DONE_RELEASE_UPLOAD,
    payload: { index }
  };
}
