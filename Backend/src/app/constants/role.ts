
import {ContractRole} from "../types"

export const Role = {
  User: 'USER',
  Admin: 'ADMIN',
} as const

export type RoleType = (typeof Role)[keyof typeof Role]