const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
const flash = require('connect-flash');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(flash())
app.use(express.static("public"));
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://user:password1@ds237357.mlab.com:37357/heroku_d51h9938", { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log(`mongoose connection successful`.yellow);
    
});

app.listen(PORT, (err)=> {
    if (err) throw err;
    console.log(`connected on port ${PORT}`.cyan)
});

// app.listen(PORT, function(){
//     console.log(`Express server listening on port ${PORT}`);
//   });



