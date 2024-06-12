import express from 'express';
import bodyParser from "body-parser";
import { BASE_PATH, PORT, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config.js';
import mainRoute from './routes/index.js'
import sessionMiddleware from "./middlewares/session.middleware.js";
import loggerMiddleware from './middlewares/logger/dev-logger.middleware.js';
import cors from 'cors'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { createServer } from 'http'
import passport from 'passport'
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';
import onFinished from 'on-finished'

const app = express();

// setup CORS logic
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session middleware logic
app.use(sessionMiddleware)

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())  //allow passport to use "express-session"

// github auth
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:" + PORT + "/api/auth/github/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// google auth
passport.use(new GoogleStrategy.OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:" + PORT + "/api/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  
  done(null, user)
})

passport.deserializeUser((user, done) => {
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
  done(null, user)
})

// logger info for every request
app.use((req, res, next) => {
  onFinished(res, function () {
    if (res.statusCode >= 500 && res.statusCode <= 599) {
      // error(0)
      loggerMiddleware.error(`Received a ${req.method} request for ${req.originalUrl}`);
    } else if (res.statusCode >= 400 && res.statusCode <= 409 && res.statusCode !== 404) {
      // warn(1)
      loggerMiddleware.warn(`Received a ${req.method} request for ${req.originalUrl} - ${res.statusMessage}`);
    } else if (res.statusCode >= 200 && res.statusCode <= 299) {
      // info(2)
      loggerMiddleware.info(`Received a ${req.method} request for ${req.originalUrl}`);
    } else if ((res.statusCode >= 100 && res.statusCode <= 199) || (res.statusCode >= 300 && res.statusCode <= 399)) {
      // http(3)
      loggerMiddleware.http(`Received a ${req.method} request for ${req.originalUrl}`);
    } else if (res.statusCode === 404) {
      // verbose(4)
      loggerMiddleware.verbose(`Received a ${req.method} request for ${req.originalUrl}`);
    }
  })
  next();
});

app.use(BASE_PATH, mainRoute);
app.use(`${BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (_, res) => res.redirect(BASE_PATH))

app.get('*', function (req, res) {
  res.status(StatusCodes.NOT_FOUND).json({ success: false, message: ReasonPhrases.NOT_FOUND });
});

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app