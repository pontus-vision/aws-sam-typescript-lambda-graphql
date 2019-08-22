import { EncryptDecryptService } from "../../../src/services/security/EncryptDecryptService.js";

const testParameters = {
  context: { encryptDecryptService: new EncryptDecryptService() }
};

describe("Test retrieve encryption key", () => {
  const encryptionService = testParameters.context.encryptDecryptService;
  test(`retrieve token`, async () => {
    const result = encryptionService.getEncryptionKey("");

    return expect(result).toEqual("47DEQpj8HBSa+/TImW+5JCeuQeRkm5NM");
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
      "ebad58ab5777e137db4d08446ad14db46b622fe6c1e63deb1a32b7d02388b403"
    );
  });
});

describe("Test decryption where the decryption key and initialization vector are provided by the service", () => {
  const textToDecrypt =
    "ebad58ab5777e137db4d08446ad14db46b622fe6c1e63deb1a32b7d02388b403";

  const keyId = "The quick brown fox jumps over the lazy dog";

  test(`decrypt`, async () => {
    const key = testParameters.context.encryptDecryptService.getEncryptionKey(
      keyId
    );
    const iv = testParameters.context.encryptDecryptService.getInitializationVector(
      keyId
    );
    const encryptedText = testParameters.context.encryptDecryptService.decrypt(
      iv,
      key,
      textToDecrypt
    );
    console.log("Encrypted text is: " + encryptedText);

    return expect(encryptedText).toEqual('{"name":"Peter"}');
  });
});
