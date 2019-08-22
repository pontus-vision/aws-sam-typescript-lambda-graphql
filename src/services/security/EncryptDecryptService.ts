import * as crypto from "crypto";

export class EncryptDecryptService {
  private static algorithm = "aes-256-cbc";

  public getEncryptionKey(keyId: string): string {
    return crypto
      .createHash("sha256")
      .update(String(keyId))
      .digest("base64")
      .substr(0, 32);
  }

  public getInitializationVector(keyId: string): string {
    return crypto
      .createHash("sha256")
      .update(String(keyId))
      .digest("base64")
      .substr(0, 16);
  }

  public encrypt(iv: string, key: string, text: string): string {
    console.log(
      'Encrypting "%s" with key "%s" and iv "%s" using %s',
      text,
      Buffer.from(key, "utf8"),
      Buffer.from(iv, "hex"),
      EncryptDecryptService.algorithm
    );

    const cipher = crypto.createCipheriv(
      EncryptDecryptService.algorithm,
      Buffer.from(key, "utf8"),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }

  public decrypt(iv: string, key: string, encryptedValue: string) {
    const encryptedText = Buffer.from(encryptedValue, "hex");

    const decipher = crypto.createDecipheriv(
      EncryptDecryptService.algorithm,
      Buffer.from(key),
      iv
    );

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}
