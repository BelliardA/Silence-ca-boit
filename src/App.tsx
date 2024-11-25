import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import GamePlay from './components/GamePlay';
import Level from './components/Level';
import Tuto from './components/Tuto';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level" element={<Level />} />
        <Route path="/gameplay" element={<GamePlay />} />
        <Route path='/tuto' element={<Tuto/>}/>
      </Routes>
    </Router>
  );
};

export default App;