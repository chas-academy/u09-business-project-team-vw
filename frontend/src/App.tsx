import { Route, Routes } from 'react-router-dom';
import './App.scss'

// COMPONENTS FOLDER
import { Layout } from './components/layout/layout';
import { ProtectedRoute } from './components/middleware/protectedRoute';
// gave error when compiling import { LogoutButton } from './components/LogoutButton';

// PAGES FOLDER
import Home from './pages/home/home';
import AdminDashboard from './pages/admin/dashboard';
import AdminSettings from './pages/admin/adminSetting';
import UserDashboard from './pages/user/dashboard';
import UserSettings from './pages/user/userSetting';
import ShowUser from './pages/admin/users';
import NotAutorized from './pages/authorizing/notAutorizedPage';
import Search from './pages/search/search';
import RecipeDetail from './pages/recipe-details/recipe-details';
import CreateListForm from './components/recipeList/CreateListForm';
import SingleListView from './components/recipeList/ShowRecipeList';

function App() {
  return (
      <Routes>
        <Route path='/not-authorized' element={<NotAutorized />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
        <Route 
          path='admin-dashboard'
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='admin-settings' element={
            <ProtectedRoute requireAdmin>
              <AdminSettings />
            </ProtectedRoute>
          } 
        />
        <Route path='/show-user/:id' element={
            <ProtectedRoute requireAdmin>
              <ShowUser />
            </ProtectedRoute>
          } 
        />

          <Route path='/not-authorized' element={<NotAutorized />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />

          <Route
            path='/admin-dashboard'
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />


        <Route
          path='user-dashboard'
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path='user-settings' 
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='recipe-list/:listId'
          element={
            <ProtectedRoute>
            <SingleListView />
            </ProtectedRoute>
          }
          />
        <Route 
          path='user-create-list'
          element={
            <ProtectedRoute>
              <CreateListForm />
            </ProtectedRoute>
        }
        />
          </Route>
      </Routes>
  );
}

export default App