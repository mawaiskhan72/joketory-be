// Helper script to generate all required secrets for Railway deployment
// Run with: node generate-secrets.js

const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(32).toString('base64');
}

function generateAppKeys() {
  return Array.from({ length: 4 }, () => generateSecret()).join(',');
}

console.log('\n🔐 Generated Secrets for Railway Environment Variables:\n');
console.log('='.repeat(60));
console.log('\nCopy and paste these into Railway → Variables tab:\n');

console.log(`NODE_ENV=production`);
console.log(`\nAPP_KEYS=${generateAppKeys()}`);
console.log(`\nADMIN_JWT_SECRET=${generateSecret()}`);
console.log(`\nJWT_SECRET=${generateSecret()}`);
console.log(`\nAPI_TOKEN_SALT=${generateSecret()}`);
console.log(`\nTRANSFER_TOKEN_SALT=${generateSecret()}`);
console.log(`\nENCRYPTION_KEY=${generateSecret()}`);

console.log('\n' + '='.repeat(60));
console.log('\n📝 Important Notes:');
console.log('1. DATABASE_URL - Add a PostgreSQL service in Railway, it will create this automatically');
console.log('2. PORT - Railway sets this automatically (you have 8080 configured ✅)');
console.log('3. After adding variables, Railway will auto-redeploy');
console.log('4. Check Deployments → Logs to see if the app starts successfully');
console.log('\n');
