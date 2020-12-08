const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();
let nodemailer = require("nodemailer");
const path = require("path");
const port = process.env.PORT || 8000;

// app.use("/", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("App is running on port " + port);
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "YOUREMAIL",
    pass: "PASSWORDOFEMAIL",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// verifying the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.info(`server has started on ${PORT}`));

// mailer ends

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.post("/access", (req, res, next) => {
  var email = req.body.email;
  var message = req.body.message;
  var content = `email: ${email} \n message: ${message} `;
  console.log(content);

  var mail = {
    from: "fromEmail",
    to: "destinationEmail",
    subject: "CLINICCONNECT new inquiry",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("no");
      res.json({
        status: "fail",
      });
    } else {
      console.log("yes");
      res.json({
        status: "success",
      });
    }
  });
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    // when you call createAvailability(), you return an availability
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "frontend/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // app.listen(port, () => console.log("Listening on Port", port));
  })
  .catch((err) => {
    console.log(err);
  });
