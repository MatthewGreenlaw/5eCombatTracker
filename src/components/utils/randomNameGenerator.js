export const randomName = (_ret) => {
  fetch("https://uinames.com/api/")
    .then(function (res) {
      return res.json();
    })
    .then((random) => {
      _ret = random.name
    })
}
