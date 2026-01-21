# Railway Deployment Checklist

## ✅ Required Environment Variables

Add these in Railway → Your Service → **Variables** tab:

### 1. **NODE_ENV**
```
NODE_ENV=production
```

### 2. **DATABASE_URL** (Required!)
```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```
**Note:** If you added a PostgreSQL service in Railway, this should be automatically created. Check if it exists!

### 3. **APP_KEYS** (4 comma-separated keys)
```
APP_KEYS=key1,key2,key3,key4
```
Generate with: `node -e "console.log(Array.from({length:4},()=>require('crypto').randomBytes(32).toString('base64')).join(','))"`

### 4. **ADMIN_JWT_SECRET**
```
ADMIN_JWT_SECRET=your_random_string_here
```
Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### 5. **JWT_SECRET**
```
JWT_SECRET=your_random_string_here
```

### 6. **API_TOKEN_SALT**
```
API_TOKEN_SALT=your_random_string_here
```

### 7. **TRANSFER_TOKEN_SALT**
```
TRANSFER_TOKEN_SALT=your_random_string_here
```

### 8. **ENCRYPTION_KEY**
```
ENCRYPTION_KEY=your_random_string_here
```

---

## 🔍 Common Errors & Solutions

### Error: "Application failed to respond"
**Causes:**
- App not starting (check logs)
- Missing DATABASE_URL
- Port mismatch (should be 8080, which you have correct)
- Build failure

**Solution:**
1. Check deployment logs for errors
2. Verify DATABASE_URL is set
3. Ensure all environment variables are added
4. Redeploy after adding variables

### Error: Database connection failed
**Solution:**
- Add PostgreSQL service in Railway
- Verify DATABASE_URL is set correctly
- Check if database service is running

### Error: Missing environment variables
**Solution:**
- Add all required variables listed above
- Redeploy the service

---

## 📋 Quick Checklist

- [ ] PostgreSQL service added to Railway project
- [ ] DATABASE_URL variable exists (auto-created by Railway)
- [ ] NODE_ENV=production set
- [ ] APP_KEYS set (4 keys, comma-separated)
- [ ] ADMIN_JWT_SECRET set
- [ ] JWT_SECRET set
- [ ] API_TOKEN_SALT set
- [ ] TRANSFER_TOKEN_SALT set
- [ ] ENCRYPTION_KEY set
- [ ] Service domain generated with port 8080 ✅ (You have this!)
- [ ] Checked deployment logs for errors
- [ ] App shows "Server started" in logs

---

## 🚀 Next Steps

1. **Check the deployment logs** - This will tell you exactly what's wrong
2. **Verify DATABASE_URL exists** - Most common issue
3. **Add missing environment variables**
4. **Redeploy** after making changes
5. **Test the domain** again
