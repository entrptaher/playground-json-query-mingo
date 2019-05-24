const sample = require("../sample.json");
const queryEngine = require("@theledger/couchdb-query-engine");

(async function() {
  const current = sample[0];
  console.log(current.friends);
  const result = queryEngine
    .parseQuery(current.friends, {
      selector: { id: { $exists: true } }
    })
    .map(e => e && e.value);
  console.log(result);
})();
