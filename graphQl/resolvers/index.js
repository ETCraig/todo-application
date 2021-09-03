const authResolvers = require("./Auth");
const todoListResolvers = require("./Todo");

const rootResolver = {
  ...authResolvers,
  ...todoListResolvers,
};
module.exports = rootResolver;
