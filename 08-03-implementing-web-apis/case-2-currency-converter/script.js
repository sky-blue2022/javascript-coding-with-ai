// Replace 'your_api_key_here' with your actual ExchangeRate-API key
const apiKey = "your_api_key_here";

document.getElementById("convertButton").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("amount").value.trim());
  const fromCurrency = document
    .getElementById("fromCurrency")
    .value.trim()
    .toUpperCase();
  const toCurrency = document
    .getElementById("toCurrency")
    .value.trim()
    .toUpperCase();

  if (isNaN(amount) || !fromCurrency || !toCurrency) {
    alert("Please enter a valid amount and currency codes!");
    return;
  }

  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate data.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.result === "error") {
        throw new Error(data["error-type"]);
      }

      const exchangeRate = data.conversion_rate;
      const convertedAmount = (amount * exchangeRate).toFixed(2);

      document.getElementById("conversionResult").innerHTML = `
                <p>${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</p>
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("conversionResult").innerHTML = `
                <p style="color: red;">Error: ${error.message}</p>
            `;
    });
});
