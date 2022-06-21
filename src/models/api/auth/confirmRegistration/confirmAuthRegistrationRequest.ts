import { object, TypeOf } from 'zod'
import { admin } from '../../../db'

export const confirmAuthRegistrationRequest = object({
  admin_id: admin.shape.id
})

export type ConfirmAuthRegistrationRequest = TypeOf<
  typeof confirmAuthRegistrationRequest
>
