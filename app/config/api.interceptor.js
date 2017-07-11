import axios from 'axios';


const API_PATH = 'https://coworkio.herokuapp.com';
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(function(config) {
  // Concatenate base path if not an absolute URL
  if ( !isAbsoluteURLRegex.test(config.url) ) {
    config.url = API_PATH + config.url;
  }

  return config;
});