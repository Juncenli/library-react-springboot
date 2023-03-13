import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Pagination } from './layouts/Utils/Pagination';

/*

    在Web开发中，"endpoint"通常是指Web应用程序中处理HTTP请求的URL路径。当客户端（例如Web浏览器或移动应用程序）发送HTTP请求时，它会将请求发送到特定的URL。该URL表示一个"endpoint"，它可以被服务器端代码处理。

    在后端开发中，"endpoint"通常与特定的API功能或服务相关联。例如，一个包含用户身份验证功能的Web应用程序可能有一个名为/auth的"endpoint"，它可以接收用户凭证并返回一个包含访问令牌的响应。

    在总体设计中，"endpoint"被用于将Web应用程序分解成更小的可管理部分，并将请求路由到适当的代码路径以提供所需的响应。

*/

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
          {/* 在 React Router 中，:符号用于定义参数化路由参数，该参数可以在 URL 中具有不同的值。 */}
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
