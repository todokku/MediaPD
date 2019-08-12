/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */

import Auth from '@aws-amplify/auth';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const makeAuthenticatedCall = () => {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then(data => {
        localStorage.setItem('token', data.accessToken.jwtToken);
        localStorage.removeItem('noUseToken');
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default makeAuthenticatedCall;
