require ( 'dotenv' ).config();
const express = require( 'express' );
const session = require( 'express-session' );
const bodyParser = require( 'body-parser' );
const massive = require( 'massive' );
const passport = require( 'passport' );
const Auth0Strategy = require( 'passport-auth0' );
const pc = require( './controller' )

const {
   SERVER_PORT,
   CONNECTION_STRING,
   SESSION_SECRET,
   DOMAIN,
   CLIENT_ID,
   CLIENT_SECRET,
   CALLBACK_URL,
   DEV_MODE
} = process.env;

const app = express();

app.use( bodyParser.json() );

// app.use( ( req, res, next ) => {
//     if( DEV_MODE ){
//         req.user = {
//             id: 10,
//             name: "Madison Kain",
//             profile_pic: "https://lh6.googleusercontent.com/-aGfh3X45fWY/AAAAAAAAAAI/AAAAAAAAAKw/Ii_3qw-DxBk/photo.jpg"
//         }
//     }
//     next();
// })

massive( CONNECTION_STRING ).then( db => {
   app.set( 'db', db )
})

app.use( session({
   secret: SESSION_SECRET,
   resave: false,
   saveUninitialized: true
}))

app.use( passport.initialize() );

app.use( passport.session() );

passport.use( new Auth0Strategy({
   domain: DOMAIN,
   clientID: CLIENT_ID,
   clientSecret: CLIENT_SECRET,
   callbackURL: CALLBACK_URL,
   scope: 'openid profile'
}, function( accessToken, refreshToken, extraParams, profile, done ) {
   const db = app.get( 'db' );
   db.find_user( [profile.id] ).then( userResult => {
       if( !userResult[0] ) {
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

passport.serializeUser( ( id, done ) => {
    // console.log( id )
   done( null, id );
})

passport.deserializeUser( ( id, done ) => {
    // console.log( id )
   app.get( 'db' ).find_session_user( [id] ).then( loggedInUser => {
    //    console.log( loggedInUser[0] )
       done( null, loggedInUser[0] );
   })
})

app.get( '/auth', passport.authenticate( 'auth0' ) )

app.get( '/auth/callback', passport.authenticate( 'auth0', {
   successRedirect: 'http://localhost:3000/#/shop',
   failureRedirect: 'http://localhost:3000'
}))

app.get( '/auth/me', function( req, res ) {
   if( req.user ) {
       res.status( 200 ).send( req.user );
   } else {
       res.status( 401 ).send( 'You need to log in!' );
   }
})

app.get( '/auth/logout', ( req, res )=> {
    req.logOut();
    res.redirect( 'http://localhost:3000/' );
} )

// ================ ENDPOINTS =============== //

app.get( '/shop', pc.getAllProducts );

app.get( '/product/:id', pc.getSelectedItem );

app.get( '/cart', pc.getCartItems );

app.get( '/profile/:id', pc.getUserInfo );

app.post( '/cart/add/:id', pc.addToCart );

app.delete( '/cart/delete/:id', pc.deleteFromCart );

app.listen( SERVER_PORT, () => console.log( `Searching for Rebel scum on port ${SERVER_PORT}`));