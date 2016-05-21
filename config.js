const isProduction = process.env.NODE_ENV === 'production';
const env = isProduction ? 'production' : 'development';

module.exports = {
  IS_PROD: isProduction,
  ENV: env,
  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  UI: {
    'process.env.NODE_ENV': env,
  },
};
