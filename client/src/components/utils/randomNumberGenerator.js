var randomAPI = require("random-org");

export const generateIntegers = (func, params) => {
  var generator = new randomAPI({
    apiKey: "61804754-7dfe-4259-9e1b-7dc2ca110a00"
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
