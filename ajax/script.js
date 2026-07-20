const btnRate = document.getElementById("btnRate");
const currency = document.getElementById("currency");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const ctx = document.getElementById("currencyChart");
let chart = null;
const BASE_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=";

const ALL_CURRENCIES_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
// https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20200302&json

async function loadCurrencies() {

    const respose = await fetch(ALL_CURRENCIES_URL);
    const data = await respose.json();

    currency.innerHTML = '<option value="">Choose currency</option>';

    data.forEach(item => {
        const option = document.createElement("option");

        option.value = item.cc;
        option.textContent = `${item.cc} - ${item.txt}`;
        currency.appendChild(option);

    });
}

function createChart(dates, rates) {
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: currency.value,
          data: rates,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
  });
}
btnRate.addEventListener("click", async () => {
  if (currency.value === "" || startDate.value === "" || endDate.value === "") {
    console.log("GET value");
    return;
  }

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  const dates = [];
  const rates = [];

  for (
    let currentDate = new Date(start);
    currentDate <= end;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateForNbu = currentDate
      .toISOString()
      .split("T")[0]
      .split("-")
      .join("");
    console.log(dateForNbu);

    const URI = `${BASE_URL}${currency.value}&date=${dateForNbu}&json`;

    const response = await fetch(URI);

    const data = await response.json();
    if (data.length > 0) {
      const displayDate = currentDate.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      });

      dates.push(displayDate);

      rates.push(data[0].rate);
    }
  }
  console.log(dates);
  console.log(rates);

  createChart(dates, rates);
  
});
loadCurrencies();
