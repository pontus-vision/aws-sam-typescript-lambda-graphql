import * as crypto from "crypto";

export class EncryptDecryptService {
  private static algorithm = "aes-256-cbc";

  public getEncryptionKey(keyId: string): Buffer {
    return crypto
      .createHash("sha256")
      .update(String(keyId), "utf8")
      .digest();
    // .substr(0, 32);
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
}
