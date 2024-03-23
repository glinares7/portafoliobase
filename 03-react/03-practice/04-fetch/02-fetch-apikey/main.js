fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((result) => {
    result.forEach((element) => {
      const boss = document.createElement("P");
      addtext.append(boss);
      boss.textContent = element.name;
    });
  })

  .catch((error) => console.error(error));

// fetch("https://api-football-v1.p.rapidapi.com/v3/timezone", {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
//   },
// })
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.err(err));

// * caccovid
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host":
//       "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//* COBID19-CORONAVIRUS
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=Canada",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// * COVID 19
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
//   },
// };

// fetch("https://covid-193.p.rapidapi.com/countries", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// * cobid 19 staditics

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
//   },
// };

// fetch("https://covid-19-statistics.p.rapidapi.com/regions", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//* telize
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'telize-v1.p.rapidapi.com'
// 	}
// };

// fetch('https://telize-v1.p.rapidapi.com/geoip', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *Endiess medical api
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
// 	}
// };

// fetch('https://endlessmedicalapi1.p.rapidapi.com/UpdateFeature?name=%3CREQUIRED%3E&value=%3CREQUIRED%3E&SessionID=%3CREQUIRED%3E', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//* flight data
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-Access-Token': 'undefined',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
// 	}
// };

// fetch('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/?destination=LED&origin=MOW', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *Aviation preference data

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'aviation-reference-data.p.rapidapi.com'
// 	}
// };

// fetch('https://aviation-reference-data.p.rapidapi.com/icaoType/B738', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *IATA and ICAO
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'leopieters-iata-and-icao-v1.p.rapidapi.com'
// 	}
// };

// fetch('https://leopieters-iata-and-icao-v1.p.rapidapi.com/airportDatabase?key=your_api_key&codeIataAirport=AAA', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//* D7SMS

// const options = {
// 	method: 'GET',
// 	headers: {
// 		Token: 'undefined',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'd7sms.p.rapidapi.com'
// 	}
// };

// fetch('https://d7sms.p.rapidapi.com/messages/v1/balance', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *sms77io
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'sms77io.p.rapidapi.com'
// 	}
// };

// fetch('https://sms77io.p.rapidapi.com/pricing?p=%3CREQUIRED%3E', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *Twilio Verify Phone Number

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'twilio-verify-phone-number.p.rapidapi.com'
// 	}
// };

// fetch('https://twilio-verify-phone-number.p.rapidapi.com/Services/%7Bsid%7D', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *D7 verify

// const options = {
// 	method: 'GET',
// 	headers: {
// 		Token: 'undefined',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'd7-verify.p.rapidapi.com'
// 	}
// };

// fetch('https://d7-verify.p.rapidapi.com/messages/v1/balance', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *Best Booking.com Hotel
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
    "X-RapidAPI-Host": "best-booking-com-hotel.p.rapidapi.com",
  },
};

