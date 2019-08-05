const {send} = require('micro')
const url = require('url')
const fetch = require('node-fetch')
const coordinates = require('./data/coordinates.js')
const darkSkyKey = require('./config.js')

module.exports = async (request, response) => {

  function setCoords() {
    const getUrl = url.parse(request.url)
    const pathname = getUrl.path.replace('/', '')

    for (country in coordinates) {
      if(country === pathname) {
        return coordinates[country]
      }
    }
  }

  function getData(latLong) {
    fetch(`https://api.darksky.net/forecast/${darkSkyKey}/${latLong}?exclude=currently,minutely,hourly,alerts,flags`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then((data) => {
        console.log(data.daily.data[2])
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async function displayData() {
    const latLong = await setCoords()

    if (latLong === undefined) {
      console.log('No weather information, sorry!')
    } else {
      getData(latLong)
    }
  }

  send(response, 200, displayData())
}