//* TEST
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

//* SOAP
// XMLHttpRequest()
// <xml>

// </xml>