fetch(
  "https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation?cityName=Berlin&countryName=Germany",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//* Proxy spider proxys

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "proxyspider-proxy-spider-proxies-v1.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://proxyspider-proxy-spider-proxies-v1.p.rapidapi.com/proxies.json?api_key=%3CREQUIRED%3E&order=best&page=1&response_time=slow%2Cmedium%2Cfast&type=anonymous%2Celite%2Ctransparent&test=0&limit=100&protocols=http%2Chttps&supports=get",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// * IP BLOCKLIST

// const encodedParams = new URLSearchParams();
// encodedParams.append("ip", "201.218.218.198");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'neutrinoapi-ip-blocklist.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://neutrinoapi-ip-blocklist.p.rapidapi.com/ip-blocklist', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//* Rotating proxies

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "rotating-proxy-api.p.rapidapi.com",
//   },
// };

// fetch("https://rotating-proxy-api.p.rapidapi.com/?apiKey=undefined", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *lyft

// const encodedParams = new URLSearchParams();
// encodedParams.append("rideId", "<REQUIRED>");
// encodedParams.append("accessToken", "<REQUIRED>");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'Lyftvolodimir-kudriachenkoV1.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://lyftvolodimir-kudriachenkov1.p.rapidapi.com/cancelRequestedRide', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *Railway trains india

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'trains.p.rapidapi.com'
// 	},
// 	body: '{"search":"Rajdhani"}'
// };

// fetch('https://trains.p.rapidapi.com/', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *text and speech
// const encodedParams = new URLSearchParams();
// encodedParams.append("src", "Hello, world!");
// encodedParams.append("hl", "en-us");
// encodedParams.append("r", "0");
// encodedParams.append("c", "mp3");
// encodedParams.append("f", "8khz_8bit_mono");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://voicerss-text-to-speech.p.rapidapi.com/?key=undefined', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *RoboMatic.AI
// const encodedParams = new URLSearchParams();
// encodedParams.append("in", "What's 2 plus 5?");
// encodedParams.append("op", "in");
// encodedParams.append("cbot", "1");
// encodedParams.append("SessionID", "RapidAPI1");
// encodedParams.append("cbid", "1");
// encodedParams.append("key", "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP");
// encodedParams.append("ChatSource", "RapidAPI");
// encodedParams.append("duration", "1");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://robomatic-ai.p.rapidapi.com/api', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//* stscore

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "mtscore1.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://mtscore1.p.rapidapi.com/?evn=62b5ev4u3h7a50l4et06ch18ap9ie1vn",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//* perfect tense

// const encodedParams = new URLSearchParams();
// encodedParams.append("responseType", "[\"corrected\", \"grammarScore\", \"rulesApplied\", \"offset\", \"summary\"]");
// encodedParams.append("text", "This articl have some errors");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		Authorization: '[USER_API_KEY]',
// 		AppAuthorization: '[YOUR_APP_KEY]',
// 		'Content-type': 'application/json',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'perfecttense.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://perfecttense.p.rapidapi.com/correct', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *IP Risk
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "iprisk1.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://iprisk1.p.rapidapi.com/getipinfo/json/8.8.8.8/96d2bec0111ae7fd557083b6e5f7be27",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *Joke

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'joke3.p.rapidapi.com'
// 	},
// 	body: '{"content":"A joke here","nsfw":"false"}'
// };

// fetch('https://joke3.p.rapidapi.com/v1/joke', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *Nexmo SMS Messaging

// const options = {
//   method: "POST",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "nexmo-nexmo-messaging-v1.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://nexmo-nexmo-messaging-v1.p.rapidapi.com/send-sms?from=%3CREQUIRED%3E&to=%3CREQUIRED%3E",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *Twilio Verify Phone Number
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "twilio-verify-phone-number.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://twilio-verify-phone-number.p.rapidapi.com/Services/%7Bsid%7D",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//* Telesign SMS Verify
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com'
// 	}
// };

// fetch('https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code?phoneNumber=%3CREQUIRED%3E&verifyCode=%3CREQUIRED%3E', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *Reach Interactive

// const options = {
//   method: "GET",
//   headers: {
//     password: "<REQUIRED>",
//     username: "<REQUIRED>",
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "reach-interactive.p.rapidapi.com",
//   },
// };

// fetch("https://reach-interactive.p.rapidapi.com/sms/balance", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *GoogleBooks

// const encodedParams = new URLSearchParams();
// encodedParams.append("volumeId", "<REQUIRED>");
// encodedParams.append("accessToken", "<REQUIRED>");
// encodedParams.append("shelfId", "<REQUIRED>");

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "GoogleBooksraygorodskijV1.p.rapidapi.com",
//   },
//   body: encodedParams,
// };

// fetch(
//   "https://googlebooksraygorodskijv1.p.rapidapi.com/addVolumeToBookshelf",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *Custom QR Code with Logo

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/json",
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "qrcode-monkey.p.rapidapi.com",
//   },
//   body: '{"key1":"value","key2":"value"}',
// };

// fetch("https://qrcode-monkey.p.rapidapi.com/qr/uploadImage", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *QRCode

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "pierre2106j-qrcode.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://pierre2106j-qrcode.p.rapidapi.com/api?type=text%20%7C%20url%20%7C%20tel%20%7C%20sms%20%7C%20email&text=string&ecl=L%20%7C%20M%7C%20Q%20%7C%20H&pixel=1%20to%2010&forecolor=000000&backcolor=ffffff",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *Dynamic QR Code with logo - Beaconstac
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		Authorization: 'undefined',
// 		'Content-Type': 'application/json',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'dynamic-qr-code-with-logo-beaconstac.p.rapidapi.com'
// 	},
// 	body: '{"name":"Static Colored QR Code","qr_type":1,"organization":"<YOUR_ORG_ID>","attributes":{"color":"#fb6e6e","margin":25},"fields_data":{"qr_type":1,"url":"https://www.example.com"}}'
// };

// fetch('https://dynamic-qr-code-with-logo-beaconstac.p.rapidapi.com/', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *AmazonML
// const encodedParams = new URLSearchParams();
// encodedParams.append("apiKey", "<REQUIRED>");
// encodedParams.append("resourceType", "<REQUIRED>");
// encodedParams.append("region", "<REQUIRED>");
// encodedParams.append("apiSecret", "<REQUIRED>");
// encodedParams.append("resourceId", "<REQUIRED>");
// encodedParams.append("tags[0]", "<REQUIRED>");

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "AmazonMLserg-osipchukV1.p.rapidapi.com",
//   },
//   body: encodedParams,
// };

// fetch("https://amazonmlserg-osipchukv1.p.rapidapi.com/addTags", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *Amazon Product/Reviews/Keywords
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "amazon-product-reviews-keywords.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=iphone&country=US&category=aps",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//* Pokemon Go

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "pokemon-go1.p.rapidapi.com",
//   },
// };

// fetch("https://pokemon-go1.p.rapidapi.com/type_effectiveness.json", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *Hearthstone

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
//   },
// };

// fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/info", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response));
// 	.catch(err => console.error(err));

// *FacebookGraphAPI

// const encodedParams = new URLSearchParams();
// encodedParams.append("profile_id", "<REQUIRED>");
// encodedParams.append("access_token", "<REQUIRED>");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '451a243984msha86c650fc60da00p12b693jsn87d28685c667',
// 		'X-RapidAPI-Host': 'FacebookGraphAPIserg-osipchukV1.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://facebookgraphapiserg-osipchukv1.p.rapidapi.com/getProfile', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// *facebook workplacegraph

// const encodedParams = new URLSearchParams();
// encodedParams.append("accessToken", "<REQUIRED>");
// encodedParams.append("name", "<REQUIRED>");
// encodedParams.append("description", "<REQUIRED>");
// encodedParams.append("communityId", "<REQUIRED>");

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "FacebookWorkplaceGraphzakutynskyV1.p.rapidapi.com",
//   },
//   body: encodedParams,
// };

// fetch(
//   "https://facebookworkplacegraphzakutynskyv1.p.rapidapi.com/addGroupToCommunity",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *^stream
// const encodedParams = new URLSearchParams();
// encodedParams.append("feedOwnerId", "<REQUIRED>");
// encodedParams.append("apiSecret", "<REQUIRED>");
// encodedParams.append("feedTargetId", "<REQUIRED>");
// encodedParams.append("apiKey", "<REQUIRED>");
// encodedParams.append("feedTargetType", "<REQUIRED>");
// encodedParams.append("feedOwnerType", "<REQUIRED>");

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "Streamvolodimir-kudriachenkoV1.p.rapidapi.com",
//   },
//   body: encodedParams,
// };

// fetch(
//   "https://streamvolodimir-kudriachenkov1.p.rapidapi.com/followFeed",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//* youtube search

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "youtube-search.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://youtube-search.p.rapidapi.com/search?key=AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc&part=snippet&q=cats",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *YTGrabber

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "ytgrabber.p.rapidapi.com",
//   },
// };

// fetch("https://ytgrabber.p.rapidapi.com/app/get/YfcYPyxXVCo", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *Deezer
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
//   },
// };

// fetch("https://deezerdevs-deezer.p.rapidapi.com/infos", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// *whois

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "whoisapi.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://whoisapi.p.rapidapi.com/whoisserver/WhoisService?domainname=whoisxmlapi.com&userName=undefined&password=undefined",
//   options
// )
//   .then((response) => response.text())
//   .then((response) => {
//     let parser = new DOMParser();
//     xmlDoc = parser.parseFromString(response, "text/xml");
//     console.log(xmlDoc);
//   })
//   .catch((err) => console.error(err));

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "451a243984msha86c650fc60da00p12b693jsn87d28685c667",
//     "X-RapidAPI-Host": "whoisapi.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://whoisapi.p.rapidapi.com/whoisserver/WhoisService?domainname=whoisxmlapi.com&userName=undefined&password=undefined",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
