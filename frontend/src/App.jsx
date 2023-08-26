import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import home from "./components/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
