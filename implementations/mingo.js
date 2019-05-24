const mingo = require("mingo");

const data = require("../sample.json");

async function find({
  data,
  query = {},
  projection = {},
  sort = {},
  skip = 0,
  limit = 0
}) {
  try {
    const cursor = mingo.find(data, query, projection);
    if (sort) cursor.sort(sort);
    if (skip) cursor.skip(skip);
    if (limit) cursor.limit(limit);
    return cursor.all();
  } catch (e) {
    console.log(e)
    return [];
  }
}

find({ data, query: {}, projection: { friends: { $slice: 2 } } }).then(
  data => console.log(data[0].friends)
);
