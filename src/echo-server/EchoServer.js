import Echo from 'laravel-echo';
import axios from 'axios';
import FetchService from "../services/fetch/FetchService";
import EchoDecorator from './EchoDecorator';

window.io = require('socket.io-client');

const EchoInstance = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001',
  transports: ['websocket', 'polling', 'flashsocket'],
});

export default function EchoServer(token = null) {
  if (token === null) {
    return EchoInstance;
  }

  window.axios = FetchService.http(axios);

  EchoInstance.connector.setOptions({
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  EchoInstance.connector.connect();

  return new EchoDecorator(EchoInstance);
};