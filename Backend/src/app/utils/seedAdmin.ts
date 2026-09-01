// seedAdmin.ts
import "dotenv/config"

import {  prisma } from "@/prisma/db";

import {ContractRole} from "../types"
import { Role } from '../constants/role'

export const seedAdmin = async () => {
  const payload ={
    email: process.env.ADMIN_EMAIL || 'admin@jobpilot.com',
    username: process.env.ADMIN_USERNAME || 'admin',
    name: process.env.ADMIN_NAME || 'Super Admin',
    role: (process.env.ADMIN_ROLE || Role.Admin) as ContractRole,
  }

  const existingAdmin = await prisma.User.where({email: payload.email}).first()

  if (existingAdmin) {
    console.log('Admin already exists, skipping seed.')
    return
  }

  const admin = await prisma.User.create(payload)

  console.log('Admin user created:', admin)
}