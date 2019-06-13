Prisma does not have any JSON filter (See this [issue](https://github.com/prisma/prisma/issues/148)). This repo is to showcase a way to filter the JSON data using mingo.

---

# How it works?

### Generate Fake Data
fakeData generates 5 to 20 fake objects so we don't need a database to test out how it works.

### Filter Data
filterData is simply a function that takes the fake data and applies mongodb like cursor. 

It has `skip` and `first` just like we need in a prisma/graphql filter.

### Schema
It has a simple query `people` which takes a schemaless raw JSON data. The data can be anything but since we are trying to filter, we assume it's an array (of objects).

### Sample Query
```graphql
{
  people(first: 2, skip: 1)
}
```

This query skips the first element and then returns 2 results. In prisma, `first` is like an alias for `limit`.

Here is the result:
![](https://i.imgur.com/9eEYQhw.png)