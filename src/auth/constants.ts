import 'dotenv/config';

export const jwtAccessConstants = {
  secret: process.env.JWT_ACCESS_SECRETKEY,
};

export const jwtRefreshConstants = {
  secret: process.env.JWT_REFRESH_SECRET,
};
