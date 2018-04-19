import React from 'react';
import { Switch, Route } from 'react-router-dom';

// ========== Components ========== //

import Shop from './Components/Shop/Shop';
import Cart from './Components/Cart/Cart';
import Landing from './Components/Landing/Landing';
import SelectedItem from './Components/SelectedItem/SelectedItem';
import Profile from './Components/Profile/Profile';
import ArtistProfile from './Components/ArtistProfile/ArtistProfile';

// ========== ========== ========== //

export default(
    <Switch>
        <Route component={ Landing } exact path='/'/>
        <Route component={ Shop } path='/shop'/>
        <Route component={ Cart } path='/cart'/>
        <Route component={ SelectedItem } path='/product/:id'/>
        <Route component={ Profile } path='/profile/:id'/>
        <Route component={ ArtistProfile } path='/artist/:id'/>
    </Switch>
)