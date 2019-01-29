import fetch, { Request, RequestInit } from 'node-fetch';

async function checkStatus(response: any) {
  let errorJSON;
  if (response.ok) {
    return response;
  } else {
    try {
      errorJSON = await response.json();
    } catch (error) {
      throw response;
    }
    throw errorJSON;
  }
}

export const fetchJSON = (url: string | Request, init?: RequestInit) =>
  fetch(url, init)
    .then(checkStatus)
    .then(response => response.json());
