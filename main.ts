import { server, port } from './lib/infrastructure/webserver';

server.listen(port, () => {
  console.log('Started URL shortner on port', port);
});
