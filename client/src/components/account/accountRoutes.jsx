import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Ongoing from './components/ongoing.jsx';
import Cancelled from './components/cancelled';
import Successful from './components/successful';
import Settings from './components/settings';
import Dashboard from './components/dashboard/dashboard';
import MyPosts from './components/myPosts';
import Profile from './index'
import RequestTab from './components/requests.jsx';
import RequestBody from './components/requestTab/RequestBody.jsx';

const accountRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<Profile/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='myPosts' element={<MyPosts/>}/>
        <Route path='requests' element={<Settings/>}>
        <Route index element={<RequestTab />} />
        <Route path=':id'element={<RequestBody/>}/>
        </Route>
        <Route path='ongoing'element={<Settings/>}>
          <Route index element={<Ongoing/>} />
          <Route path=':id'element={<RequestBody/>}/>
        </Route>
        <Route path='cancelled'element={<Settings/>}>
          <Route index element={<Cancelled/>} />
          <Route path=':id'element={<RequestBody/>}/>
        </Route>
        <Route path='successful' element= {<Settings/>}>
          <Route index element={<Successful/>} />
          <Route path=':id'element={<RequestBody/>}/>
        </Route>
        <Route path='settings' element={<Settings/>}/>
        
    </Route> </Routes>
  )
}

export default accountRoutes