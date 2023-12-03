const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector(".reverse");
const ammont = document.querySelector(".ammont input");
const exRateTxt = document.querySelector(".result");

// Event listener for currency dropdown (select)
[fromCur, toCur].forEach((select, i) => {
    for (let curCode in country_list) {
        const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "ID") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    });
});

// Function to get exchange rate from API
async function getExchangeRate() {
    const amountVal = ammont.value || 1;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/0f017433f7ab1276d7ace9a5/latest/${fromCur.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCur.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
    } catch (error) {
        exRateTxt.innerText = "Try again...";
    }
}

window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click", () =>{
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const code =  select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    })
    getExchangeRate();
});