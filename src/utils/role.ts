import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const CheckRoles = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};
