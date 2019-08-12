/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable func-names */
import { AuthAxios, NormalAxios } from '../constants/AxiosConfig';
import { getStore } from '../store';
import makeAuthenticatedCall from './Auth';
import {
  setUploadPercentCompleted,
  increaseFileIndex,
  apiCreateNewProductAction
} from '../actions/productAction';


export const doSaveProductInQueue = params => {
  return new Promise(function(resolve, reject) {

    
    const product_id = params.productID;
    const productUpdateModel = params.productUpdateModel;
    console.log("API call doSaveProductInQueue");

    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.put(`${process.env.BACKEND_URL}/product/${product_id}`, productUpdateModel)
        .
        then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const doCreateProduct = params => {
  return new Promise(function(resolve, reject) {
    console.log("API call doCreateProduct : " + params);
    const productType = params.type;
    
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.post(`${process.env.BACKEND_URL}/product`, {
          type: productType
        })
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const doGetSignedUrl = params => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.post(
          `${process.env.BACKEND_URL}/getsignedurl`,
          params
        )
          .then(response => {
            resolve(response.data.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const doFileUpload = (signedUrl, nextFileToUpload, config) => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    localStorage.setItem('noUseToken', '1');
    // create new product
    // TODO: This would need to be dynamic and take in more than one type as a param
    // getStore().dispatch(
    //   apiCreateNewProductAction(
    //     { type: 0 }
    //   )
    // );
    NormalAxios.put(signedUrl, nextFileToUpload, config)
      .then(response => {
        localStorage.removeItem('noUseToken');
        resolve(response);
      })
      .catch(err => {
        localStorage.removeItem('noUseToken');
        reject(err);
      });
  });
};

export const uploadMultipartFile = async (file, uploadId, currentFileIndex) => {
  try {
    const FILE_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
    const fileSize = file.size;
    const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1;
    const promisesArray = [];
    let start;
    let end;
    let blob;

    // getStore().dispatch(
    //   apiCreateNewProductAction(
    //     { type: 0 }
    //   )
    // );

    for (let index = 1; index < NUM_CHUNKS + 1; index += 1) {
      start = (index - 1) * FILE_CHUNK_SIZE;
      end = index * FILE_CHUNK_SIZE;
      blob = index < NUM_CHUNKS ? file.slice(start, end) : file.slice(start);

      // (1) Generate presigned URL for each part
      const getUploadUrlResp = await AuthAxios.get(
        `${process.env.BACKEND_URL}/getsignedurl/multi/get-upload-url`,
        {
          params: {
            fileName: file.name,
            partNumber: index,
            uploadId
          }
        }
      );

      const presignedUrl = getUploadUrlResp.data.data;

      localStorage.setItem('noUseToken', '1');

      const config = {
        headers: { 'Content-Type': file.type },
        onUploadProgress(progressEvent) {
          if (localStorage.getItem('f_cancel')) {
            return;
          }
          let percentCompleted =
            (progressEvent.loaded * 100) / progressEvent.total;

          percentCompleted = Math.round(
            (100 / NUM_CHUNKS) * (index - 1) + percentCompleted / NUM_CHUNKS
          );

          getStore().dispatch(
            setUploadPercentCompleted(
              percentCompleted,
              currentFileIndex,
              uploadId
            )
          );
        }
      };

      const uploadResp = await NormalAxios.put(presignedUrl, blob, config);

      localStorage.removeItem('noUseToken');

      promisesArray.push(uploadResp);
    }

    const resolvedArray = await Promise.all(promisesArray);
    //console.log(resolvedArray, ' resolvedAr');

    const uploadPartsArray = [];
    resolvedArray.forEach((resolvedPromise, index) => {
      // console.log(`etag${resolvedPromise.headers.etag}`);

      uploadPartsArray.push({
        ETag: resolvedPromise.headers.etag,
        PartNumber: index + 1
      });
    });

    // (3) Calls the CompleteMultipartUpload endpoint in the backend server

    const completeUploadResp = await AuthAxios.post(
      `${process.env.BACKEND_URL}/getsignedurl/multi/complete-upload`,
      {
        params: {
          fileName: file.name,
          parts: uploadPartsArray,
          uploadId
        }
      }
    );

    if (localStorage.getItem('f_cancel')) {
      return;
    }

    getStore().dispatch(increaseFileIndex());
    // {
    //   "Location": "https://s3.us-east-2.amazonaws.com/com.id.test/Archive+2.zip",
    //   "Bucket": "com.id.test",
    //   "Key": "Archive 2.zip",
    //   "ETag": "\"1c3905902fd1d531406b3f8bd528ca18-2\""
    // }
  } catch (err) {
    console.log(err);
  }
};

export const doStartMultiUpload = async (file, currentFileIndex) => {
  try {
    // console.log('Inside startUpload')
    await makeAuthenticatedCall();

    console.log(`${file.type} FileType`);
    const resp = await AuthAxios.get(
      `${process.env.BACKEND_URL}/getsignedurl/multi/start-upload`,
      {
        params: {
          fileName: file.name,
          fileType: file.type
        }
      }
    );

    await uploadMultipartFile(file, resp.data.data, currentFileIndex);
  } catch (err) {
    console.log(err);
  }
};

export const doDeleteUploadProduct = async key => {
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.delete(`${process.env.BACKEND_URL}/getsignedurl/${key}`)
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const doCancelUploadProduct = async (name, uploadId) => {
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.post(`${process.env.BACKEND_URL}/getsignedurl/multi`, {
          params: {
            fileName: name,
            uploadId
          }
        })
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};
