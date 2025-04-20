import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SelectMode from './pages/SelectMode';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/Select" element={<SelectMode />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App
