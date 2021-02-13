import axios from 'axios';

// create a custom instance of axios
const instance = axios.create();

export function get(url) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      headers: {
        'Accept': 'application/json,application/xml;q=0.9,*/*;q=0.8',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    }).then(response => {
      resolve(response);
    }).catch(error => {
      catchError(handleResponse(error), reject);
    });
  })
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      resolve(response);
    }).catch(error => {
      catchError(handleResponse(error), reject);
    });
  });
}

function handleResponse(response) {
  if (!response) return;
  return {
    status: response.status,
    statusText: response.statusText
  }
}

function catchError(error, reject) {
  reject(error);
}

