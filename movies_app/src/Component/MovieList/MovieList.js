import React, { useState } from "react";
import { fetchMovieList } from "../../actions/movieResAction";
import { Navigate } from "react-router-dom";

import "./MovieList.css";
import MovieComp from "../MovieComponent/MovieComp";
import { connect } from "react-redux";

function MovieList({ fetchMovieList }) {
  // const [plot, setPlot] = useState("");
  const [formData, setFormData] = useState({
    movIp: "",
    // director: "",
  });
  const { movIp, director } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [flag, setFlag] = useState(false);
  const handleSearch = async () => {
    await fetchMovieList(movIp).then(() => {
      setFlag(true);
    });
  };

  if (flag) {
    return <Navigate to="/movie-result" />;
  }

  return (
    <div className="mov-search container">
      <h1>Movie Search</h1>
      <small>Search Movies by title, Director and Plot</small>
      <hr></hr>

      <div className="m-s">
        <input
          type="text"
          placeholder="Search by Movie Title, Director or Plot"
          name="movIp"
          value={movIp}
          onChange={(e) => onChange(e)}
        />

        {/* <input
          type="text"
          placeholder="Director"
          name="director"
          value={director}
          onChange={(e) => onChange(e)}
        />

        <select onChange={(e) => setPlot(e.target.value)}>
          <option className="hide" value="">
            Plot
          </option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select> */}

        <button onClick={handleSearch}>Search</button>
      </div>
      <MovieComp />
    </div>
  );
}

export default connect(null, { fetchMovieList })(MovieList);
