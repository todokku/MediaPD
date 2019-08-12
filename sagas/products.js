/* eslint-disable no-lonely-if */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* global fetch */
import { all, call, select, put } from 'redux-saga/effects';
import { getStore } from '../store';
import {
  setUploadPercentCompleted,
  increaseFileIndex,
} from '../actions/productAction';
import {
  doGetSignedUrl,
  doFileUpload,
  doStartMultiUpload,
  doCancelUploadProduct,
  doCreateProduct,
  doSaveProductInQueue
} from '../apis/Product';

import {
  ALL_UPLOADS_COMPLETED,
  REMOVE_UPLOAD_WITHINDEX,
  RESET_PRODUCT,
  API_CREATE_NEW_PRODUCT, 
  API_CREATE_NEW_PRODUCT_SUCCESS,
  API_SAVE_PRODUCT_IN_QUEUE 
} from '../constants';

export const getProducts = state => state.products;
export const FILE_SIZE = 1024 * 1024 * 5;

///////////////////////////////////////////////////

export function* apiSaveProductInQueueSideEffect({ payload: { params } }) {

  try {
    const product  =  params;
    const productID = params.productId;
    const productUpdateModel = createVideoProductModel(product);
  
    const productUpdateRequestParams = { productID,productUpdateModel };
    const productUpdateResponse = yield call(doSaveProductInQueue,productUpdateRequestParams);

    console.log("Successfully saved product in queue : " + JSON.stringify(productUpdateResponse));
    //const payload =  {currentFileIndex,productCreateResponse};    
    
    //yield put({ type: API_CREATE_NEW_PRODUCT_SUCCESS, payload: payload });
  } catch (e) {
    console.log("failed to create produt apiSaveProductInQueueSideEffect ");
    //yield put({ type: API_BUTTON_CLICK_ERROR, payload: e.message });
  }
}

