module.exports = {
  module: {
    rules: [
      {
        test: /.jsonc$/,
        use: [
          {
            loader: `jsonc-loader`,
          },
        ],
      },
    ],
  },
};
