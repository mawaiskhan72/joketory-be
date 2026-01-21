import path from 'path';

export default ({ env }) => {
  // Auto-detect PostgreSQL if DATABASE_URL is provided (Railway, Heroku, etc.)
  const defaultClient = env('DATABASE_URL') ? 'postgres' : 'sqlite';
  const client = env('DATABASE_CLIENT', defaultClient);

  // Helper to ensure DATABASE_URL has SSL parameters for Railway
  const getDatabaseUrl = () => {
    const dbUrl = env('DATABASE_URL');
    if (!dbUrl) return null;
    
    // If DATABASE_URL already has query parameters, append sslmode, otherwise add it
    if (dbUrl.includes('?')) {
      // Check if sslmode is already present
      if (!dbUrl.includes('sslmode=')) {
        return `${dbUrl}&sslmode=require`;
      }
      return dbUrl;
    } else {
      return `${dbUrl}?sslmode=require`;
    }
  };

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: (() => {
        const dbUrl = getDatabaseUrl();
        
        if (dbUrl) {
          // Use connectionString for Railway/cloud providers
          console.log('📦 Using DATABASE_URL for PostgreSQL connection');
          return {
            connectionString: dbUrl,
            // SSL is handled via connectionString parameters (sslmode=require)
          };
        } else {
          // Use individual connection parameters for local development
          console.log('📦 Using individual connection parameters for PostgreSQL');
          return {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            ssl: env.bool('DATABASE_SSL', false) && {
              key: env('DATABASE_SSL_KEY', undefined),
              cert: env('DATABASE_SSL_CERT', undefined),
              ca: env('DATABASE_SSL_CA', undefined),
              capath: env('DATABASE_SSL_CAPATH', undefined),
              cipher: env('DATABASE_SSL_CIPHER', undefined),
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
            },
            schema: env('DATABASE_SCHEMA', 'public'),
          };
        }
      })(),
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  // Log database configuration
  console.log(`🗄️  Database client: ${client}`);
  if (client === 'postgres' && env('DATABASE_URL')) {
    const dbUrl = env('DATABASE_URL');
    // Log a masked version of the URL (hide password)
    const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@');
    console.log(`🗄️  Database URL: ${maskedUrl}`);
  }

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
