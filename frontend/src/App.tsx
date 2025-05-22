import './App.scss'
import { Footer } from './components/footer/footer';
import ApiTest from './services/testapi'

function App() {
  return (
  <div className="App">
    <ApiTest />
    <Footer />
  </div>
  );
}

export default App
