const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = []; // array of objects. Each object contains people's first & last name, and money value (ie. wealth)

// Fetch random user and add money with .then
// function getRandomUser() {
//   fetch('https://randomuser.me/api').then(res => res.json()).then(data => ) // with .then, we capture response, put it into json, second .then is where we get the promise (ie. data), data => will allow use to specifiy what we want to do with our data
// }

// Fetch random user and add money with async
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0]; //* this is to get the user name from promise, which contains the name
  const newUser = {
    //* this create new user object from the user data from user
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    //* Math.floor round the number to the largest integer.
    //* Math.random generates a pseudo-random number between 0 to 1
  };
  addData(newUser);
}
//* with async await, we don't need to chain .then like the one above (commented out)
//* Step 1: Async: mark this function as asynchronous by adding async in front of the function
//* Step 2: capture the response (ie. promise) by putting that into a variable called res. But this fetch is asynchronous,
//*         it happens behind the scenes, so we have to wait for it to finish. So we need to -> Step 3
//* Step 3: Await: add it in front of fetch. Then we need to capture the name (first and last in info) from the promise
//@ Note on promise with Async and Await: We must use await in front of any promise we captured from the API
//*

getRandomUser();
getRandomUser();
getRandomUser();

// Double everyones' money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }; //@ ... is a spread operator. It just copies all the users
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Add new user object to data array
function addData(obj) {
  data.push(obj); //* push means append for array in JS

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>"; //* This one clears the innerHTML

  providedData.forEach((item) => {
    //* item doesn't need to be in () because it's only one argument.
    const element = document.createElement("div"); //* `document.createElement` creates an HTML element. This is a new div for person in css
    element.classList.add("person"); //* Adding new class `person` for the 'div' we just created
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
//@ for the argument, we are setting providedData to data as default if we didn't put any argument in when we were calling the function
//# forEach: if not using it, we will need to do a for loop, which will look like this:
//# for (i = 0; i < providedData.length; i++) {
//#   providedData[i].___
//# }

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); //* From StackOverflow #149055
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);

// MDN links:
// sort arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// filter arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
