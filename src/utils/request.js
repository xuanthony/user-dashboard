import fetch from 'dva/fetch';

function parseJSON(response) {
  console.log('后台返回值是：%o', response);
  const arrResult = Object.keys(response).map(key => response[key]);
  console.log('解析成数组：%o', arrResult);
  return arrResult;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log('status = ');
    console.log(response.status);
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  console.log('options参数是：%o', options);
  const response = await fetch(url, options);
  console.log('后台响应response：%o', response);
  checkStatus(response);
  const data = await response.json();
  console.log('json格式：%o', data);
  // const ret = {
  //   data,
  //   headers: {},
  // };

  // if (response.headers.get('x-total-count')) {
  //   ret.headers['x-total-count'] = response.headers.get('x-total-count');
  // }

  return data;
}
