import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FirstPage from "./firstPage/FirstPage";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";
import UserPage from "./userPage/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userpage" element={< UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
