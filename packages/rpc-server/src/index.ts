import RpcServer from './server';

export default function start() {
  const server = new RpcServer();
  server.start();
}
