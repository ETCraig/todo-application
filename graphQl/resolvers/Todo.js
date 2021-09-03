const TodoList = require("../../models/TodoList");

const transformEvent = (event) => {
  return {
    ...event._doc,
    id: event.id,
    name: event.name,
    account: event.account,
    active: event.active,
    todos: event.todos,
  };
};

module.exports = {
  getTodos: async ({ isAuth, id }) => {
    if (isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const todoList = await TodoList.find({ account: id, active: true });

      return todoList.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createTodo: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      console.log("inside");
      const { account, name, details } = args.todoListInput;

      const newTodoList = new TodoList({
        name,
        account,
        details
      });

      const todoList = await newTodoList.save();

      return {
        id: todoList.id,
        account: todoList.account,
        name: todoList.name,
        details: todoList.details,
        active: todoList.active,
      };
    } catch (error) {
      throw error;
    }
  },
  updateTodo: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const { id, name, details, todos, active } = args.updateInput;
      console.log(id, name, todos, active, details);
      let todoList = await TodoList.findOne({ _id: id });

      todoList = await TodoList.findOneAndUpdate(
        { _id: id },
        { $set: { name, todos, active } },
        { new: true }
      );
      todoList.save();
      
      return {
        ...todoList._doc,
        id: todoList.id,
        name: todoList.name,
        account: todoList.account,
        active: todoList.active,
        todos: todoList.todos,
      };
    } catch (error) {
      throw error;
    }
  },
};
