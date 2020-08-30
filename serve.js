const http = require('http');
const url = require('url');
const os = require('os');

const handler = require('serve-handler');
const httpProxy = require('http-proxy');

const interfaces = os.networkInterfaces();
const proxy = httpProxy.createProxyServer();

const getNetworkAddress = () => {
	for (const name of Object.keys(interfaces)) {
		for (const interface of interfaces[name]) {
			const {address, family, internal} = interface;
			if (family === 'IPv4' && !internal) {
				return address;
			}
		}
	}
};

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

server.listen(3000, '0.0.0.0', () => {
  const privateIp = getNetworkAddress();
  console.log('Running:');
  console.log('Local: http://localhost:3000');
  console.log(`On Your Network: http://${privateIp}:3000`);
});
