document.addEventListener("turbo:load", () => {
  const form = document.getElementById("charge-form");
  if (!form) return;

  const payjpPublicKeyMeta = document.querySelector('meta[name="payjp-public-key"]');
  const publicKey = payjpPublicKeyMeta && payjpPublicKeyMeta.content;

  if (!publicKey || !window.Payjp) {
    console.warn("PAY.JP の公開鍵または Payjp オブジェクトが取得できていません");
    return;
  }

  const payjp = Payjp(publicKey);
  const elements = payjp.elements();

  const numberElement = elements.create("cardNumber");
  numberElement.mount("#number-form");

  const expiryElement = elements.create("cardExpiry");
  expiryElement.mount("#expiry-form");

  const cvcElement = elements.create("cardCvc");
  cvcElement.mount("#cvc-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const result = await payjp.createToken(numberElement);

    if (result.error) {
      console.error(result.error);
      alert("カード情報に誤りがあります。確認してください。");
      return;
    }

    const tokenId = result.id;

    const tokenInput = document.createElement("input");
    tokenInput.setAttribute("type", "hidden");
    tokenInput.setAttribute("name", "token");
    tokenInput.value = tokenId;
    form.appendChild(tokenInput);

    form.submit();
  });
});
