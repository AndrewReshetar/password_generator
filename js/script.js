const showResult = document.querySelector(".result");
const generateButton = document.querySelector(".generate");
const copyButton = document.querySelector(".copy");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const range = document.querySelector('input[type="range"]');
let span = document.querySelector(".value");
let checkedValues = [];
let password = "";
//data
const symbols = {
  upper: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "N",
    "M",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  lower: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "n",
    "m",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  symbols: ["!", "@", "#", "$", "%", "^", "&"],
};
// range input
const rangeOperation = (e) => {
  copyButton.style.color = "rgb(218, 204, 228)";
  const value = e.target.value;
  if (value < 10) {
    span.style.color = "tomato";
  } else if (value >= 10 && value <= 15) {
    span.style.color = "white";
  } else {
    span.style.color = "lightgreen";
  }
  span.textContent = value;
};
range.addEventListener("input", rangeOperation);
//checkbox
checkboxes.forEach((c) => {
  c.addEventListener("change", () => {
    copyButton.style.color = "rgb(218, 204, 228)";
    if (c.checked) {
      checkedValues.push(c.dataset.v);
      showResult.value = "";
      document.querySelector(`.${c.dataset.v}`).style.color = "green";
    } else {
      document.querySelector(
        `.${c.dataset.v}`
      ).style.color = `rgb(219, 214, 214)`;
      checkedValues = checkedValues.filter((item) => item !== c.dataset.v);
    }
  });
});

//generate result
const generate = () => {
  copyButton.style.color = "rgb(218, 204, 228)";
  password = "";
  if (Array.from(checkboxes).filter((c) => c.checked).length === 0) {
    showResult.style.color = "red";
    showResult.value = "You should choose at least one option!";
    checkedValues.length = 0;
  } else {
    let mixedValues = [];
    checkedValues.forEach((arrayKey) => {
      for (let objKey in symbols) {
        if (arrayKey === objKey) {
          mixedValues.push(...symbols[objKey]);
        }
      }
    });
    generatePassword(mixedValues);
  }
};

const generatePassword = (arr) => {
  for (let i = 0; i < range.value; i++) {
    password += arr[Math.floor(Math.random() * arr.length)];
  }
  showResult.style.color = "rgba(255, 255, 255, 0.979)";
  showResult.value = password;
  return password;
};
generateButton.addEventListener("click", generate);

const copy = () => {
  copyButton.style.color = "yellow";
  return navigator.clipboard.writeText(password);
};

copyButton.addEventListener("click", copy);
