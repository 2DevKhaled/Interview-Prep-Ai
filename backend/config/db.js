const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/InterviewPrepAi", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};
module.exports = connectDB;
 
