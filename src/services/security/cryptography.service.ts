import * as crypto from "crypto";
import { Injectable } from "injection-js";
import { CryptographyDirective } from "@src/directives/CryptographyDirective";
import { Cryptography } from "@src/core/constants/Cryptography";
import "zone.js";
import "reflect-metadata";

@Injectable()
export class CryptographyService {
  private static algorithm = "aes-256-cbc";

  public getEncryptionKey(keyId: string): Buffer {
    return crypto
      .createHash("sha256")
      .update(String(keyId), "utf8")
      .digest();
  }

  public getInitVector(keyId: string): Buffer {
    return crypto
      .createHash("md5")
      .update(String(keyId), "utf8")
      .digest();
  }

  public encrypt(iv: Buffer, key: Buffer, text: string): string {
    console.log(
      'Encrypting "%s" with key "%s" and iv "%s" using %s',
      text,
      key,
      iv,
      CryptographyService.algorithm
    );

    const cipher = crypto.createCipheriv(
      CryptographyService.algorithm,
      key,
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("base64");
  }

  public decrypt(iv: Buffer, key: Buffer, encryptedValue: string) {
    const encryptedText = Buffer.from(encryptedValue, "base64");

    const decipher = crypto.createDecipheriv(
      CryptographyService.algorithm,
      key,
      iv
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  public recursiveCrypto(args: any, action: string) {
    for (const objKey of Object.keys(args)) {
      if (typeof args[objKey] === "object") {
        this.recursiveCrypto(args[objKey], action);
      }
      if (CryptographyDirective.fields[objKey]) {
        const initVector = this.getInitVector("the cat jumped");
        const encryptionKey = this.getEncryptionKey("the cat jumped");

        if (action === Cryptography.DECRYPT) {
          args[objKey] = this.decrypt(initVector, encryptionKey, args[objKey]);
        } else if (action === Cryptography.ENCRYPT) {
          args[objKey] = this.encrypt(initVector, encryptionKey, args[objKey]);
        }
      }
    }

    return args;
  }
}
