module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  // 防止自动删除未使用的引入
  rules: {
    'no-unused-vars': 'off',
  },
};
