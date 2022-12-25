import { POST_LOGIN } from './api';

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+\^])/g, '\\$1')}=([^;]*)`)
  )
  
  console.log(document.cookie)
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getAccessToken = () => getCookie(`${POST_LOGIN}`);
