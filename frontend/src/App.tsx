import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import { Layout } from './components/layout/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        {/*
          <Route index element={<Home />} />
          {/* Add more page components as needed
        */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App