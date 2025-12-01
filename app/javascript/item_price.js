const priceCalc = () => {
  const priceInput = document.getElementById("item-price");
  if (!priceInput) return;

  const taxDom = document.getElementById("add-tax-price");
  const profitDom = document.getElementById("profit");

  const updatePrice = () => {
    const inputValue = priceInput.value;

    if (inputValue === "" || isNaN(inputValue)) {
      taxDom.innerHTML = "";
      profitDom.innerHTML = "";
      return;
    }

    const tax = Math.floor(inputValue * 0.1);
    const profit = Math.floor(inputValue - tax);

    taxDom.innerHTML = tax;
    profitDom.innerHTML = profit;
  };

  priceInput.addEventListener("input", updatePrice);

  updatePrice();
};

document.addEventListener("turbo:load", priceCalc);

document.addEventListener("turbo:render", priceCalc);


window.addEventListener('turbo:load', priceCalc);
