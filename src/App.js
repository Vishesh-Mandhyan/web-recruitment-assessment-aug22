import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import { Routes, Route } from "react-router-dom";
import Trivia from "./components/Trivia";
import QuestionType from "./components/QuestionType";
import { DataProvider } from './context/questionTypeContext';
function App() {
  return (
    <div className="app">
      <Header />
      <main>
      <DataProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/questiontype" element={<QuestionType />} />
          <Route path="/trivia" element={<Trivia />} />
        </Routes>
        </DataProvider>
      </main>
      <div className="grow" />
      <Footer />
    </div>
  );
}

export default App;
