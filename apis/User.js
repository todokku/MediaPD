/* eslint-disable no-unused-vars */
import { AuthAxios } from '../constants/AxiosConfig';
import makeAuthenticatedCall from './Auth';

export const createIdentificationRecord = objectKey => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.post(`${process.env.BACKEND_URL}/addid`, { token: objectKey })
          .then(response => {
            resolve(response);
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

// eslint-disable-next-line import/prefer-default-export
export const doGetUser = username => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.get(`${process.env.BACKEND_URL}/users`)
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

export const doCreateUser = params => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.post(`${process.env.BACKEND_URL}/users`, params)
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

export const doUpdateMembership = (username, params) => {
  // eslint-disable-next-line func-names
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.put(
          `${process.env.BACKEND_URL}/users/update_membership`,
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
