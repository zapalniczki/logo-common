import { TypeOf } from 'zod'
import { admin } from '../../../db'

export const confirmAuthRegistrationResponse = admin.pick({
  name: true,
  email: true,
  id: true,
  surname: true
})

export type ConfirmAuthRegistrationResponse = TypeOf<
  typeof confirmAuthRegistrationResponse
>
