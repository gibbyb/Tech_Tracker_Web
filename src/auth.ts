import NextAuth from "next-auth"
import Entra from "next-auth/providers/microsoft-entra-id"
import Authentik from "next-auth/providers/authentik"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Entra({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    }),
    Authentik({
      clientId: process.env.AUTH_AUTHENTIK_CLIENT_ID,
      clientSecret: process.env.AUTH_AUTHENTIK_CLIENT_SECRET,
      issuer: process.env.AUTH_AUTHENTIK_ISSUER,
    }),
  ],
})
