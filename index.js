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

    const country = countries.find(c => c.code === data.country_code);
    const countryName = country ? country.name : "Unknown Location";

    res.render("index.ejs", {
      lat_id: data.latitude,
      lon_id: data.longitude,
      zone_id: data.timezone_id,
      country_code: countryName,
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


const countries = [
  { "code": "AF", "name": "Afghanistan" },
  { "code": "AL", "name": "Albania" },
  { "code": "DZ", "name": "Algeria" },
  { "code": "AD", "name": "Andorra" },
  { "code": "AO", "name": "Angola" },
  { "code": "AG", "name": "Antigua and Barbuda" },
  { "code": "AR", "name": "Argentina" },
  { "code": "AM", "name": "Armenia" },
  { "code": "AU", "name": "Australia" },
  { "code": "AT", "name": "Austria" },
  { "code": "AZ", "name": "Azerbaijan" },
  { "code": "BS", "name": "Bahamas" },
  { "code": "BH", "name": "Bahrain" },
  { "code": "BD", "name": "Bangladesh" },
  { "code": "BB", "name": "Barbados" },
  { "code": "BY", "name": "Belarus" },
  { "code": "BE", "name": "Belgium" },
  { "code": "BZ", "name": "Belize" },
  { "code": "BJ", "name": "Benin" },
  { "code": "BT", "name": "Bhutan" },
  { "code": "BO", "name": "Bolivia" },
  { "code": "BA", "name": "Bosnia and Herzegovina" },
  { "code": "BW", "name": "Botswana" },
  { "code": "BR", "name": "Brazil" },
  { "code": "BN", "name": "Brunei" },
  { "code": "BG", "name": "Bulgaria" },
  { "code": "BF", "name": "Burkina Faso" },
  { "code": "BI", "name": "Burundi" },
  { "code": "KH", "name": "Cambodia" },
  { "code": "CM", "name": "Cameroon" },
  { "code": "CA", "name": "Canada" },
  { "code": "CV", "name": "Cape Verde" },
  { "code": "CF", "name": "Central African Republic" },
  { "code": "TD", "name": "Chad" },
  { "code": "CL", "name": "Chile" },
  { "code": "CN", "name": "China" },
  { "code": "CO", "name": "Colombia" },
  { "code": "KM", "name": "Comoros" },
  { "code": "CG", "name": "Congo" },
  { "code": "CR", "name": "Costa Rica" },
  { "code": "HR", "name": "Croatia" },
  { "code": "CU", "name": "Cuba" },
  { "code": "CY", "name": "Cyprus" },
  { "code": "CZ", "name": "Czechia" },
  { "code": "CD", "name": "Democratic Republic of the Congo" },
  { "code": "DK", "name": "Denmark" },
  { "code": "DJ", "name": "Djibouti" },
  { "code": "DO", "name": "Dominican Republic" },
  { "code": "EC", "name": "Ecuador" },
  { "code": "EG", "name": "Egypt" },
  { "code": "SV", "name": "El Salvador" },
  { "code": "GQ", "name": "Equatorial Guinea" },
  { "code": "ER", "name": "Eritrea" },
  { "code": "EE", "name": "Estonia" },
  { "code": "ET", "name": "Ethiopia" },
  { "code": "FJ", "name": "Fiji" },
  { "code": "FI", "name": "Finland" },
  { "code": "FR", "name": "France" },
  { "code": "GA", "name": "Gabon" },
  { "code": "GM", "name": "Gambia" },
  { "code": "GE", "name": "Georgia" },
  { "code": "DE", "name": "Germany" },
  { "code": "GH", "name": "Ghana" },
  { "code": "GR", "name": "Greece" },
  { "code": "GT", "name": "Guatemala" },
  { "code": "GN", "name": "Guinea" },
  { "code": "HT", "name": "Haiti" },
  { "code": "HN", "name": "Honduras" },
  { "code": "HU", "name": "Hungary" },
  { "code": "IS", "name": "Iceland" },
  { "code": "IN", "name": "India" },
  { "code": "ID", "name": "Indonesia" },
  { "code": "IR", "name": "Iran" },
  { "code": "IQ", "name": "Iraq" },
  { "code": "IE", "name": "Ireland" },
  { "code": "IL", "name": "Israel" },
  { "code": "IT", "name": "Italy" },
  { "code": "JM", "name": "Jamaica" },
  { "code": "JP", "name": "Japan" },
  { "code": "JO", "name": "Jordan" },
  { "code": "KZ", "name": "Kazakhstan" },
  { "code": "KE", "name": "Kenya" },
  { "code": "KR", "name": "South Korea" },
  { "code": "KW", "name": "Kuwait" },
  { "code": "LV", "name": "Latvia" },
  { "code": "LB", "name": "Lebanon" },
  { "code": "LY", "name": "Libya" },
  { "code": "LT", "name": "Lithuania" },
  { "code": "LU", "name": "Luxembourg" },
  { "code": "MG", "name": "Madagascar" },
  { "code": "MY", "name": "Malaysia" },
  { "code": "MX", "name": "Mexico" },
  { "code": "MA", "name": "Morocco" },
  { "code": "NP", "name": "Nepal" },
  { "code": "NL", "name": "Netherlands" },
  { "code": "NZ", "name": "New Zealand" },
  { "code": "NG", "name": "Nigeria" },
  { "code": "NO", "name": "Norway" },
  { "code": "PK", "name": "Pakistan" },
  { "code": "PH", "name": "Philippines" },
  { "code": "PL", "name": "Poland" },
  { "code": "PT", "name": "Portugal" },
  { "code": "RU", "name": "Russia" },
  { "code": "SA", "name": "Saudi Arabia" },
  { "code": "SG", "name": "Singapore" },
  { "code": "ZA", "name": "South Africa" },
  { "code": "ES", "name": "Spain" },
  { "code": "SE", "name": "Sweden" },
  { "code": "CH", "name": "Switzerland" },
  { "code": "TH", "name": "Thailand" },
  { "code": "TR", "name": "Turkey" },
  { "code": "UA", "name": "Ukraine" },
  { "code": "AE", "name": "United Arab Emirates" },
  { "code": "GB", "name": "United Kingdom" },
  { "code": "US", "name": "United States" },
  { "code": "VN", "name": "Vietnam" },
  { "code": "??", "name": "Somewhere over the ocean" }
]