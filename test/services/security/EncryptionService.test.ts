import { EncryptDecryptService } from "../../../src/services/security/EncryptDecryptService.js";

const testParameters = {
  context: { encryptDecryptService: new EncryptDecryptService() }
};

describe("Test retrieve encryption key", () => {
  const encryptionService = testParameters.context.encryptDecryptService;
  const keyId = "The quick brown fox jumps over the lazy dog";
  test(`retrieve token`, async () => {
    const result = encryptionService.getEncryptionKey(keyId);
    const expected = "16j7swfXgJRpypq8sAguT41WUeRtPNt2LQLQvzfJ5ZI=";

    return expect(result.toString("base64")).toEqual(expected);
  });
});

describe("Test encryption where the encryption key and initialization vector are provided by the service", () => {
  const textToEncrypt = '{"name":"Peter"}';
  const keyId = "The quick brown fox jumps over the lazy dog";

  test(`encrypt`, async () => {
    const key = testParameters.context.encryptDecryptService.getEncryptionKey(
      keyId
    );
    const iv = testParameters.context.encryptDecryptService.getInitializationVector(
      keyId
    );
    const encryptedText = testParameters.context.encryptDecryptService.encrypt(
      iv,
      key,
      textToEncrypt
    );
    console.log("Encrypted text is: " + encryptedText);

    return expect(encryptedText).toEqual(
      "K6xH4SyASghu+V56Sr50AyshmYPm+deMB73xB6iBw9M="
    );
  });
});

describe("Test decryption where the decryption key and initialization vector are provided by the service", () => {
  const textToDecrypt = "K6xH4SyASghu+V56Sr50AyshmYPm+deMB73xB6iBw9M=";
  const keyId = "The quick brown fox jumps over the lazy dog";

  test(`decrypt`, async () => {
    const key = testParameters.context.encryptDecryptService.getEncryptionKey(
      keyId
    );
    const iv = testParameters.context.encryptDecryptService.getInitializationVector(
      keyId
    );
    const decryptedText = testParameters.context.encryptDecryptService.decrypt(
      iv,
      key,
      textToDecrypt
    );
    console.log("Decrypted text is: " + decryptedText);

    return expect(decryptedText).toEqual('{"name":"Peter"}');
  });
});
