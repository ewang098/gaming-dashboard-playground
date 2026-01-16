const button = document.getElementById("loadBtn");
const resultDiv = document.getElementById("result");

/*
    APIs Used:
        https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices

    Local Development through:
        Live Server Extension
*/

const BASE_ROUTE =  "https://prices.runescape.wiki/api/v1/osrs/";

const ITEM_MAP = new Map([
    // bars
    ["addy_bar", 2361],
    ["rune_bar", 2363],
    // ores
    ["addy_ore", 449],
    ["rune_ore", 451],
    // equipables
    ["addy_platebody", 1123],
    ["rune_2h_sword", 1319],
]);

button.addEventListener("click", async () => {
    try {
        // make route
        const runeBarRoute = BASE_ROUTE + "latest?id="+ ITEM_MAP.get("rune_bar");
        console.log(runeBarRoute);
        
        // Fetch
        const response = await fetch(runeBarRoute);
        const responseJSON = await response.json();
        console.log(responseJSON);

        // Display the result
        resultDiv.innerText = JSON.stringify(responseJSON);
    } catch (error) {
        resultDiv.innerText = "Error fetching data!";
        console.error(error);
    }
});
