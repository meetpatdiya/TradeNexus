export async function fetchNews() {
    //  just in case if this api don't work 
    //  "https://newsdata.io/api/1/crypto?apikey=pub_48c8ba3dc91b46e2b3d10aa2fe4868dc&q=crypto"
    //  setData(result.results); and change all things based on results
    try {      
        const response  = await fetch('https://api.thenewsapi.net/crypto?apikey=7337F7A4A0B2F85F30D93CD4716666B8')
        const result = await response.json() 
        return result.data.results;
    } catch (error) {
        console.log(error);
        return []
    }
}
export  async function getBasicData() { 
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d");
        const data = await response.json();
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return []
    }   
  }
//   export async function getSingleCoin(id) {
//     try {
//         const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
//         const data = await response.json();
//         return data
//     } catch (error) {
//         console.log(error)
//         return []
//     }
//   }
// export  async function getMainData(id,days) { 
//     try {
//         const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
//         const data = await response.json();
//         return data
//     } catch (error) {
//         console.log(error)
//         return []
//     }   
//   }
export  async function getMainData() { 
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
        return []
    }   
  }
