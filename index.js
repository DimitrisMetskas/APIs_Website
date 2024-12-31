//APIs site : https://rapidapi.com/rockapis-rockapis-default/api/linkedin-data-api/playground/apiendpoint_37969cae-3842-4d47-ab13-6cdbcf928b5c
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/home", (req, res) => {
  res.render("index.ejs");
});


app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/about", async (req, res) => {

    const options = {
      method: 'POST',
      url: 'https://fresh-linkedin-profile-data.p.rapidapi.com/search-jobs',
      headers: {
        'x-rapidapi-key': 'fbafb84898mshc0f3fdda852aa8bp1b8d17jsnc249a51a2674',
        'x-rapidapi-host': 'fresh-linkedin-profile-data.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        keywords: 'python developer',
        location: "Europe",
        date_posted: 'Any time',
        sort_by: 'Most relevant',
      }
    };

  try {
    const result = await axios.request(options);
    res.render("about.ejs", {pack: result.data.data, number:result.data.total});
    console.log(result.data.data);
    // console.log(result.data.total);
  } catch (error) {
      console.log(error.response.data);
      res.status(500);
  };  
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
