const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Account {
    id: ID!
    email: String!
    token: String!
    firstName: String!
    lastName: String!
    date: String!
  }

  type NewTodoList {
    id: ID!
    account: ID!
    name: String!
    details: String!
    active: Boolean
    todos: [Todo]
  }

  type TodoLists {
    id: ID!
    account: ID!
    name: String!
    details: String!
    active: Boolean
    todos: [Todo]
  }

  type Todo {
    name: String!
    details: String
    active: Boolean!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
  }

  input Todos {
    name: String!
    details: String!
    active: Boolean!
  }

  input TodoListInput {
    account: ID!
    name: String!
    details: String!
  }
    
  input UpdateInput {
    id: ID!
    name: String!
    details: String!
    active: Boolean!
    todos: [Todos]
  }

  type RootQuery {
    getTodos(id: String!): [TodoLists!]
    loginUser(email: String!, password: String!): Account!
  }

  type RootMutation {
    registerUser(registerInput: RegisterInput): Account!
    createTodo(todoListInput: TodoListInput): NewTodoList!
    updateTodo(updateInput: UpdateInput): NewTodoList!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
