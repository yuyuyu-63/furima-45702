document.addEventListener("turbo:load", () => {
  const form = document.getElementById("charge-form");
  if (!form) return;

  const publicKeyMeta = document.querySelector('meta[name="payjp-public-key"]');
  if (!publicKeyMeta || !window.Payjp) {
    console.warn("PAY.JP の公開鍵または Payjp オブジェクトが取得できていません");
    return;
  }

  const payjp = Payjp(publicKeyMeta.content);
  const elements = payjp.elements();

  const numberElement = elements.create("cardNumber");
  numberElement.mount("#number-form");

  const expiryElement = elements.create("cardExpiry");
  expiryElement.mount("#expiry-form");

  const cvcElement = elements.create("cardCvc");
  cvcElement.mount("#cvc-form");

  const cardError = document.getElementById("card-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (cardError) cardError.textContent = "";

    const result = await payjp.createToken(numberElement);

    if (result.error) {
      if (cardError) {
        cardError.textContent = result.error.message;
      } else {
        alert("カード情報に誤りがあります。確認してください。");
      }
      return;
    }

    const tokenId = result.id || (result.token && result.token.id);
    if (!tokenId) {
      if (cardError) {
        cardError.textContent = "カード情報の送信に失敗しました。";
      }
      return;
    }

    const tokenInput = document.createElement("input");
    tokenInput.setAttribute("type", "hidden");
    tokenInput.setAttribute("name", "token");
    tokenInput.value = tokenId;
    form.appendChild(tokenInput);

    form.submit();
  });
});



document.addEventListener("turbo:load");
document.addEventListener("turbo:render");
