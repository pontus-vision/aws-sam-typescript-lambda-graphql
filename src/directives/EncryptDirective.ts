import { SchemaDirectiveVisitor } from "graphql-tools";
import {
  GraphQLEnumValue,
  GraphQLField,
  defaultFieldResolver,
  GraphQLInputField
} from "graphql";

export class EncryptDirective extends SchemaDirectiveVisitor {
  private initializationVector: Buffer;

  private encryptionKey: Buffer;

  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    //
    field.resolve = async (source, otherArgs, context, info) => {
      console.log(`The beginning info ${JSON.stringify(otherArgs)}`);
      console.log(`Field is ${JSON.stringify(field)}`);

      // Mutation
      if ("mutation" === info.operation.operation) {
        console.log('The value is "%s"', JSON.stringify(otherArgs));
        const encrypted = context.encryptDecryptService.encrypt(
          this.initializationVector,
          this.encryptionKey,
          JSON.stringify(otherArgs)
        );

        console.log('The encrypted value  is "%s"', encrypted);

        return encrypted;
      }

      const value = await resolve(source, otherArgs, context, info);
      this.initializationVector = context.encryptDecryptService.getInitializationVector(
        "the cat jumped"
      );
      this.encryptionKey = context.encryptDecryptService.getEncryptionKey(
        "the cat jumped"
      );

      console.log('The kind of operation is a "%s"', info.operation.operation);

      if ("query" === info.operation.operation) {
        console.log('The value is "%s"', value);
        const decrypted = context.encryptDecryptService.decrypt(
          this.initializationVector,
          this.encryptionKey,
          value
        );
        console.log('The decrypted value  is "%s"', decrypted);

        return value.toUpperCase();
        // return decrypted;
      }
    };
  }
}
