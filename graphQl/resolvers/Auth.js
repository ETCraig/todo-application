const Account = require("../../models/Account");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (args) => {
    try {
      const { firstName, lastName, email, password } = args.registerInput;
      let account = await Account.findOne({ email });

      if (account) {
        throw new Error("Account Already Exists.");
      }

      account = new Account({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      account.password = await bcrypt.hash(password, salt);

      await account.save();

      const payload = {
        account: {
          id: account.id,
        },
      };

      const token = await jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 3600,
      });

      return {
        token,
      };
    } catch (error) {
      throw error;
    }
  },
  loginUser: async ({ email, password }) => {
    try {
      let account = await Account.findOne({ email });

      if (!account) {
        throw new Error("Invalid Credentials.");
      }

      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) {
        throw new Error("Invalid Credentials.");
      }

      const payload = {
        account: {
          id: account.id,
        },
      };

      const token = await jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 3600,
      });

      return {
        token,
      };
    } catch (error) {
      throw error;
    }
  },
};
