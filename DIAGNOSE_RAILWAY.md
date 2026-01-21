# 🔍 Railway Deployment Diagnosis Guide

## ⚠️ If Your App Still Shows "Application failed to respond"

Follow these steps **IN ORDER** to diagnose and fix the issue:

---

## Step 1: Check Deployment Logs (MOST IMPORTANT!)

1. Go to Railway → Your Service → **Deployments** tab
2. Click on the **most recent deployment**
3. Click **View Logs**
4. Scroll through the logs and look for:

### ✅ Good Signs (App is working):
- `🚀 Server starting on port: 8080` (or any port)
- `🗄️ Database client: postgres`
- `Server started` or `Listening on port`
- `[INFO] Server started`

### ❌ Bad Signs (App is failing):
- `Error: connect ECONNREFUSED` (Database connection failed)
- `Error: Missing required environment variable`
- `Build failed`
- `npm ERR!` (Build errors)
- Any **red error messages**

**👉 Copy the error message and share it if you need help!**

---

## Step 2: Verify Environment Variables

Go to Railway → Your Service → **Variables** tab

### ✅ MUST HAVE These Variables:

1. **NODE_ENV** = `production`
   - ✅ Check if it exists
   - ✅ Value should be exactly `production`

2. **DATABASE_URL** = `postgresql://...`
   - ✅ **CRITICAL:** This MUST exist!
   - ✅ Should start with `postgresql://`
   - ✅ If missing, see Step 3 below

3. **APP_KEYS** = `key1,key2,key3,key4`
   - ✅ Should have 4 keys separated by commas
   - ✅ If missing, run: `node generate-secrets.js`

4. **ADMIN_JWT_SECRET** = (random string)
5. **JWT_SECRET** = (random string)
6. **API_TOKEN_SALT** = (random string)
7. **TRANSFER_TOKEN_SALT** = (random string)
8. **ENCRYPTION_KEY** = (random string)

**If any are missing, add them using the values from `generate-secrets.js`**

---

## Step 3: Add PostgreSQL Database (IF DATABASE_URL is Missing)

If `DATABASE_URL` doesn't exist in Variables:

1. In Railway dashboard, click **+ New** (top right)
2. Select **Database** → **Add PostgreSQL**
3. Wait for it to provision (takes 1-2 minutes)
4. Railway will **automatically** create `DATABASE_URL` variable
5. Verify it appears in your service's **Variables** tab

**⚠️ Without DATABASE_URL, your app CANNOT start!**

---

## Step 4: Verify Code Was Pushed

The fixes I made need to be deployed:

1. Check if you've committed the changes:
   ```bash
   git status
   ```

2. If there are uncommitted changes, commit and push:
   ```bash
   git add config/database.ts config/server.ts
   git commit -m "Fix Railway deployment configuration"
   git push
   ```

3. Railway will auto-deploy when you push
4. Wait for deployment to complete (check Deployments tab)

---

## Step 5: Check Build Process

In Railway → Deployments → Latest → View Logs:

Look for build phase:
- ✅ `npm run build` should complete successfully
- ✅ Should see "Build completed" or similar
- ❌ If build fails, check for errors

---

## Step 6: Verify Port Configuration

1. In Railway → Variables, check if `PORT` exists (Railway sets this automatically)
2. In Railway → Settings → Networking:
   - Your domain should be configured
   - Port should match what Railway sets (usually 8080)
   - If port is wrong, delete domain and regenerate with correct port

---

## Step 7: Common Error Solutions

### Error: "Database connection failed"
**Solution:**
- Add PostgreSQL service in Railway
- Verify `DATABASE_URL` exists
- Check database service is running

### Error: "Missing environment variable"
**Solution:**
- Add all required variables from Step 2
- Redeploy after adding

### Error: "Build failed"
**Solution:**
- Check build logs for specific errors
- Verify Node.js version (should be 20.x)
- Check `package.json` dependencies

### Error: "Application failed to respond" (no errors in logs)
**Solution:**
- App might be crashing silently
- Check if all environment variables are set
- Verify database connection
- Check if app actually started (look for "Server started" in logs)

---

## Step 8: Force Redeploy

After making changes:

1. Go to Railway → Deployments
2. Click **Redeploy** (or push new code)
3. Wait for deployment to complete
4. Check logs again

---

## 📋 Complete Checklist

Before saying it's broken, verify:

- [ ] Checked deployment logs for errors
- [ ] All 8 environment variables are set
- [ ] PostgreSQL service is added
- [ ] `DATABASE_URL` exists in Variables
- [ ] Code changes are pushed to git
- [ ] Latest deployment completed
- [ ] Logs show "Server started" message
- [ ] No red error messages in logs
- [ ] Port in domain matches Railway's PORT variable

---

## 🆘 Still Not Working?

If you've completed all steps and it still doesn't work:

1. **Share the deployment logs** - Copy the error messages
2. **Share your Variables list** - (Hide sensitive values, just show variable names)
3. **Confirm PostgreSQL service exists** - Yes/No
4. **Confirm code was pushed** - Yes/No

With this information, I can help you fix the specific issue!

---

## 🎯 Expected Working State

When everything is working, you should see in logs:
```
🚀 Server starting on port: 8080
🌍 Host: 0.0.0.0
🔧 NODE_ENV: production
🗄️  Database client: postgres
🗄️  Database URL: postgresql://****@****:5432/****
[INFO] Server started
```

And the link `https://joketory-strapi-production.up.railway.app` should work!
