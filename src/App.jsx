import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SelectMode from './Pages/SelectMode';
import Quiz from './Pages/Quiz';
import Result from './Pages/Result';

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
