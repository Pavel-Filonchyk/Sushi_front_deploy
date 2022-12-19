import isEmpty from 'lodash/isEmpty';

export const APP_CONFIG = isEmpty(window._env) ? process.env : window._env;