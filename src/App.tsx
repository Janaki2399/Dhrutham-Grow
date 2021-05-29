import React from "react";
import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import { QuizCategories } from "./pages/QuizCategories/QuizCategories";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/SignUp/SignUp";
import { NavBar } from "./components/NavBar";
import { Details } from "./pages/Details/Details";
import { GameArea } from "./pages/GameArea/GameArea";
import { Analysis } from "./pages/Analysis/Analysis";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/quiz/:quizId/rules" element={<Details />} />
        <PrivateRoute path="/quiz/:quizId/play" element={<GameArea />} />
        <PrivateRoute path="/quiz/:quizId/score" element={<Analysis />} />
        <Route path="/" element={<QuizCategories />} />
      </Routes>
    </div>
  );
}

export default App;
