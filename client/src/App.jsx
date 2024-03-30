import Authentication from './components/Authentication/Authentication';

import './App.css';
import './styles/colors.css'
import './styles/utilities.css'
import './styles/queries.css'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Authentication></Authentication>
    </BrowserRouter>
  );
}

export default App;
