
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage'
import { PaymentPage } from './layouts/PaymentPage/PaymentPage';

/* 
    React default port is http://localhost:3000 
    
    打开项目文件夹中的package.json文件。

    找到"scripts"部分。

    在"start"命令中添加一个"PORT"环境变量并将其设置为所需的端口号。例如，要将端口更改为4000，请将"start"命令更改为以下内容：

    "start": "PORT=4000 react-scripts start"

*/

const oktaAuth = new OktaAuth(oktaConfig);


/*

    在Web开发中，"endpoint"通常是指Web应用程序中处理HTTP请求的URL路径。当客户端（例如Web浏览器或移动应用程序）发送HTTP请求时，它会将请求发送到特定的URL。该URL表示一个"endpoint"，它可以被服务器端代码处理。

    在后端开发中，"endpoint"通常与特定的API功能或服务相关联。例如，一个包含用户身份验证功能的Web应用程序可能有一个名为/auth的"endpoint"，它可以接收用户凭证并返回一个包含访问令牌的响应。

    在总体设计中，"endpoint"被用于将Web应用程序分解成更小的可管理部分，并将请求路由到适当的代码路径以提供所需的响应。

*/

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  // check the access token
  console.log(oktaAuth.authStateManager);


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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

            <Route path='/reviewlist/:bookId'>
              <ReviewListPage />
            </Route>

            {/* 在 React Router 中，:符号用于定义参数化路由参数，该参数可以在 URL 中具有不同的值。 */}
            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>
            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
            {/* 
            The SecureRoute component comes from the @okta/okta-react package. 
            It is a wrapper around the React Router's Route component that adds an authentication check. 
            The component ensures that the user is authenticated before rendering the specified route. 
            */}
            <SecureRoute path='/shelf'> <ShelfPage /> </SecureRoute>
            <SecureRoute path='/messages'> <MessagesPage /> </SecureRoute>
            <SecureRoute path='/admin'> <ManageLibraryPage /> </SecureRoute>
            <SecureRoute path='/fees'> <PaymentPage /> </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}


