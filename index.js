import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config(); 

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {

    const { data: { latitude, longitude } } = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    const { data } = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`);

    res.render("index.ejs", {
      lat_id: data.latitude,
      lon_id: data.longitude,
      zone_id: data.timezone_id,
      country_code: data.country_code === "??" ? "Somewhere over the ocean" : data.country_code,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error fetching ISS data");
  }
});
  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
