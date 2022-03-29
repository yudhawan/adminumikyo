import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from '../commponents/Header'
import Home from './Home'
import Products from './Products'
import Categories from './Categories'
import Sellers from './Sellers'
import PrivateRoute from '../hooks/PrivateRoute'
import TabMenu from '../commponents/TabMenu'
import Orders from './Orders'
function Main() {
  return (
    <Router>
        <Header/>
        <PrivateRoute>
            <TabMenu/>
        </PrivateRoute>
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
        </Routes>
        </div>
    </Router>
  )
}

export default Main