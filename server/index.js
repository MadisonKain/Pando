require ( 'dotenv' ).config();
const express = require( 'express' ),
      session = require( 'express-session' ),
      bodyParser = require( 'body-parser' ),
      massive = require( 'massive' ),
      passport = require( 'passport' ),
      Auth0Strategy = require( 'passport-auth0' ),
      pc = require( './controller' ),
      cors = require('cors'),
      S3 = require( './S3' );

const {
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT,
    RES_REDIRECT
} = process.env;

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

app.use(cors())
app.use( bodyParser.json( { limit: '50MB' } ))

S3(app)

massive( CONNECTION_STRING ).then( db => {
   app.set( 'db', db )
})

// app.use( session({
//    secret: SESSION_SECRET,
//    resave: false,
//    saveUninitialized: true
// }))

// ===== AUTH 0 SETUP ===== //

app.use( passport.initialize() );

app.use( passport.session() );

passport.use( new Auth0Strategy({
   domain: DOMAIN,
   clientID: CLIENT_ID,
   clientSecret: CLIENT_SECRET,
   callbackURL: CALLBACK_URL,
   scope: 'openid profile'
}, function( accessToken, refreshToken, extraParams, profile, done ){
    const db = app.get( 'db' );
    db.find_user( [profile.id] ).then( userResult => {
        if( !userResult[0] ){
            db.create_user([
                profile.displayName,
                profile.picture,
                profile.id
            ]).then( createdUser => {
                return done( null, createdUser[0].id )
            })
        } else {
            return done( null, userResult[0].id )
        }
    })
}))
passport.serializeUser( (id, done) => {
    done( null, id );
})
passport.deserializeUser( (id, done) => {
    app.get( 'db' ).find_session_user( [id] ).then( loggedInUser => {
        done( null, loggedInUser[0] );
    })
})

app.get( '/auth', passport.authenticate( 'auth0' ) );
app.get( '/auth/callback', passport.authenticate( 'auth0', {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
}))
app.get( '/auth/logout', (req, res) => {
    req.logout();
    res.redirect( RES_REDIRECT );
})

app.get( '/auth/me', function( req, res ) {
   if( req.user ) {
       res.status( 200 ).send( req.user );
   } else {
       res.status( 401 ).send( 'You need to log in!' );
   }
})

// ================ ENDPOINTS =============== //

app.get( '/shop', pc.getAllProducts );
app.get( '/product/:id', pc.getSelectedItem );
app.get( '/cart', pc.getCartItems );
app.get( '/profile/:id', pc.getUserInfo );
app.get( '/cart/total', pc.getCartTotal );
app.get( '/artist/:id', pc.getArtistInfo );

app.post( '/cart/add/:id', pc.addToCart );
app.post( '/profile/newProduct', pc.postNewProduct );
app.post( '/api/payment', pc.stripe );

app.put( '/profile/edit', pc.updateProfileInfo );

app.delete( '/cart/delete/:id', pc.deleteFromCart );

app.listen( process.env.PORT || 3000 , () => console.log( `===== Searching for Rebel scum on port ${process.env.PORT} =====` ) );