function createVideoProductModel(product) {
  console.log("creating model now : " + JSON.stringify(product));

  var basicInfo = {};
  if (product.basicInfo) {
    basicInfo = product.basicInfo;
  }
  
  var title = "";
  if (basicInfo && basicInfo.title) {
    title = basicInfo.title;
  }
  
  var categories = [];
  if (basicInfo && basicInfo.category) {
    categories = basicInfo.category.map(item => item.value );
  }

  var stockVideoUse = "";
  if (basicInfo && basicInfo.stockVideoUse) {
    stockVideoUse = basicInfo.stockVideoUse;
  }

  var orientation = "";
  if (basicInfo && basicInfo.orientation.value) {
    orientation = basicInfo.orientation.value;
  }

  var tags = [];
  if (product.tags) {
    tags = product.tags.map(item => item.name);
  }

  var releases = [];
  if (product.releases) {
    releases = product.releases.map(item => item.id);
  }

  var priceAndLicense = {};
  if (product.priceLicense) {
    priceAndLicense = product.priceLicense;
  }

  var originalResolutionPriceText = "0";
  if (priceAndLicense && priceAndLicense.originalResolutionPrice) {
    originalResolutionPriceText = priceAndLicense.originalResolutionPrice;
  }

  var originalResolutionPrice = 0;
  if (priceAndLicense && originalResolutionPriceText.length) {
    originalResolutionPrice = parseFloat(originalResolutionPriceText) * 100;
  }

  var hdresolutionPriceText = "0";
  if (priceAndLicense && priceAndLicense.hdresolutionPrice) {
    hdresolutionPriceText = priceAndLicense.hdresolutionPrice;
  }

  var hdresolutionPrice = 0;
  if (priceAndLicense && hdresolutionPriceText.length) {
    hdresolutionPrice = parseFloat(hdresolutionPriceText) * 100;
  }

  var enableSubscription = false;
  if (priceAndLicense && priceAndLicense.enableSubsription) {
    enableSubscription = priceAndLicense.enableSubsription;
  }

  var licensing = "";
  if (priceAndLicense && priceAndLicense.licensing) {
    licensing = priceAndLicense.licensing;
  }  

  var metaData = {};
  if (product.metaData) {
     metaData = product.metaData;
  }  

  var people = {};
  if (metaData.people) {
     people = metaData.people;
  }  

  var numberOfPeople = 0;
  if (people.numberOfPeople.value) {
    numberOfPeople = people.numberOfPeople.value;
  } 

  var gender = "";
  if (people.gender) {
    gender = people.gender;
  } 

  var ethnicities = [];
  if (people.ethnicity) {
    ethnicities = people.ethnicity;
  } 

  var ageRanges = [];
  if (people.ageRange) {
    ageRanges = people.ageRange;
  } 

  var weather = {};
  if (metaData.weather) {
     weather = metaData.weather;
  }  

  var weatherType = [];
  var weatherSeasons = [];
  var weatherClimates = [];

  if (weather && weather.type) {
    weatherType = weather.type;
  }

  if (weather && weather.season) {
    weatherSeasons = weather.season;
  }

  if (weather && weather.climate) {
    weatherClimates = weather.climate;
  }

  var camera = {};
  if (metaData.camera) {
    camera = metaData.camera;
  }  

  var cameraShotSize = [];
  var cameraAngles = [];
  var cameraFramings = [];
  var cameraMovements = [];

  if (camera && camera.size) {
    cameraShotSize = camera.size;
  }

  if (camera && camera.angle) {
    cameraAngles = camera.angle;
  }

  if (camera && camera.framing) {
    cameraFramings = camera.framing;
  }

  if (camera && camera.movement) {
    cameraMovements = camera.movement;
  }
 
  const model  = {
    basicInfo: {
      title: title,
      categories: categories,
      stockVideoUse: stockVideoUse,
      orientation : orientation
    },
    priceLicense: {
      originalResolutionPrice: originalResolutionPrice,
      hdresolutionPrice : hdresolutionPrice,
      enableSubscription: enableSubscription,
      licensing: licensing
    },
    tags:tags,
    releases: releases,
    metaData: {
      people: {
        numberOfPeople: numberOfPeople,
        gender: gender,
        ethnicities:ethnicities,
        ageRanges: ageRanges
      },
      weather: {
        type:weatherType,
        season: weatherSeasons,
        climate: weatherClimates
      },
      camera: {
      size: cameraShotSize,
      angle: cameraAngles,
      framing: cameraFramings,
      movement: cameraMovements
     }
    }
  };

  return model;  
}

 export function* apiCreateNewProductSideEffect({ payload: { params } }) {

  try {
    console.log(" Product - Creating product : " + JSON.stringify(params));
    const product = yield select(getProducts);
    const currentFileIndex = params.index;
    const createProductRequest  = params.params;
    const index = params.index;

    const productCreateResponse = yield call(doCreateProduct,createProductRequest);
    //console.log("Successfully created product : " + JSON.stringify(productCreateResponse));
    const payload =  {currentFileIndex,productCreateResponse};    
    console.log("Successfully created product : " + JSON.stringify(productCreateResponse));
    yield put({ type: API_CREATE_NEW_PRODUCT_SUCCESS, payload: payload });
  } catch (e) {
    console.log("failed to create produt apiCreateNewProductSideEffect ");
    //yield put({ type: API_BUTTON_CLICK_ERROR, payload: e.message });
  }
}

