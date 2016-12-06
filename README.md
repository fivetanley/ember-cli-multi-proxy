# Ember CLI Multi Proxy

This addon provides similar functionality to Ember CLI's built-in proxy
behavior, but allows for multiple proxies to be mounted on the same
domain.

**This addon is not recommended for production usage!**

## Installation

`ember install ember-cli-multi-proxy`

## Usage

Running `ember install ember-cli-multi-proxy` should create a
`config/multi-proxy.js` file in the root of your project.

You can configure it by returning an object with proxies defined:

```javascript
// config/multi-proxy.js

module.exports = function(environment) {
  return {
    enabled: true,
    proxies: {
      // sends all requests except /api (which is defined below) to
      // my.example.com/
      // For example, to proxy to my.example.com/apps1, you would write
      // an AJAX request like $.getJSON('/apps1');
      "/*": "my.example.com/",

      // sends requests matching /api to my2.example.com/posts
      // For example, to proxy to my2.example.com/posts, you would write
      // an AJAX request like $.getJSON('/posts');
      "/posts": "my2.example.com/posts
    }
  }
};
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-cli-multi-proxy`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
