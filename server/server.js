require("dotenv").config({ path: "./.env", override: true });
const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
	console.log("Uncaught Exception! 💥 Shutting Down....");
	console.error(`${err.name}: ${err.message}`);

	process.exit(1);
});

console.log(process.env.NODE_ENV);

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/BSM").then(() => {
	console.log("MongoDB connected successfully!");
});

// START THE SERVER
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
	console.log(`App running on port: ${port}...`);
});

process.on("unhandleRejection", (err) => {
	console.error(`${err.name}: ${err.message}`);
	console.log("Unhandled Rejection! 💥 Shutting Down....");
	server.close(() => {
		process.exit(1);
	});
});
