import security from '../security/index';

export const useHttp = () => {
  const getUrl = (url, service) => {
    const { REACT_APP_MDM_API_URL: mdmUrl, REACT_APP_BPMN_URL: bpmnUrl, REACT_APP_TASKS_URL: tasksUrl } = window._env;
    console.log(mdmUrl);
    switch (service) {
      case 'mdm':
        return `${mdmUrl}${url}`;
      case 'bpmn':
        return `${bpmnUrl}${url}`;
      case 'tasks':
        return `${tasksUrl}${url}`;
      default:
        return url;
    }
  };

  const request = (config) => {
    const { service, url, method, data, id } = config;
    const response = {
      id,
      title: 'Курс UAN',
      layout: [
        {
          i: 'a',
          x: 0,
          y: 0,
          w: 3,
          h: 8,
          minW: 3,
          maxW: 5,
          minH: 8,
          maxH: 8
        }
      ],
      url: `http://mdm-api-adapter.integration-dev.d.exportcenter.ru/mdm-adapter/api/v1/catalogs/currency_rate/items/search?showDetails=0&showFiles=false&showRefs=0`, //getUrl(url, service),
      method,
      data,
      headers: {
        Authorization: `Bearer sso_1.0_${security.getToken()}`,
        'Content-Type': 'application/json'
      }
    };
    return response;
  };

  return { request };
};
