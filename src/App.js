import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import { Routes, Route } from "react-router-dom";
import Trivia from "./components/Trivia";
import QuestionType from "./components/QuestionType";
import { DataProvider } from './context/dataContext';
import ReviewScore from "./components/ReviewScore";
import { ThemeProvider } from "@mui/system";
import theme from "./context/themeContext";
function App() {
  return (
    <div className="app">
      <Header />
      <main>
      <DataProvider>
        <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/questiontype" element={<QuestionType />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/reviewscore" element={<ReviewScore />} />
        </Routes>
        </ThemeProvider>
        </DataProvider>
      </main>
      <div className="grow" />
      <Footer />
    </div>
  );
}

export default App;
