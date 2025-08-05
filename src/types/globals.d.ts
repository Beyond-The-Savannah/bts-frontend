export {};

export type Roles = "client" | "admin";

export type UploadStatus="idle"|"uploading"|"success"|"error";
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
