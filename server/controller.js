module.exports = {
    getAllProducts: ( req, res ) => {
       req.app.get( 'db' ).getAllProducts()
       .then( products => {
           res.status( 200 ).send( products )
       })
    },
    getSelectedItem: ( req, res ) => {
        req.app.get( 'db' ).getSelectedItem( [req.params.id] )
        .then( product => {
            res.status( 200 ).send( product )
        })
    },
    addToCart: ( req, res ) => {
        console.log( req.session )
        // req.app.get( 'db' ).find_active_order( [req.session.passport] )
        // .then( id => {
        //     console.log( 'id', id )
        // })
    }
}