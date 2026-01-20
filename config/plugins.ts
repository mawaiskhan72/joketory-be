export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 10,
      maxLimit: 20,
    },
  },
};
