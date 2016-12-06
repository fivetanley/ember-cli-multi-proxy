/* jshint node: true */
'use strict';

function MultiProxyServerAddon(project) {
  this.project = project;
  this.name = 'ember-cli-multi-proxy';
}

MultiProxyServerAddon.prototype.serverMiddleware = function(options) {
  var app = options.app;
  var server = options.options.httpServer;
  var options = options.options;
  var morgan = require('morgan');
  var proxy = require('express-http-proxy');
  var fs = require('fs');
  var path = require('path');
  var ui = options.ui || this.ui;

  var configPath = path.join(this.project.root, 'config', 'multi-proxy.js');

  if (!fs.existsSync(configPath)) {
    ui.writeLine('could not load multi-proxy.js config file at ' + configPath + ', skipping proxying');
    return;
  }

  var proxyConfig = require(configPath)(options.environment);
  var proxies = proxyConfig.proxies = proxyConfig.proxies || {};

  // dev format from https://www.npmjs.com/package/morgan, but adds whether it was proxied
  var logFormat = ':method :url :status :response-time ms - :res[content-length] ember-cli-multi-proxy';
  app.use(morgan(logFormat));
  Object.keys(proxies).forEach(function(localProxyPath) {
    var remoteHost = proxies[localProxyPath];
    app.use(localProxyPath, proxy(remoteHost, {
      decorateRequest: function(proxyReq, originalReq) {
        console.log(Object.keys(proxyReq));
        ui.writeLine('ember-cli-multi-proxy: proxied ' + originalReq.url + ' to ' + proxyReq.hostname + proxyReq.path);
        return proxyReq;
      }
    }));
  });
};

module.exports = MultiProxyServerAddon;
