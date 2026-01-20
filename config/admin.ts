import crypto from 'crypto';

export default ({ env }) => {
  // Generate fallback secrets if not provided (for development only)
  // In production, these MUST be set as environment variables
  const generateSecret = () => {
    return crypto.randomBytes(32).toString('base64');
  };

  const isProduction = process.env.NODE_ENV === 'production';

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET') || (isProduction ? undefined : generateSecret()),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT') || (isProduction ? undefined : generateSecret()),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT') || (isProduction ? undefined : generateSecret()),
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY') || (isProduction ? undefined : generateSecret()),
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
  };
};
