import { Algorithm, decode, verify } from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';

export class JwtUtil {
  verify(token: string, secret: string, algorihtm: Algorithm): any {
    return verify(token, secret, { algorithms: [algorihtm] });
  }

  decode(token: string) {
    return decode(token);
  }

  decodeComplete(token: string) {
    return decode(token, { complete: true });
  }

  toPem(key: any): string {
    return jwkToPem(key);
  }
}
