let roles = {
  guest: {
    can: ["customer:register", "customer:login"],
  },
  customer: {
    can: [
      "customer:cart",
      "customer:profile",
      // {
      //   name: "customer:cart",
      //   when: async (params) => returnUserIndex(params),
      // },
    ],
    inherits: ["guest"],
  },
  admin: {
    can: ["customer:list"],
    inherits: ["customer"],
  },
};

// const returnUserIndex = (params) => {
//   return params.customer._id == params.userId ? true : false;
// };

module.exports = roles;
