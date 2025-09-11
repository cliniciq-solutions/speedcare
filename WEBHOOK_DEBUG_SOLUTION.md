# Webhook Configuration Error Solution

## Problem Analysis

The webhook configuration error occurs because:

1. **Missing Environment Variables**: The Netlify function checks for `SURVEY_WEBHOOK_URL` and `ELIGIBILITY_WEBHOOK_URL` environment variables
2. **Service Unavailability**: When these variables are not set, the function returns a 503 error
3. **No Fallback Mechanism**: The original code didn't handle this gracefully

## Solution Implemented

### 1. Enhanced Error Handling
Updated both `survey.html` and `eligibility.html` with:
- Better error logging and debugging information
- Fallback webhook URLs for development/testing
- Graceful degradation when config fails to load

### 2. Development Tools Created

#### Test Configuration Page (`test-config.html`)
- Tests the `/api/config` endpoint
- Shows detailed error information
- Displays loaded configuration

#### Local Development Server (`test-server.js`)
- Serves static files locally
- Provides mock config endpoint
- Includes CORS headers for testing

#### Development Config Function (`config-dev.js`)
- Provides fallback URLs when environment variables are missing
- Useful for local development and testing

## How to Fix the Issue

### For Production (Netlify)
1. **Set Environment Variables** in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `SURVEY_WEBHOOK_URL`: `https://dermalink.xyz/webhook/survey`
   - Add `ELIGIBILITY_WEBHOOK_URL`: `https://dermalink.xyz/webhook/eligibility`

2. **Redeploy** the site to apply changes

### For Local Development
1. **Use the test server**:
   ```bash
   node test-server.js
   ```
   Then open: http://localhost:3000/test-config.html

2. **Or set environment variables**:
   ```bash
   export SURVEY_WEBHOOK_URL="https://dermalink.xyz/webhook/survey"
   export ELIGIBILITY_WEBHOOK_URL="https://dermalink.xyz/webhook/eligibility"
   python -m http.server 8000
   ```

## Testing the Fix

### Method 1: Test Configuration Page
1. Open `test-config.html` in your browser
2. Check if config loads successfully
3. Verify webhook URLs are available

### Method 2: Browser Console
1. Open survey.html or eligibility.html
2. Check browser console for:
   - "Config loaded successfully" message
   - Webhook URLs in the config object
   - No error messages

### Method 3: Direct API Test
```bash
# Test the config endpoint
curl http://localhost:3000/api/config

# Or test with Netlify (after deployment)
curl https://your-site.netlify.app/api/config
```

## Expected Behavior

### When Config Loads Successfully
```javascript
{
  surveyWebhook: "https://dermalink.xyz/webhook/survey",
  eligibilityWebhook: "https://dermalink.xyz/webhook/eligibility"
}
```

### When Config Fails (Fallback)
```javascript
{
  surveyWebhook: "https://dermalink.xyz/webhook/survey",
  eligibilityWebhook: "https://dermalink.xyz/webhook/eligibility",
  fallbackUsed: true
}
```

## Debugging Steps

1. **Check Browser Console**: Look for detailed error messages
2. **Test Config Endpoint**: Use `test-config.html` for detailed diagnostics
3. **Verify Environment Variables**: Check Netlify dashboard settings
4. **Check Function Logs**: View Netlify function logs for server-side errors
5. **Test Locally**: Use `test-server.js` for local development

## Files Modified

- `survey.html`: Enhanced `loadConfig()` function with better error handling
- `eligibility.html`: Enhanced `loadConfig()` function with better error handling
- `test-config.html`: New test page for debugging configuration issues
- `test-server.js`: Local development server with mock config endpoint
- `config-dev.js`: Development version of config function with fallbacks

## Next Steps

1. **For Production**: Set the environment variables in Netlify
2. **For Development**: Use the test server or set local environment variables
3. **For Testing**: Use the test-config.html page to verify everything works
4. **For Monitoring**: Check browser console for any remaining issues