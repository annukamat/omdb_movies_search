import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import MovieList from "./Component/MovieList/MovieList";

import { Provider } from "react-redux";
import store from "./store";
import MovieResult from "./Component/MovieResult/MovieResult";
import MovieDetail from "./Component/MovieDetail/MovieDetail";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<MovieList />} />
          <Route path="/movie-result" element={<MovieResult />} />
          <Route path="/movie-detail" element={<MovieDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
