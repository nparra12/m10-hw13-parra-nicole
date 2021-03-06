// capture references to important DOM elements
var weatherContainer = document.getElementById('weather');
var formEl = document.querySelector('form');
var inputEl = document.querySelector('input');


formEl.onsubmit = function(e) {
  // prevent the page from refreshing
  e.preventDefault();

  // capture user's input from form field
  var userInput = inputEl.value.trim()
  // abort API call if user entered no value
  if (!userInput) return
  // call the API and then update the page
  getWeather(userInput)
    .then(displayWeatherInfo)
    .catch(displayLocNotFound)

  // reset form field to a blank state
  inputEl.value = ""
}



// calls the OpenWeather API and returns an object of weather info
function getWeather(query) {
  // default search to USA
  if (!query.includes(",")) query += ',us'
  // return the fetch call which returns a promise
  // allows us to call .then on this function
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=6efff70fe1477748e31c17d1c504635f`
  )
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      // location not found, throw error/reject promise
      if (data.cod === "404") throw new Error('location not found')


      // create weather icon URL
      //Convert some object-related code to use ES6 destructuring.
      const {name} = data
      const {icon,description} = data.weather[0]
      const {feels_like} = data.main
      const actualTemp = data.main.temp
      const iconUrl = 'https://openweathermap.org/img/wn/' + icon +'@2x.png'
      const place = name + ", " + data.sys.country
      const updatedAt = new Date(data.dt * 1000)


      // create JS date object from Unix timestamp
      //var updatedAt = new Date(data.dt * 1000)
      // this object is used by displayWeatherInfo to update the HTML
      return {
        coords: data.coord.lat + ',' + data.coord.lon,
        description: description,
        iconUrl: iconUrl,
        actualTemp: actualTemp,
        feelsLikeTemp: feels_like,
        place: place,
        updatedAt: updatedAt
      }
    })
}



// show error message when location isn't found

//function displayLocNotFound() {
  // clears any previous weather info
  //weatherContainer.innerHTML = "";
  // create h2, add error msg, and add to page
  //var errMsg = document.createElement('h2')
  //errMsg.textContent = "Location not found"
  //weatherContainer.appendChild(errMsg)
//}//

//Convert a promise-based function (a function call with `.then`) to instead use `async/await`.
async function displayLocNotFound() {
  try{
     // clears any previous weather info
  weatherContainer.innerHTML = "";
  // create h2, add error msg, and add to page
  const errMsg = await document.createElement('h2')
  errMsg.textContent = "Location not found"
  weatherContainer.appendChild(errMsg)
  }catch(err){}
}

// updates HTML to display weather info
function displayWeatherInfo(weatherObj) {
  // clears any previous weather info
  weatherContainer.innerHTML = "";

  // inserts a linebreak <br> to weather section tag
  //function addBreak() {
    //weatherContainer.appendChild(
     // document.createElement('br')
    //)
 // }

 //Convert a `function` declaration into a arrow function.
const addBreak = () =>{
  weatherContainer.appendChild(
     document.createElement('br')
  )}


  // weather location element
  var placeName = document.createElement('h2')
  placeName.textContent = weatherObj.place
  weatherContainer.appendChild(placeName)



  // map link element based on lat/long
  var whereLink = document.createElement('a')
  whereLink.textContent = "Click to view map"
  whereLink.href = "https://www.google.com/maps/search/?api=1&query=" + weatherObj.coords
  whereLink.target = "__BLANK"
  weatherContainer.appendChild(whereLink)

  // weather icon img
  //var icon = document.createElement('img')
  //icon.src = weatherObj.iconUrl
  //weatherContainer.appendChild(icon)

  // !! Convert a `var` declaration to `const`
  const icon = document.createElement(`img`)
  icon.src = weatherObj.iconUrl
  weatherContainer.appendChild(icon)

  // weather description
  var description = document.createElement('p')
  description.textContent = weatherObj.description
  description.style.textTransform = 'capitalize'
  weatherContainer.appendChild(description)

  addBreak()

  // current temperature
  //var temp = document.createElement('p')
  //temp.textContent = "Current: " +
    //weatherObj.actualTemp +
    //"?? F"
  //weatherContainer.appendChild(temp)

  //Convert a string concatenation to instead use template literals and string interpolation.
  const temp = document.createElement('p')
  temp.textContent = `Current: ${weatherObj.actualTemp}?? F`
  weatherContainer.appendChild(temp)

  // "feels like" temperature
  //var feelsLikeTemp = document.createElement('p')
  //feelsLikeTemp.textContent = "Feels like: " +
    //weatherObj.feelsLikeTemp +
   // "?? F"
  //weatherContainer.appendChild(feelsLikeTemp)

  const feelsLikeTemp = document.createElement('p')
  feelsLikeTemp.textContent = `Feels like: ${weatherObj.feelsLikeTemp}?? F`
  weatherContainer.appendChild(feelsLikeTemp)

  addBreak()

  // time weather was last updated
  var updatedAt = document.createElement('p')
  updatedAt.textContent = "Last updated: " +
    weatherObj.updatedAt.toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit'
        }
    )
  weatherContainer.appendChild(updatedAt)

}
