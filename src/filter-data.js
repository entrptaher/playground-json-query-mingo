const mingo = require("mingo");

module.exports = function({
  data,
  query = {},
  projection = {},
  skip = 0,
  first = 0
}) {
  try {
    const cursor = mingo.find(data, query, projection);

    // filter and modifiers
    if (skip) cursor.skip(skip);
    if (first) cursor.limit(first);

    return cursor.all();
  } catch (e) {
    console.error(e);
    return [];
  }
};