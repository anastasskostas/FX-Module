let config;

if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
  config = require(`./config.dev`).default
}



const configuration = {
    purchaseCurrencyEndpoint: "/purchase",
    
    ...config
  };
  
  export default configuration;