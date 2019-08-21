import { EncryptDecryptService } from "../../../src/services/security/EncryptDecryptService.js";

const testParameters = {
  context: { encryptDecryptService: new EncryptDecryptService() }
};

describe("Test retrieve encryption key", () => {
  const encryptionService = testParameters.context.encryptDecryptService;
  test(`retrieve token`, async () => {
    const result = encryptionService.getEncryptionKey("");

    return expect(result).toEqual("K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72");
  });
});

describe("Test encryption where the encryption key and initialization vector are provided by the service", () => {
  const textToEncrypt = '{"name":"Peter"}';
  test(`encrypt`, async () => {
    const key = testParameters.context.encryptDecryptService.getEncryptionKey(
      ""
    );
    const iv = testParameters.context.encryptDecryptService.getInitializationVector(
      ""
    );
    const encryptedText = testParameters.context.encryptDecryptService.encrypt(
      iv,
      key,
      textToEncrypt
    );
    console.log("Encrypted text is: " + encryptedText);

    return expect(encryptedText).toEqual(
      "3c178770b9d14d4d9966b084f44e3b76e30973f2f3253471037801b6563bacaf"
    );
  });
});

describe("Test decryption where the decryption key and initialization vector are provided by the service", () => {
  const textToDecrypt =
    "3c178770b9d14d4d9966b084f44e3b76e30973f2f3253471037801b6563bacaf";
  test(`decrypt`, async () => {
    const key = testParameters.context.encryptDecryptService.getEncryptionKey(
      ""
    );
    const iv = testParameters.context.encryptDecryptService.getInitializationVector(
      ""
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
