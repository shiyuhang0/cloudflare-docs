import sparrow from '@cloudflare/util-sparrow';

// testing with hard-keyed values

const userId = "c5f71bb97fb2f00b17f20a5d97860fda"
const deviceId = "f76bd726-b493-49d3-bb98-9348747821cf"

// These keys are fine to be exposed publicly 
const stagingKey = "f2c3f386e64d4e89bcbe32f273aa83eb"
const productionKey = "ab1cea39a1d94652aa2a2ce1f42275ae"
let keyToUse;

// Based on current environment, send events to the correct location
const hostname = window.location.hostname

/* if (hostname === "developers.cloudflare.com") {
  keyToUse = productionKey;
} else {
  keyToUse = stagingKey
} */

declare const SPARROW_SOURCE_KEY: string;
const SPARROW_URL = "https://sparrow.cloudflare.com";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export function init() {

sparrow.init({
    sourceKey: productionKey
});

sparrow.setUserId(userId);

sparrow.identify({
  deviceId: deviceId,
	userId: userId
});

sparrow.sendEvent("documentation pageview", {
    page: window.location.pathname,
  });

  console.log(getCookie("sparrow_id"));

}