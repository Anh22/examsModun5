import logo from './logo.svg';
import './App.css';
import {Route, Router, Routes} from "react-router-dom";
import Home from "./component/Home";

function App() {
  return (
    <>
      <div className="container">
          <Routes>
              <Route path={'/'} element={<Home/>}>
              </Route>
          </Routes>
      </div>
    </>
  );
}

export default App;
