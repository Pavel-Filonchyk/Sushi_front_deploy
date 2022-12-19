const tokenName = 'arm-inspector_at'; // _at

const getToken = () => {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + tokenName.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export default {
  getToken
};