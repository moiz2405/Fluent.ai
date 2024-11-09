import { handleAuth } from '@auth0/nextjs-auth0';

export const handler = handleAuth({
  login: {
    returnTo: process.env.AUTH0_REDIRECT_URI, // Redirect URL after login
  },
  logout: {
    returnTo: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI, // Redirect URL after logout
  },
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8, // Cookie lifetime 8 hours
  },
});

export default handler;