export function* startUploadVideo() {
  localStorage.removeItem('f_cancel');
  const product = yield select(getProducts);

  const currentFileIndex = product.currentFileBeingUploadedIndex;

  if (currentFileIndex >= product.bundle.filesToUpload.length) {
    yield put({ type: ALL_UPLOADS_COMPLETED, payload: {} });
    return;
  }

  const nextFileToUpload = product.bundle.filesToUpload[currentFileIndex];

  if (nextFileToUpload && nextFileToUpload.size > FILE_SIZE) {
    doStartMultiUpload(nextFileToUpload, currentFileIndex);
  } else {
    const params = {
      objectName: nextFileToUpload.name,
      contentType: nextFileToUpload.type,
      requestType:"product"
    };

    try {
      const response = yield call(doGetSignedUrl, params);

      const config = {
        headers: { 'Content-Type': nextFileToUpload.type },
        onUploadProgress(progressEvent) {
          if (localStorage.getItem('f_cancel')) {
            return;
          }
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          getStore().dispatch(
            setUploadPercentCompleted(percentCompleted, currentFileIndex)
          );
        }
      };

      const res = yield call(
        doFileUpload,
        response.signedUrl,
        nextFileToUpload,
        config
      );
      yield put(increaseFileIndex());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

export function* cancelAllUpload() {
  localStorage.setItem('f_cancel', 1);

  const product = yield select(getProducts);
  const { filesToUpload } = product.bundle;

  for (let index = filesToUpload.length - 1; index >= 0; index -= 1) {
    const file = product.bundle.filesToUpload[index];
    const { uploadId } = product.bundle.productsToUpload[index];
    const { percentUploadCompleted } = product.bundle.productsToUpload[index];
    const { currentFileBeingUploadedIndex } = product;
    console.log(`${currentFileBeingUploadedIndex}vs${index}`);

    let needDecreaseIndex = false;

    if (currentFileBeingUploadedIndex < index) {
      // delete file in the queue
      yield put({
        type: REMOVE_UPLOAD_WITHINDEX,
        payload: { index, needDecreaseIndex }
      });
    } else {
      // delete file - uploading or uploaded.
      if (percentUploadCompleted === 100) {
        // delete uploaded file
        yield put({
          type: REMOVE_UPLOAD_WITHINDEX,
          payload: { index, needDecreaseIndex }
        });
      } else {
        // delete uploading file
        needDecreaseIndex = false; // needn't upload next file because we cancel only

        if (file.size > FILE_SIZE) {
          const { success } = yield call(
            doCancelUploadProduct,
            file.name,
            uploadId
          );
          if (success) {
            yield put({
              type: REMOVE_UPLOAD_WITHINDEX,
              payload: { index, needDecreaseIndex }
            });
          }
        } else {
          yield put({
            type: REMOVE_UPLOAD_WITHINDEX,
            payload: { index, needDecreaseIndex }
          });
        }
      }
    }
  }

  yield put({
    type: RESET_PRODUCT,
    payload: {}
  });
}

export function* cancelUploadProduct({ payload: { index } }) {
  try {
    localStorage.setItem('f_cancel', 1);

    const product = yield select(getProducts);

    const file = product.bundle.filesToUpload[index];
    const { uploadId } = product.bundle.productsToUpload[index];
    const { percentUploadCompleted } = product.bundle.productsToUpload[index];
    const { currentFileBeingUploadedIndex } = product;
    console.log(`${currentFileBeingUploadedIndex}vs${index}`);

    let needDecreaseIndex = false;

    if (currentFileBeingUploadedIndex < index) {
      // delete file in the queue
      yield put({
        type: REMOVE_UPLOAD_WITHINDEX,
        payload: { index, needDecreaseIndex }
      });
    } else {
      // delete file - uploading or uploaded.
      if (percentUploadCompleted === 100) {
        yield put({
          type: REMOVE_UPLOAD_WITHINDEX,
          payload: { index, needDecreaseIndex }
        });
      } else {
        // delete uploading file
        needDecreaseIndex = true;

        if (file.size > FILE_SIZE) {
          const { success } = yield call(
            doCancelUploadProduct,
            file.name,
            uploadId
          );
          if (success) {
            yield all([
              yield put({
                type: REMOVE_UPLOAD_WITHINDEX,
                payload: { index, needDecreaseIndex }
              }),
              yield put(increaseFileIndex())
            ]);
          }
        } else {
          yield put({
            type: REMOVE_UPLOAD_WITHINDEX,
            payload: { index, needDecreaseIndex }
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
