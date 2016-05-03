const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  IS_PROD: isProduction,
  ENV: isProduction ? 'production' : 'development',
  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',
};
