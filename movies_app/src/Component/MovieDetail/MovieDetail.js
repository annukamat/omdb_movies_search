import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "../MovieResult/MovieResult.css";

function MovieResult({ movieDetail }) {
  console.log(movieDetail);
  const navigate = useNavigate();

  return (
    <div className="mov-result container">
      <h1>MOVIE Detail</h1>
      <hr></hr>
      <div className="m-r-link">
        <span onClick={() => navigate("/")}>Home</span> &gt;&gt;{" "}
        <span>Movie Detail</span>
      </div>
      <>
        <div key={movieDetail.imdbID} className="m-r">
          <img src={movieDetail.Poster} alt="img" />
          <div className="m-r-detail">
            <h1>{movieDetail.Title}</h1>
            <p>
              <span>Genre:</span> {movieDetail.Genre}
            </p>
            <p>
              <span>Director:</span> {movieDetail.Director}
            </p>
            <p>
              <span>Plot:</span> {movieDetail.Plot}
            </p>

            <p>
              <span>Year:</span> {movieDetail.Year}
            </p>

            <p>
              <span>Actors:</span> {movieDetail.Actors}
            </p>
          </div>
        </div>
      </>
    </div>
  );
}

const mapStateToProps = (state) => ({
  movieDetail: state.sendMovReducer.movDetail,
});

export default connect(mapStateToProps, null)(MovieResult);
