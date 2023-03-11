import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Pagination } from './layouts/Utils/Pagination';


export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          {/* 
          exact 属性指定了路由应该完全匹配路径。
          在这个例子中，exact 属性应用于根路径路由，这意味着只有在用户访问应用程序的根路径时，<HomePage> 组件才会被渲染。
        */}
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
