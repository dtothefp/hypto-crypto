import mirror from '../utils/key-mirror';

export const nav = mirror('nav', [
  'SET',
  'SELECT'
]);

export const modal = mirror('modal', [
  'INIT',
  'OPEN',
  'CLOSE'
]);

export const http = mirror('http', [
  'PENDING',
  'SUCCESS',
  'ERROR'
]);
