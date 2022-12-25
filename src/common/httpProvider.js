import omit from 'lodash/omit'
import axios from 'axios'
import qs from 'qs'
import { getAccessToken } from './utils'

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
   
    let requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie}`,
      ...headers
    }

    let requestBody = data
    const requestKey = getRequestKey(url, data)
  
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

        return Promise.reject(error)
      })
      .finally(() => {
        currentRequests = omit(currentRequests, [requestKey])
      })

    return currentRequests[requestKey]
  }
};

export default HttpProvider
