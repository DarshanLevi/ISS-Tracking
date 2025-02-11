import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
      const { data: { latitude, longitude } } = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
      const { data } = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`);
  
      res.render("index.ejs", {
        lat_id: data.latitude,
        lon_id: data.longitude,
        zone_id: data.timezone_id,
        country_code: data.country_code === "??" ? "Somewhere in the Ocean" : data.country_code,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).send("Error fetching ISS data");
    }
  });
  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
