const express = require("express");
const { builtinModules } = require("module");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/business-backend",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	},
	(err) => {
		if (err) throw err;
		console.log("MongoDB connection established");
	}
);

if (process.env.NODE_ENV == "production")
	app.use(express.static("client/build"));

// Custom Routes
app.use("/api", require("./routes/apiRoutes"));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () =>
	console.log(`Listening at PORT: http://localhost:${PORT}`)
);