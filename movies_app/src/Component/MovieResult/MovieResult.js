import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "./MovieResult.css";

function MovieResult({ movieResult }) {
  const navigate = useNavigate();

  return (
    <div className="mov-result container">
      <h1>MOVIE RESULT</h1>
      <hr></hr>
      <div className="m-r-link">
        <span onClick={() => navigate("/")}>Home</span> &gt;&gt;{" "}
        <span>Movie Result</span>
      </div>
      {movieResult.movData.length !== 0 ? (
        <>
          {movieResult.movData.map((val) => {
            return (
              <div key={val.imdbID} className="m-r">
                <img src={val.Poster} alt="img" />
                <div className="m-r-detail">
                  <h1>{val.Title}</h1>
                  <p>
                    <span>Director:</span> {val.Director}
                  </p>
                  <p>
                    <span>Plot:</span> {val.Plot}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>No results found :(</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  movieResult: state.movieReducer,
});

export default connect(mapStateToProps, null)(MovieResult);
