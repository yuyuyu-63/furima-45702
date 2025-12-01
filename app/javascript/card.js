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

  const expiryElement = elements.create("expiry");
  expiryElement.mount("#expiry-form");

  const cvcElement = elements.create("cvc");
  cvcElement.mount("#cvc-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { error, token } = await payjp.createToken(numberElement);
    if (error) {
      console.error(error);
      alert("カード情報に誤りがあります。確認してください。");
      return;
    }

    const tokenInput = document.createElement("input");
    tokenInput.setAttribute("type", "hidden");
    tokenInput.setAttribute("name", "token");
    tokenInput.value = token.id;
    form.appendChild(tokenInput);

    form.submit();
  });
});
