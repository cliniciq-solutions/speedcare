exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  // Return configuration with environment variables
  // This keeps sensitive URLs out of client-side code
  
  const surveyUrl = process.env.SURVEY_WEBHOOK_URL;
  const eligibilityUrl = process.env.ELIGIBILITY_WEBHOOK_URL;
  
  // Debug logging (will appear in Netlify function logs)
  console.log('Environment check:', {
    hasSurveyUrl: !!surveyUrl,
    hasEligibilityUrl: !!eligibilityUrl,
    surveyUrlLength: surveyUrl ? surveyUrl.length : 0,
    eligibilityUrlLength: eligibilityUrl ? eligibilityUrl.length : 0
  });
  
  // Check if required environment variables are set
  if (!surveyUrl || !eligibilityUrl) {
    console.error('Missing environment variables:', {
      SURVEY_WEBHOOK_URL: !!surveyUrl,
      ELIGIBILITY_WEBHOOK_URL: !!eligibilityUrl
    });
    
    return {
      statusCode: 503,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({
        error: 'Service temporarily unavailable. Webhook URLs not configured.',
        debug: {
          hasSurveyUrl: !!surveyUrl,
          hasEligibilityUrl: !!eligibilityUrl
        }
      })
    };
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    },
    body: JSON.stringify({
      surveyWebhook: surveyUrl,
      eligibilityWebhook: eligibilityUrl
    })
  };
};