let config;

if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
  config = require(`./config.dev`).default
}



const configuration = {
    START_SESSION: "You have 30 minutes for the current session.",
    WARNING_SESSION: "Warning",
    WARNING_SESSION_BODY: "<div>Your session is about to expire.</div><div>Your process will be lost in 2 minutes.</div>",
    EXPIRED_SESSION: "Session Timeout",
    EXPIRED_SESSION_BODY: "Sorry. Please try again.",
    
    purchaseCurrencyEndpoint: "/purchase",
    
    ...config
  };
  
  export default configuration;