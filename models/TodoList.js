const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "account",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    default: ""
  },
  todos: [
    {
      name: {
        type: String,
        required: true,
      },
      details: {
        type: String,
      },
      active: {
        type: Boolean,
        default: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("todoList", TodoListSchema);
