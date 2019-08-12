/* eslint-disable no-lonely-if */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* global fetch */
import { all, call, select, put } from 'redux-saga/effects';
import { getStore } from '../store';
import {
  setUploadPercentCompleted,
  saveReleaseFile
} from '../actions/releaseAction';
import { doGetRelease, doSubmitNewRelease } from '../apis/Release';
import { doGetSignedUrl, doFileUpload } from '../apis/Product';

import {
  GET_RELEASE_SUCCESS,
  GET_RELEASE_FAILED,
  SET_RELEASE_UPLOADING,
  NEW_REALEASE_UPLOAD_FAILED,
  SHOW_RELEASE_DIALOG,
  ADD_RELEASE_PRODUCT
} from '../constants';

export const getReleases = state => state.release;
export const getProducts = state => state.products;

export const FILE_SIZE = 1024 * 1024 * 5;

export function* showReleaseDialog({ payload: { index } }) {
  try {
    const { releases } = yield call(doGetRelease);

    console.log('ssss---' + index);
    const products = yield select(getProducts);
    const productReleases = products.bundle.productsToUpload[index].releases;

    if (productReleases.length > 0) {
      for (let i = 0; i < releases.length; i += 1) {
        const releaseItem = releases[i];
        console.log(JSON.stringify(releaseItem));
        if (productReleases.find(item => item.id === releaseItem.id)) {
          releaseItem.checked = true;
          releases[i] = releaseItem;
          console.log(JSON.stringify(releaseItem));
        }
      }
    }
    console.log('ssss444');
    if (releases !== null) {
      yield all([
        yield put({ type: GET_RELEASE_SUCCESS, payload: { releases } })
      ]);
    }
  } catch (error) {
    yield all([yield put({ type: GET_RELEASE_FAILED, payload: { error } })]);
  }
}

export function* uploadNewRelease() {
  try {
    const { uploadFiles } = yield select(getReleases);

    yield put({ type: SET_RELEASE_UPLOADING, payload: { uploading: true } });

    console.log('---------');
    for (let i = 0; i < uploadFiles.length; i += 1) {
      const uploadFile = uploadFiles[i];
      console.log(uploadFiles.length);
      if (!uploadFile.canceled) {
        try {
          const params = {
            objectName: uploadFile.file.name,
            contentType: uploadFile.file.type,
            requestType:"release"
          };

          console.log(uploadFile.file.name);
          const response = yield call(doGetSignedUrl, params);

          const config = {
            headers: { 'Content-Type': uploadFile.file.type },
            onUploadProgress(progressEvent) {
              if (localStorage.getItem('f_cancel')) {
                return;
              }
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );

              getStore().dispatch(
                setUploadPercentCompleted(percentCompleted, i)
              );
            }
          };

          const res = yield call(
            doFileUpload,
            response.signedUrl,
            uploadFile.file,
            config
          );

          yield all([
            yield put(saveReleaseFile(response.fileName, response.path, i))
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    yield all([
      yield put({ type: NEW_REALEASE_UPLOAD_FAILED, payload: { error } })
    ]);
  }
}

export function* doneNewRelease({ payload: { index } }) {
  try {
    const { uploadFiles } = yield select(getReleases);

    yield put({ type: SET_RELEASE_UPLOADING, payload: { uploading: true } });

    console.log('---------');
    for (let i = 0; i < uploadFiles.length; i += 1) {
      const uploadFile = uploadFiles[i];
      console.log(uploadFiles.name);
      if (!uploadFile.canceled) {
        yield all([
          yield call(doSubmitNewRelease, uploadFile.name, uploadFile.path)
        ]);
      }
    }
    yield all([
      yield put({
        type: SHOW_RELEASE_DIALOG,
        payload: { index }
      }),
      yield put({
        type: SET_RELEASE_UPLOADING,
        payload: { uploading: false }
      })
    ]);
  } catch (error) {
    yield all([
      yield put({ type: NEW_REALEASE_UPLOAD_FAILED, payload: { error } }),
      yield put({
        type: SET_RELEASE_UPLOADING,
        payload: { uploading: false }
      })
    ]);
  }
}

export function* addNewReleaseToProduct({ payload: { index } }) {
  try {
    const release = yield select(getReleases);

    const releases = release.releases.filter(item => item.checked === true);

    yield all([
      yield put({
        type: ADD_RELEASE_PRODUCT,
        payload: { index, releases }
      })
    ]);
  } catch (error) {
    yield all([
      yield put({ type: NEW_REALEASE_UPLOAD_FAILED, payload: { error } })
    ]);
  }
}
