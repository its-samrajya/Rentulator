import { createHmac } from "crypto";

export const generateEsewaSignature = (
  secretKey: string,
  message: string,
): string => {
  return createHmac("sha256", secretKey).update(message).digest("base64"); //research later about this
};
