const express = require("express");
const path = require("path");
const URL = require("./models/url");
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { mongoDBConnection } = require("./connection");

const app = express();
const PORT = 8001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect
mongoDBConnection("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("DB connected")
);

// SET the template engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Router
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRouter);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
