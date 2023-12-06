import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import FlashCards from "./pages/FlashCards";
import CreateFlashCard from "./pages/CreateFlashCard";
import Login from "./pages/logRes/Login";
import Register from "./pages/logRes/Register";
import { useSelector } from "react-redux";
import FlashCard from "./pages/FlashCard";
function App() {
  const user = useSelector((state)=>state.auth.currentUser);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/flashcards"  element={<FlashCards/>}/> {/*BUTUN FLASHCARDLAR */}
          <Route path="/flashcard/:id"  element={<FlashCard/>}/> {/*TEK FLASH CARD ID ILE */}
          {user ? (
            <> 
              <Route path='/profile/:id' element={<Profile/>} />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/logout" element={<Navigate to="/" />} />
              <Route path="/createFlashcard"  element={<CreateFlashCard/>}/>
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/createFlashcard"  element={<Navigate to='/login' />}/>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
