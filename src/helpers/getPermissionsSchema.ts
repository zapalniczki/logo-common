import { array, object, ZodEnum } from 'zod'

function getPermissionsSchema<T extends ZodEnum<[string, ...string[]]>>(
  permission: T
) {
  const permissionsSchema = object({
    permissions: array(permission)
  })

  return permissionsSchema
}

export default getPermissionsSchema
