import './App.scss'
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import ApiTest from './services/testapi'

function App() {
  return (
  <div className="App">
    <Header />
    <ApiTest />
    <Footer />
  </div>
  );
}

export default App