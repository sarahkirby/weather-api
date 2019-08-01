const { send } = require('micro')
const url = require('url')

const coordinates = {
  GB: '55.3781,3.4360',
  US: '37.0902,95.7129',
  FR: '46.2276,2.2137',
  DE: '51.1657,10.4515',
  BE: '50.5039,4.4699',
  IT: '41.8719,12.5674',
  HR: '45.1000,15.2000',
  GR: '39.0742,21.8243',
  SI: '46.1512,14.9955',
  CZ: '49.8175,15.4730',
  HU: '47.1625,19.5033',
  AT: '47.5162,14.5501',
  LU: '49.8153,6.1296',
  FI: '61.9241,25.7482',
  IE: '53.1424,7.6921',
  DK: '56.2639,9.5018',
  PT: '39.3999,8.2245',
  NL: '52.1326,5.2913',
  NO: '60.4720,8.4689',
  ES: '40.4637,3.7492',
  SE: '60.1282,18.6435',
  CH: '46.8182,8.2275',
}

module.exports = async (request, response) => {
  const getUrl = url.parse(request.url)
  const pathname = getUrl.path.replace('/', '')
  const latLong = setCoords(pathname)

  function setCoords(pathname) {
    for (country in coordinates) {
      if(country === pathname) {
        return coordinates[country]
      }
    }
  }
  send(response, 200, latLong)
}