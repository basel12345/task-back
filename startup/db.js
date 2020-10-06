const mongoose = require('mongoose');
module.exports = function () {
    mongoose.connect(
                "mongodb+srv://task:task@cluster0.izihd.mongodb.net/<dbname>?retryWrites=true&w=majority",
                {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                }
            )
            .then(() => console.log("Connect with mongoDB with successfully"))
            .catch(err => console.log(err));
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
}