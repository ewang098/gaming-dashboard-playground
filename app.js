const button = document.getElementById("loadBtn");

const itemDivMap = {
    rune_bar: {
        high_price: document.getElementById("priceRuneBarHigh"),
        high_time: document.getElementById("timeRuneBarHigh"),
        low_price: document.getElementById("priceRuneBarLow"),
        low_time: document.getElementById("timeRuneBarLow"),
    },
    rune_ore: {
        high_price: document.getElementById("priceRuneOreHigh"),
        high_time: document.getElementById("timeRuneOreHigh"),
        low_price: document.getElementById("priceRuneOreLow"),
        low_time: document.getElementById("timeRuneOreLow"),
    },
};

const BASE_ROUTE = "https://prices.runescape.wiki/api/v1/osrs/";
const ITEM_MAP = new Map([
    ["rune_bar", 2363],
    ["rune_ore", 451],
]);

async function fetchAndDisplayPrice(itemName) {
    try {
        const itemId = ITEM_MAP.get(itemName);
        const route = `${BASE_ROUTE}latest?id=${itemId}`;
        const divs = itemDivMap[itemName];
        Object.values(divs).forEach(d => d.innerText = "Loading...");

        const response = await fetch(route);
        const data = await response.json();

        // Access API by string key
        const priceData = data.data[itemId.toString()];
        if (!priceData) throw new Error("No data returned");

        const highTime = new Date(priceData.highTime * 1000).toLocaleTimeString();
        const lowTime = new Date(priceData.lowTime * 1000).toLocaleTimeString();

        divs.high_price.innerText = priceData.high;
        divs.high_time.innerText = highTime;
        divs.low_price.innerText = priceData.low;
        divs.low_time.innerText = lowTime;

    } catch (error) {
        console.error(error);
        Object.values(itemDivMap[itemName]).forEach(d => d.innerText = "Error!");
    }
}

button.addEventListener("click", async () => {
    const promises = Object.keys(itemDivMap).map(itemName =>
        fetchAndDisplayPrice(itemName)
    );
    await Promise.all(promises);
});
