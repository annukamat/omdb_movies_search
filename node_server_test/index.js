require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;
const axios = require("axios");
const routes = require("./routes/routes");

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

const PORT = 8080;
const app = express();
app.use(express.json()); // ? allows us to accept the data in JSON format.
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Running this application on the Port ${PORT}`);
});

// ================================================== movie api call ===============================================

app.get("/", (req, res) => {
  res.send("OMDB Movie Search!!!");
});

let apiKey = "a0bdc2fc";
let resArr = [];
const testCollectionSchema = new Schema({}, { strict: false });
const TestCollection = mongoose.model("movie_collection", testCollectionSchema);
app.get("/movie", async (req, res) => {
  axios
    .get(` http://www.omdbapi.com/?apikey=${apiKey}&s=space&y=2001&limit=100`)
    .then(async (result) => {
      const requests = result.data.Search.map((e) => {
        let imdbId = e.imdbID;
        return axios
          .get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`)
          .then((res) => {
            resArr.push(res.data);
          });
      });

      Promise.all(requests).then(() => {
        console.log(resArr);
        TestCollection.insertMany(resArr);
      });
      // await TestCollection.insertMany(result.data.Search);
      // const testCollectionData = new TestCollection(result.data);
      // await testCollectionData.save();
      return res.send({
        msg: "Data Saved Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/movie-list", async (req, res) => {
  try {
    const movieList = await TestCollection.find({});
    return res.json(movieList);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/search/:key", async (req, res) => {
  let regex = new RegExp(req.params.key, "i");
  let data = await TestCollection.find({
    $or: [
      {
        Title: regex,
      },
      {
        Director: regex,
      },
      {
        Plot: regex,
      },
    ],
  });
  res.send(data);
});
