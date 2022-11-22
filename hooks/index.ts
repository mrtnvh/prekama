import client from "~~/prisma/client";

export default {
  hooks: {
    close: async () => {
      await client.$disconnect();
    },
  },
};
