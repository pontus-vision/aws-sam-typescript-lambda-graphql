import * as crypto from "crypto";

export class EncryptDecryptService {
  private static algorithm = "aes-256-cbc";
  private keyBuffer: Buffer;

  public getEncryptionKey(requester: string): string {
    return "K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72";
  }

  public getInitializationVector(requester: string): string {
    return "K7gNU3sdo+OL0wNh";
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

  public decrypt(iv: string, key: string, encryptedData: string) {
    const encryptedText = Buffer.from(encryptedData, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}
