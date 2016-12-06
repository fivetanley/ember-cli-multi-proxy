'use strict';

module.exports = function(environment) {
  return {
    proxies: {
      '/posts': 'https://jsonplaceholder.typicode.com',
      '/ip': 'http://ip.jsontest.com/'
    }
  };
};
