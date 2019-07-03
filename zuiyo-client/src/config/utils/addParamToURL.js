/* eslint-disable import/prefer-default-export */

const hasParam = url => url.indexOf('?') > 0 && url.indexOf('=') > 0;
export const addParamToURL = (url, key, value) => {
  if (hasParam(url)) {
    return `${url}&${key}=${value}`;
  }
  return `${url}?${key}=${value}`;
};
