require( 'dotenv' ).config();
const express = require( 'express' ),
      session = require( 'express-session' ),
      passport = require( 'passport' ),
      Auth0Strategy = require( 'passport-auth0' ),
      bodyParser = require( 'body-parser' ),
      massive = require( 'massive' ),
      pc = require( './controller' )

const{
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const app = express();
app.use( bodyParser.json() );

massive( process.env.CONNECTION_STRING ).then( db => {app.set('db', db)});

app.use( session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}) );


//========== AUTH0 STUFF ==========//

app.use( passport.initialize() );
app.use( passport.session() );

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, ( accessToken, refreshToken, extraParams, profile, done ) => {
    done( null, profile );
}))

passport.serializeUser( ( profile, done ) => {
    done( null, profile );
});
passport.deserializeUser( ( profile, done ) => {
    done( null, profile );
})
app.get( '/auth', passport.authenticate( 'auth0' ) );
app.get( '/auth/callback', passport.authenticate( 'auth0', {
    successRedirect: 'http://localhost:3000/#/landing'
} ) );

//================ ENDPOINTS ===============//

app.get( '/shop', pc.getAllProducts );







app.listen( SERVER_PORT, () => console.log( `Searching for Rebel scum on port ${SERVER_PORT}`));