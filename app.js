const searchButton = document.getElementById("searchButton");
const removeButton = document.getElementById("clearButton");
const searchInput = document.getElementById("searchTerm");
const APIKEY = "IHIrZ0pUTcBRU7BACRccJI4yU5WfA3BV";
const gifContainer = document.getElementById("gifContainer");
const header = document.getElementById("header");

searchButton.addEventListener("click", handleSearch);
removeButton.addEventListener("click", handleRemove);

//request data from api and pass url for image to addImage
async function handleSearch(ev) {
  if (
    header.innerText === "Please Enter A Search Term" ||
    header.innerText === "Error: Please Try Again Later"
  ) {
    header.innerText = "Giphy Party!";
  }

  try {
    const searchText = searchInput.value;
    const giphyURL = `http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${APIKEY}&limit=50`;
    const res = await axios.get(giphyURL);
    const imageSelectionNum = Math.floor(Math.random() * 50);
    addImage(res.data.data[imageSelectionNum].images.original.url);
  } catch (error) {
    if (searchInput.value.length === 0) {
      header.innerText = "Please Enter A Search Term";
    } else {
      header.innerText = "Error: Please Try Again Later";
    }
  }
}

//remove all images from gifContainer
function handleRemove(e) {
  while (gifContainer.firstChild) {
    gifContainer.removeChild(gifContainer.firstChild);
  }
}

//append image to gifContainer element
function addImage(imageURL) {
  const imageDiv = document
    .createElement("div")
    .appendChild(document.createElement("img"));
  imageDiv.setAttribute("src", `${imageURL}`);
  gifContainer.appendChild(imageDiv);
}
