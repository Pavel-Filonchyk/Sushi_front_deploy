import omit from 'lodash/omit'
import axios from 'axios'
import qs from 'qs'
//import { getAccessToken } from './utils';

//import { showNotification } from '../components/Notification';
//import { EMPLOYEE_INVITE_URL } from './api'  // токен

const HttpProvider = {

  post(url, params = {}) {
    return HttpProvider.request({
      url,
      method: 'POST',
      ...params
    })
  },

  get(url, params = {}) {
    return HttpProvider.request({
      url,
      method: 'GET',
      ...params
    })
  },
  put(url, params = {}) {
    return HttpProvider.request({
      url,
      method: 'PUT',
      ...params
    });
  },
  delete(url, params = {}) {
    return HttpProvider.request({
      url,
      method: 'DELETE',
      ...params
    })
  },

  request(params) {
    const { url, headers, data, ...restOptions } = params

    let currentRequests = {};
    const getRequestKey = (url, data) => `${url},body:${JSON.stringify(data)}`

    // авторизация
    let requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer sso_1.0_${getAccessToken()}`,
      // ...headers
    }
    
    let requestBody = data
    const requestKey = getRequestKey(url, data)
    const uidmBaseData = {
      client_id: 'arm-lkb_m2m',
      client_secret: 'password',
      realm: '/customer',
      grant_type: 'urn:roox:params:oauth:grant-type:m2m'
    }
    // requestBody = qs.stringify({
    //   ...uidmBaseData,
    //   ...requestBody
    // })
    // axios add
    currentRequests[requestKey] = axios({
      headers: requestHeaders,
      url: url,
      data: requestBody,
      ...restOptions                                     
    })
      .then((response) => response)
      .catch((error) => {
        const statusCode = error?.response?.status
        const isUnauthorized = statusCode === 401

        if (isUnauthorized) {
          window.location.reload()
        }

        // showNotification({
        //   title: 'Ошибка запроса',
        //   message: [
        //     statusCode ? `Status Code: ${statusCode}` : '',
        //     error?.response?.data?.message || error?.response?.data?.error?.message,
        //     fullUrl
        //   ]
        // });

        return Promise.reject(error)
      })
      .finally(() => {
        currentRequests = omit(currentRequests, [requestKey])
      })

    return currentRequests[requestKey]
  }
};

export default HttpProvider
