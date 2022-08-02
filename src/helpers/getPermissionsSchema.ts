import { array, ZodEnum, ZodObject, ZodRawShape } from 'zod'

function getPermissionsSchema<
  U extends ZodRawShape,
  T extends ZodEnum<[string, ...string[]]>
>(schema: ZodObject<U>, permission: T) {
  const permissionsSchema = schema.extend({ permissions: array(permission) })

  return permissionsSchema
}

export default getPermissionsSchema
