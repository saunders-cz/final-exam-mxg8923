import { DateTimeResolver } from "graphql-scalars";
import { FoodItem } from "./model.js";
import { User } from "./model.js";

const { createHmac } = await import("crypto");
const secret_key = "goosemax";

export default {
  Query: {
    foodItem: async (_, { id }) => await FoodItem.findByPk(id),
    foodItems: async () => await FoodItem.findAll(),
    auth: async (_, { email, password }) => {
      const hash = createHmac("sha256", secret_key)
        .update(password)
        .digest("hex");
      return await User.findOne({ where: { email: email, password: hash } });
    },
    user: async (_, { id }) => await User.findByPk(id),
  },
  Mutation: {
    addFoodItem: async (_, { input }) => {
      await FoodItem.create({ ...input, complete: false });
      return { success: true };
    },
    editFoodItem: async (_, { id, input }) => {
      await FoodItem.update({ ...input }, { where: { id } });
      return {
        success: true,
      };
    },
    deleteFoodItem: async (_, { id }) => {
      const record = await FoodItem.findByPk(id);
      if (!record) {
        throw new Error(`Record with id ${id} was not found.`);
      }
      await record.destroy();
      return {
        success: true,
      };
    },
    addUser: async (_, { input }) => {
      const hash = createHmac("sha256", secret_key)
        .update(input.password)
        .digest("hex");
      await User.create({ ...input, password: hash, complete: false });
      return { success: true };
    },
    editUser: async (_, { id, input }) => {
      if (input.password && input.password.length > 7) {
        const hash = createHmac("sha256", secret_key)
          .update(input.password)
          .digest("hex");
        await User.update({ ...input, password: hash }, { where: { id } });
      } else {
        await User.update({ ...input }, { where: { id } });
      }
      return {
        success: true,
      };
    },
  },
  DateTime: DateTimeResolver,
};
