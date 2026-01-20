import crypto from 'crypto';

export default ({ env }) => {
  // Generate fallback secrets if not provided
  const generateSecret = () => {
    return crypto.randomBytes(32).toString('base64');
  };

  const isProduction = process.env.NODE_ENV === 'production';

  // Get or generate secrets with warnings in production
  const getSecret = (envVar: string, name: string) => {
    const value = env(envVar);
    if (!value) {
      if (isProduction) {
        console.warn(`⚠️  WARNING: ${envVar} is not set! Generating a temporary secret for ${name}.`);
        console.warn(`⚠️  This is NOT secure for production! Please set ${envVar} in your Railway environment variables.`);
      }
      return generateSecret();
    }
    return value;
  };

  return {
    auth: {
      secret: getSecret('ADMIN_JWT_SECRET', 'admin authentication'),
    },
    apiToken: {
      salt: getSecret('API_TOKEN_SALT', 'API token'),
    },
    transfer: {
      token: {
        salt: getSecret('TRANSFER_TOKEN_SALT', 'transfer token'),
      },
    },
    secrets: {
      encryptionKey: getSecret('ENCRYPTION_KEY', 'encryption'),
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
  };
};
