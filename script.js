const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];  // array of objects. Each object contains people's first & last name, and money value (ie. wealth)

// Fetch random user and add money with .then
// function getRandomUser() {
//   fetch('https://randomuser.me/api').then(res => res.json()).then(data => ) // with .then, we capture response, put it into json, second .then is where we get the promise (ie. data), data => will allow use to specifiy what we want to do with our data
// }

getRandomUser();
getRandomUser();
getRandomUser();


// Fetch random user and add money with async
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0] //* this is to get the user name from promise, which contains the name
  const newUser = {            //* this create new user object from the user data from user
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)  
    //* Math.floor round the number to the largest integer.
    //* Math.random generates a pseudo-random number between 0 to 1
  }

  addData(newUser);
}
//* with async await, we don't need to chain .then like the one above (commented out)
//* Step 1: Async: mark this function as asynchronous by adding async in front of the function
//* Step 2: capture the response (ie. promise) by putting the that into a variable called res. But this fetch is asynchronous, 
//*         it happens behind the scenes, so we have to wait for it to finish. So we need to -> Step 3
//* Step 3: Await: add it in front of fetch. Then we need to capture the name (first and last in info) from the promise
//@ Note on promise with Async and Await: We must use await in front of any promise we captured from the API
//* 

// Add new user object to data array
function addData(obj) {
  data.push(obj); //* push means append for array in JS
}

console.log(data)