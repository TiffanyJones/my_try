const main = document.querySelector("main");
const apodEl = document.querySelector(".apod");
const errorMsg = document.querySelector(".error-msg");
const dateInput = document.querySelector("#date-input");
const dateInput2 = document.querySelector("#date-input2");

const submitButton2 = document.querySelector("#submit-button2");
const roverList = document.querySelector(".rover-list");
const submitButton = document.querySelector("#submit-button");

const apiKey = "ShEB5biaOhzZvSSF3A9Xc5BZY22BbOhh1FQeB3YQ";

async function fetchData(url, handleData) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log({ data });
    handleData(data);
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "Something has gone wrong:" + error;
  }
}
function handleApodData(data) {
  apodEl.innerHTML = "";
  if (!data.url) {
    apodEl.innerHTML =
      "<li>No photos were taken on this date. Please select another date.</li>";
  } else {
    const html = `
          <img src="${data.url}" alt="apod">
          <p>${data.title}</p>
        `;
    apodEl.insertAdjacentHTML("beforeend", html);
  }
}
submitButton2.addEventListener("click", function () {
  const date = dateInput.value;
  const apodURL = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

  fetchData(apodURL, handleApodData);
});

function handleRoverData(data) {
  roverList.innerHTML = "";
  if (!data.photos.length) {
    roverList.innerHTML =
      "<li>No photos were taken on this date. Please select another date.</li>";
  } else {
    const photos = data.photos
      .map(photo => `<li><img src="${photo.img_src}" alt="Rover photo"></li>`)
      .join("");
    roverList.insertAdjacentHTML("beforeend", photos);
  }
}

submitButton.addEventListener("click", function () {
  roverList.innerHTML = "Loading...";
  const date = dateInput2.value
  const roverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`;

fetchData(roverURL, handleRoverData);
});
