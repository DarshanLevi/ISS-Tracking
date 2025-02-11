import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const location = await axios.get("https://api.wheretheiss.at/v1/satellites/25544")
    const {latitude, longitude} = location.data

    const result = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`);
    if(result.data.country_code === "??"){
    res.render("index.ejs", {
      lat_id: result.data.latitude,
      lon_id:result.data.longitude,
      zone_id: result.data.timezone_id,
      country_code: "Somewhere in the Ocean",
    });
  } else {
      res.render("index.ejs", {
        lat_id: result.data.latitude,
        lon_id:result.data.longitude,
        zone_id: result.data.timezone_id,
        country_code: result.data.country_code,
      });
  }
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
