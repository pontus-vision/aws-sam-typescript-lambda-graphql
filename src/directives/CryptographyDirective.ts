import { SchemaDirectiveVisitor } from "graphql-tools";
import {
  GraphQLField,
  defaultFieldResolver,
  GraphQLObjectType,
  GraphQLInterfaceType
} from "graphql";

export class CryptographyDirective extends SchemaDirectiveVisitor {
  public static fields: any = {};

  public visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType;
    }
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field;
    CryptographyDirective.fields[field.name] = true;
  }
}
