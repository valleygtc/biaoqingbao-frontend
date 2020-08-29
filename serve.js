const http = require('http');
const url = require('url');

const handler = require('serve-handler');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const server = http.createServer((request, response) => {
  const pathname = url.parse(request.url).pathname;
  if (pathname.startsWith('/api/')) {
    proxy.web(request, response, { target: 'http://localhost:5000' });
  } else {
    return handler(request, response, {
      "public": "build",
      "rewrites": [
        { "source": "/**", "destination": "/index.html" },
      ]}
    );
  }
})

server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
