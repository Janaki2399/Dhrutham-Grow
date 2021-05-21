import React from "react";
import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { QuizCategories } from "./pages/QuizCategories/QuizCategories";
import { NavBar } from "./components/NavBar";
import { Details } from "./pages/Details/Details";
import { GameArea } from "./pages/GameArea/GameArea";
import { Analysis } from "./pages/Analysis/Analysis";
function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/quiz/:quizId/rules" element={<Details />} />
        <Route path="/quiz/:quizId/play" element={<GameArea />} />
        <Route path="/quiz/:quizId/score" element={<Analysis />} />
        <Route path="/" element={<QuizCategories />} />

        {/* <Route path="/products/:productId" element={<ProductDetails />} /> */}
      </Routes>
    </div>
  );
}

export default App;
