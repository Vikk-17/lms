const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const mediaRoutes = require("./routes/instructor/media.routes")

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(cors());
app.use(express.json());


// database connection
const conncetDB = async () => {
    const conn = await mongoose.connect(MONGO_URI);
    const data = {
        "host": conn.connection.host,
        "name": conn.connection.name,
        "port": conn.connection.port,
    }
    console.log("Databse connected")
    console.log(data);
}

conncetDB()

// routes
app.use("/media", mediaRoutes);

// global error catch
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening in the port ${PORT}`);
});
