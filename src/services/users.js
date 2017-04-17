import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ offIndex }) {
  console.log('page的json.stringify');
  console.log(JSON.stringify(offIndex));
  return request(`/api/user/userList?_offIndex=${offIndex}&_pageSize=${PAGE_SIZE}`);
}

export function remove(id) {
  return request('/api/user/remove', {
    method: 'POST',
    body: {
      id: { id },
    },
  });
}

export function patch(id, values) {
  return request('/api/user/', {
    method: 'POST',
    body: {
      id: { id },
      values: JSON.stringify(values),
    },
  });
  // return request('/api/user/userList', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //   },
  //   body: JSON.stringify(page),
  // });
}

export function create(values) {
  return request('/api/user', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
