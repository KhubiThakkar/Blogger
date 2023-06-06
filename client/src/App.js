import './App.css';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './userContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import PageNotFound from './pages/PageNotFound';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={'/about'} element={<Portfolio />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'/edit/:id'} element={<EditPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
