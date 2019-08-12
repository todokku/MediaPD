/* eslint-disable import/no-cycle */
/* global fetch */

import {
  all,
  call,
  delay,
  put,
  take,
  takeLatest,
  takeEvery
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import {
  INCREASE_FILE_INDEX,
  CANCEL_ALL_UPLOAD,
  SHOW_RELEASE_DIALOG,
  ADD_RELEASE_FILES,
  CANCEL_UPLOAD,
  DONE_RELEASE_UPLOAD,
  UPLOAD_NEW_RELEASE,
  API_CREATE_NEW_PRODUCT,
  API_SAVE_PRODUCT_IN_QUEUE
} from './constants';
import {
  startUploadVideo,
  cancelUploadProduct,
  cancelAllUpload,
  apiCreateNewProductSideEffect,
  apiSaveProductInQueueSideEffect
} from './sagas/products';

import {
  uploadNewRelease,
  doneNewRelease,
  addNewReleaseToProduct,
  showReleaseDialog
} from './sagas/release';

es6promise.polyfill();

function* rootSaga() {
  yield all([
    takeEvery(INCREASE_FILE_INDEX, startUploadVideo),
    takeEvery(CANCEL_ALL_UPLOAD, cancelAllUpload),
    takeEvery(ADD_RELEASE_FILES, uploadNewRelease),
    takeEvery(DONE_RELEASE_UPLOAD, doneNewRelease),
    takeEvery(UPLOAD_NEW_RELEASE, addNewReleaseToProduct),
    takeEvery(SHOW_RELEASE_DIALOG, showReleaseDialog),
    takeEvery(CANCEL_UPLOAD, cancelUploadProduct),
    takeEvery(API_CREATE_NEW_PRODUCT, apiCreateNewProductSideEffect),
    takeEvery(API_SAVE_PRODUCT_IN_QUEUE, apiSaveProductInQueueSideEffect)
    
  ]);
}

export default rootSaga;
