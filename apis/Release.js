/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import { AuthAxios } from '../constants/AxiosConfig';
import { getStore } from '../store';
import makeAuthenticatedCall from './Auth';

export const doGetRelease = () => {
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.get(`${process.env.BACKEND_URL}/releases`)
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

export const doSubmitNewRelease = (name, path) => {
  return new Promise(function(resolve, reject) {
    makeAuthenticatedCall()
      .then(data => {
        AuthAxios.post(`${process.env.BACKEND_URL}/releases`, {
          name,
          path
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
