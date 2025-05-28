import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'

// COMPONENTS FOLDER
import { Layout } from './components/layout/layout';
import { ProtectedRoute } from './components/middleware/protectedRoute';
// gave error when compiling import { LogoutButton } from './components/LogoutButton';

// PAGES FOLDER
import Home from './pages/home/home';
import { AuthRedirect } from './pages/authorizing/authRedirect';
import AdminDashboard from './pages/admin/dashboard';
import AdminSettings from './pages/admin/adminSetting';
import UserDashBoard from './pages/user/userSetting';
import UserSettings from './pages/user/userSetting';
import NotAutorized from './pages/authorizing/notAutorizedPage';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/auth-redirect' element={<AuthRedirect />} />
          <Route path='/not-authorized' element={<NotAutorized />} />

        <Route
          path='/admin-dashboard'
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route index element={<AdminDashboard />}/>
          <Route path='admin-settings' element={<AdminSettings />} />
        <Route
          path='/user-dashboard'
          element={
            <ProtectedRoute>
              <UserDashBoard />
            </ProtectedRoute>
          }/>
            <Route index element={<UserDashBoard />} />
            <Route path='user-settings' element={<UserSettings />} />
        </Route>
      </Routes>
  );
}

export default App