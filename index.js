const express = require("express");
const connectDB = require("./config/db");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphQl/Schema");
const resolvers = require("./graphql/resolvers/");
const Authentication = require("./middleware/Authentication");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(Authentication);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
