import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import { Layout } from './components/layout/layout';
import RecipeCard from './components/recipe-card/recipe-card';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecipeCard />} />
          {/* Add more page components as needed
        */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App