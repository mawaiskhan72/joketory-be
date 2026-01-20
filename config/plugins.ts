import crypto from 'crypto';

export default ({ env }) => {
  // Generate fallback secret if not provided
  const generateSecret = () => {
    return crypto.randomBytes(16).toString('base64');
  };

  const isProduction = process.env.NODE_ENV === 'production';

  // Get or generate jwtSecret with warning in production
  const getJwtSecret = () => {
    const value = env('JWT_SECRET');
    if (!value) {
      if (isProduction) {
        console.warn('⚠️  WARNING: JWT_SECRET is not set! Generating a temporary secret for users-permissions plugin.');
        console.warn('⚠️  This is NOT secure for production! Please set JWT_SECRET in your Railway environment variables.');
      }
      return generateSecret();
    }
    return value;
  };

  return {
    rest: {
      defaultLimit: 25,
      maxLimit: 100,
      withCount: true,
    },
    graphql: {
      enabled: true,
      config: {
        defaultLimit: 10,
        maxLimit: 20,
      },
    },
    'users-permissions': {
      config: {
        jwtSecret: getJwtSecret(),
      },
    },
  };
};
