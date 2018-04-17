module.exports = {
    getAllProducts: ( req, res ) => {
       req.app.get( 'db' ).getAllProducts()
       .then( products => {
           res.status( 200 ).send( products )
       }).catch( err => { console.log("GET ALL PRODUCTS ERROR", err ) } );
    },
    getSelectedItem: ( req, res ) => {
        req.app.get( 'db' ).getSelectedItem( [req.params.id] )
        .then( product => {
            res.status( 200 ).send( product )
        }).catch( err => { console.log('GET SELECTED ITEM ERROR', err ) } );
    },
    addToCart: ( req, res ) => {
        req.app.get( 'db' ).find_active_order( [req.session.passport.user] )
        .then( order => {
            if ( !order[0] ){
                req.app.get( 'db' ).create_order( [req.session.passport.user] )
                .then( ( createdOrder ) => {
                    req.app.get( 'db' ).create_cart_item( [createdOrder[0].id, req.params.id, 1] )
                }).catch( err => { console.log( 'CREATE ORDER ERROR', err ) } )
            } else {
                req.app.get( 'db' ).check_cart_for_item( [req.params.id, order[0].id] )
                .then( cartItem => {
                    if( !cartItem[0] ){
                        req.app.get( 'db' ).create_cart_item( [order[0].id, req.params.id, 1] )
                    }
                    else {
                        req.app.get( 'db' ).get_cart_quantity( [req.params.id, order[0].id] )
                        .then( quantity => {
                            var oldQuantity = quantity[0].quantity
                            var newQuantity = ++oldQuantity
                            req.app.get( 'db' ).update_quantity( [newQuantity, req.params.id, order[0].id] )
                        }).catch( err => { console.log( 'UPDATE CART QUANTITY ERROR', err) } )
                    }
                })
            } 
            res.sendStatus( 200 )
        }).catch( err => { console.log( 'ADD TO CART ERROR', err ) } )
    },
    getCartItems: ( req, res ) => {
        req.app.get( 'db' ).get_cart_items()
        .then( cartItems => {
            res.status( 200 ).json( cartItems )
        })
        .catch( err => { console.log( 'GET CART ERROR', err ) } );
    },
    deleteFromCart: ( req, res ) => {
        req.app.get( 'db' ).find_active_order( [req.session.passport.user] )
        .then( order => {
            req.app.get( 'db' ).get_cart_quantity( [req.params.id, order[0].id] )
            .then( quantity => {
                var oldQuantity = quantity[0].quantity
                var newQuantity = --oldQuantity
                if ( oldQuantity === 0 ){
                    res.app.get( 'db' ).delete_from_cart( [req.params.id, order[0].id] )
                } else {
                    res.app.get( 'db' ).update_quantity( [newQuantity, req.params.id, order[0].id] )
                }
            }).catch( err => { console.log( 'UPDATE CART QUANTITY ERROR', err ) } )
            res.sendStatus( 200 )
        }).catch( err => { console.log( 'GET CART QUANTITY ERROR', err ) } )
    },
    getUserInfo: ( req, res ) => {
        req.app.get( 'db' ).get_user_info( [req.session.passport.user] )
        .then( userInfo => {
            res.status( 200 ).send( userInfo )
        }).catch( err => { console.log('GET USER INFO ERROR', err ) } );
    },
    getCartTotal: ( req, res ) => {
        res.app.get( 'db' ).find_active_order( [req.session.passport.user] )
        .then( order => {
        req.app.get( 'db' ).get_cart_and_products( [order[0].id] )
        .then( response => {
            let newTotal = response.reduce( ( accumulator, item ) => {
               return accumulator + (item.quantity * item.price)
            }, 0 )
            req.app.get( 'db' ).update_order_total( [newTotal, order[0].id] )
            .then( total => {
                res.status( 200 ).send( total[0] )
            })
        })
        }) 
    },
    postNewProduct: ( req, res ) => {
        db = req.app.get( 'db' )
    } 
}