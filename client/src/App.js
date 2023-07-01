import './App.css';
import { ContextApi } from './component/ContextApi';
import Files from './component/Files';
import Signin from './component/Signin';
import Download from './component/Download';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContextApi>
          <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/files' element={<Files />} />
            <Route path='/Download' element={<Download/>}/>
          </Routes>
        </ContextApi>
      </BrowserRouter>
    </div>
  );
}

export default App;
