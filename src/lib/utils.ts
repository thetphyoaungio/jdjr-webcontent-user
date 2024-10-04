import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
    //"; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
  //name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name: string) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function checkOrCreateUUID() {
  let uuid = getCookie("device_id_cookie");
  //console.log('got uuid >> ', uuid)

  if (!uuid) {
    uuid = generateUUID();
    setCookie("device_id_cookie", uuid, 365);
  }
  return uuid;
}

export function getDeviceType() {
  const userAgent = navigator.userAgent;

  if (/Android/i.test(userAgent)) {
    return "Android";
  } else if (/iPhone/i.test(userAgent)) {
    return "iPhone";
  } else if (/Tablet/i.test(userAgent)) {
    return "Tablet";
  } else if (/iPad/i.test(userAgent)) {
    return "iPad";
  } else {
    return "Desktop";
  }

  /* if (/Mobi|Android|iPhone/i.test(userAgent)) {
      return "Mobile";
  } else if (/Tablet|iPad/i.test(userAgent)) {
      return "Tablet";
  } else {
      return "Desktop";
  } */

  /* if(/Mobi/i.test(userAgent)) {
    return "Mobile";
  } */
  /* else */ 
  
}

function success(position: any) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

  // Call the reverse geocoding function here
  return reverseGeocode(latitude, longitude);
}

function error() {
  console.log("Unable to retrieve your location.");
}

function reverseGeocode(latitude: number, longitude: number) {
  const url = '';
  //`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log('got data > ', data);

      return JSON.stringify({
        Latitude: latitude,
        Longitude: longitude,
        address: data?.address || null,
      });
    })
    .catch((error) => console.error("Error:", error));
}

export function getUserGeolocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// 2024-01-12T06:55:52.693Z
export function getMyDateTime12(dateString: string) {
  const tmp = dateString.split("-");
  //[0] => "2024"
  //[1] => "01"
  //[2] => "12T06:55:52.693Z"
  let year$ = +tmp[0];
  let month$ = +tmp[1] - 1;

  const tmp1 = tmp[2].split("T");
  //[0] => "12"
  //[1] => "06:55:52.693Z"
  let day$ = +tmp1[0];

  const tmp2 = tmp1[1].split(":");
  //[0] => "06"
  //[1] => "55"
  //[2] => "52.693Z"
  let hr$ = +tmp2[0];
  let min$ = +tmp2[1];

  return new Date(year$, month$, day$, hr$, min$, 0);
}

export function extractTextFromHtml(htmlString: string): string {
  return htmlString.replace(/<[^>]*>?/gm, "").trim();
}
