import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from '../commponents/Header'
import Home from './Home'
import Products from './Products'
import Categories from './Categories'
import Sellers from './Sellers'
import {PrivateRoute,PrivateRouteTab} from '../hooks/PrivateRoute'
import TabMenu from '../commponents/TabMenu'
import Orders from './Orders'
import Setting from './Setting'
function Main() {
  return (
    <Router>
        <Header/>
        <PrivateRouteTab>
            <TabMenu/>
        </PrivateRouteTab>
        <div className='mt-16 lg:mt-32 lg:px-5'>
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            
            <Route path='/products' element={
                <PrivateRoute>
                    <Products />
                </PrivateRoute>
            } />
            <Route path='/orders' element={
                <PrivateRoute>
                    <Orders />
                </PrivateRoute>
            } />
            <Route path='/categories' element={
                <PrivateRoute>
                    <Categories/>
                </PrivateRoute>
            } />
            <Route path='/sellers' element={
                <PrivateRoute>
                    <Sellers/>
                </PrivateRoute>
            } />
            <Route path='/setting' element={
                <PrivateRoute>
                    <Setting/>
                </PrivateRoute>
            } />
        </Routes>
        </div>
    </Router>
  )
}

export default Main