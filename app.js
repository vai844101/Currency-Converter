const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");  

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
});

for (let select of dropDowns) {
  for (let curr_code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = curr_code;
    newOption.value = curr_code;
    if (select.name === "from" && curr_code === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && curr_code === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  // console.log(currCode);
  // console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


btn.addEventListener("click",  (e) => {
    e.preventDefault();
    updateExchangeRate();

});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


// this end point api for currency converter
// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"