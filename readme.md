Prisma does not have any JSON filter (See this [issue](https://github.com/prisma/prisma/issues/148)). This repo is to showcase a way to filter the JSON data using mingo.

---

# How it works?

We create a minimal graphql server with `graphql-yoga`, however it could be express or anything else. It has one query which returns json data.

## Generate Fake Data

fakeData generates 5 to 20 fake objects so we don't need a database to test out how it works.

## Schema

It has a simple query `people` which takes a schemaless raw JSON data. The data can be anything but since we are trying to filter, we assume it's an array (of objects).

## Sample Query

Fetch all results

```graphql
{
  people
}
```

## Filter Data

filterData is simply a function that takes the fake data and applies mongodb like cursor.

### skip and first

It has `skip` and `first` just like we need in a prisma/graphql filter.

Fetch result with some filter

```graphql
{
  people(first: 2, skip: 1)
}
```

This query skips the first element and then returns 2 results. In prisma, `first` is like an alias for `limit`.

Here is the result:
![](https://i.imgur.com/9eEYQhw.png)

### query

**Warning! Beyond this point, it gets really complex. Caution adviced.**

The `query` filter takes a stringified json. Consider the following query,

```js
{
  id: {
    $gte: 50000;
  }
}
```

You need to turn this into an string and pass that,

```js
JSON.stringify(JSON.stringify({ id: { $gte: 50000 } }));
// "{\"id\":{\"$gte\":50000}}"
```

So now the query becomes:

```graphql
{
  people(query: "{\"id\":{\"$gte\":50000}}")
}
```

You can probably implement all other type of filter based on the above logic.

For example, with Regex:

```js
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(JSON.stringify({ name: { $regex: /\d+/ } }));
// "{\"name\":{\"$regex\":\"/\\\\d+/\"}}"
```

The query becomes:

```graphql
{
  people(query: "{\"name\":{\"$regex\":\"/\\\\d+/\"}}")
}
```
