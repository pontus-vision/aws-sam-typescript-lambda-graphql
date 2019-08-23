import { SchemaDirectiveVisitor } from "graphql-tools";
import {
  GraphQLField,
  defaultFieldResolver,
  GraphQLObjectType,
  GraphQLInterfaceType
} from "graphql";

export class EncryptDirective extends SchemaDirectiveVisitor {
  public static fields: any = {};

  private initializationVector: Buffer;

  private encryptionKey: Buffer;

  public visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType;
    }
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field;

    EncryptDirective.fields[field.name] = true;

    field.resolve = async (source, otherArgs, context, info) => {
      console.log(`The beginning info ${JSON.stringify(otherArgs)}`);
      console.log(`Field is ${JSON.stringify(field)}`);

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

        return decrypted;
      }
    };
  }
}
