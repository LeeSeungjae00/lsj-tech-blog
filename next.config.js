const { redirect } = require("next/dist/server/api-utils");

// next.config.js
const removeImports = require("next-remove-imports")();

module.exports = removeImports({
  // ✅  options...
  env: {
    customKey: "TEST ENV"
  },
  async rewrites() {
    return [{
      source: '/about/:slug*',
      destination: '/',
      has: [{ type: 'query', key: 'test', value: 'rewrite' }]
    }]
  },
  async redirect() {
    return [{
      source: '/aboutme',
      destination: '/',
      premanent: true
    }]
  },
  serverRuntimeConfig: {
    mySecret: 'secret',
  },
  publicRunTimeConfig: {
    staticFolder: '/static'
  },
  // distDir: 'build',
  devIndicators: {
    buildActivityPosition: 'top-right'
  }
});