import * as crypto from "crypto";
import { Injectable } from "injection-js";
import { EncryptDirective } from "@src/directives/EncryptDirective";

@Injectable()
export class EncryptDecryptService {
  private static algorithm = "aes-256-cbc";

  public getEncryptionKey(keyId: string): Buffer {
    return crypto
      .createHash("sha256")
      .update(String(keyId), "utf8")
      .digest();
  }

  public getInitializationVector(keyId: string): Buffer {
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
      EncryptDecryptService.algorithm
    );

    const cipher = crypto.createCipheriv(
      EncryptDecryptService.algorithm,
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
      EncryptDecryptService.algorithm,
      key,
      iv
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  public recursiveEncrypt(args: any) {
    for (const objKey of Object.keys(args)) {
      if (typeof args[objKey] === "object") {
        this.recursiveEncrypt(args[objKey]);
      }
      if (EncryptDirective.fields[objKey]) {
        const initializationVector = this.getInitializationVector(
          "the cat jumped"
        );
        const encryptionKey = this.getEncryptionKey("the cat jumped");

        args[objKey] = this.encrypt(
          initializationVector,
          encryptionKey,
          args[objKey]
        );

        console.log(`!!!!!!! encrypted field ${objKey} = ${args[objKey]}`);
      }
    }

    return args;
  }
}
