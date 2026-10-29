import { Request } from './request.js';

export function createEncoderDecoder(next) {
  return function (data) {
    const request = new Request(data.toString('utf-8'));
    return next(request);
  }
}
