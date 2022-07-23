// API KEY coinrankinge51b5a8cff4089826bd212b449c7801acd6e256471939d76

const data = document.getElementById("data");
const loader = document.getElementById('loader');

//Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    data.hidden = true;
}
// Hide Loading

function hideLoadingSpinner() {
    data.hidden = false;
    loader.hidden = true;
}





async function getApi() {
    showLoadingSpinner();
    const baseUrl = "https://api.coinranking.com/v2/coins";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiKey = "coinrankinge51b5a8cff4089826bd212b449c7801acd6e256471939d76";
    try {
        const response = await fetch(`${proxyUrl}${baseUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-My-Custom-Header': `${apiKey}`,
                'Access-Control-Allow-Origin': "*"
            }
        });
        if (response.ok) {
            getData = await response.json().then((json) => {
                console.log(json.data);
                let coinsData = json.data.coins;
                let cryptoCoin = "";
                if (coinsData.length > 0) {

                    //Round the values
                    const millOrBill = (val) => {
                        if (val < 1000000000) {
                            return Number(val / 1000000).toFixed(2) + "M";
                        } else if (val > 1000000000) {
                            return Number(val / 1000000000).toFixed(2) + "B"
                        };
                    };

                    const fixNums = (val) => {
                        if (val < 1.1) {
                            return Number(val).toFixed(6)
                        } else {
                            return Number(val).toFixed(2)
                        }
                    }

                    //For Loop Starts
                    coinsData.forEach((coin) => {
                        cryptoCoin += "<tr>";
                        cryptoCoin += `<td>
                                    <div class="table-cell-1">
                                      <span class="star-icon"><i class="fa-regular fa-star"></i></span>
                                     <span class="coin-rank">${coin.rank}</span>
                                      <span class="coin-icon"><img class="coin-img" src="${coin.iconUrl}"></span>
                                      <span class="td-con">${coin.name}<br> <span class="symbol">${coin.symbol}</span>
                                   </div>
                                  </td>`;
                        cryptoCoin += `<td> ${fixNums(coin.price)} </td>`;
                        cryptoCoin += `<td> ${coin.change}</td>`;
                        cryptoCoin += `<td> ${millOrBill(coin["24hVolume"])}</td>`;
                        cryptoCoin += `<td> ${millOrBill(coin.marketCap)}</td>`; "<tr>";
                    });
                }
                //For Loop Ends
                data.innerHTML = cryptoCoin;


            })
            hideLoadingSpinner();
        }

    } catch (error) {
        console.log(error);
    }
}


getApi();

