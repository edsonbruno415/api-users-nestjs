import * as crypto from 'crypto';

export class Crypto {
  public static async createhash(text: string): Promise<string> {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  public static async compareHash(text: string, hash: string): Promise<boolean> {
    return hash === (await Crypto.createhash(text));
  }
}
