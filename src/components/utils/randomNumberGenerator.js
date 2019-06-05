var randomAPI = require("random-org");

export const generateIntegers = (func, params) => {
  var generator = new randomAPI({
    apiKey: "d76c87df-2f80-4ca0-9cd6-88db97b0cd88"
  });
  generator
    .generateIntegers(params)
    .then(result => {
      func(result.random.data);
    })
    .catch(e => {
      console.log(e);
    });
};
