import crypto from "node:crypto";


const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY!;


export function verifyPaystackSignature(payLoad: string,signature: string | null,): boolean {
  if (!signature) return false;

  const secretKey = PAYSTACK_SECRET_KEY;
  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(payLoad)
    .digest("hex");
  return hash === signature;
}