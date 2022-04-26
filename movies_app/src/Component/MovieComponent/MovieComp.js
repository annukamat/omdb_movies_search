import React, { useEffect, useState } from "react";
import { sendMovData } from "../../actions/sendMovAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieComp.css";


function MovieComp({ sendMovData }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/movie-list`);
      setMovies(res.data);
    };
    fetchData().catch(console.error);
  }, []);

  const handleClick = async (val) => {
    await sendMovData(val);
    console.log("navigate");
    navigate("/movie-detail");
  };

  return (
    <div className="mov-comp">
      {movies.length === 0 ? (
        <>Loading...</>
      ) : (
        <div className="row">
          {movies.map((val) => {
            return (
              <div
                key={val._id}
                className="m-c-card col-lg-4 col-md-8 col-sm-12"
                onClick={() => handleClick(val)}
              >
                <img src={val.Poster} alt="img" />
                <div className="m-c-detail">
                  <h1>{val.Title}</h1>
                  <p>
                    <span>Director:</span> {val.Director}
                  </p>
                  <p>{val.Plot}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default connect(null, { sendMovData })(MovieComp);
