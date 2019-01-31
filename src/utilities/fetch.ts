import fetch, { Request, RequestInit } from 'node-fetch';

async function checkStatus(response: any) {
  let errorJSON;

  if (response.ok) {
    return response;
  } else {
    const errorText = await response.text();

    try {
      errorJSON = JSON.parse(errorText);
    } catch (error) {
      throw errorText;
    }
    throw errorJSON;
  }
}

export const fetchJSON = (url: string | Request, init?: RequestInit) =>
  fetch(url, init)
    .then(checkStatus)
    .then(response => response.json());
