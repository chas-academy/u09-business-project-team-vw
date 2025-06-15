import { Route, Routes } from 'react-router-dom';
import './App.scss'

// COMPONENTS FOLDER
import { Layout } from './components/layout/layout';
import { ProtectedRoute } from './components/middleware/protectedRoute';
import CreateListForm from './components/recipeList/CreateListForm/CreateListForm';
import SingleListView from './components/recipeList/ShowRecipeList/ShowRecipeList';

// PAGES FOLDER
import Home from './pages/home/home';
import AdminDashboard from './pages/admin/dashboard/dashboard';
import UserSettings from './pages/user/userSetting/userSetting';
import ShowUser from './pages/admin/users';
import NotAutorized from './pages/authorizing/notAutorizedPage';
import Search from './pages/search/search';
import RecipeDetail from './pages/recipe-details/recipe-details';


function App() {
  return (
    <Routes>


      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path='not-authorized' element={<NotAutorized />} />

        <Route
          path='admin-dashboard'
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
    
        <Route path='show-user/:id' element={
          <ProtectedRoute requireAdmin>
            <ShowUser />
          </ProtectedRoute>
        }
        />

        <Route path="search" element={<Search />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />


        <Route
          path='user-page'
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