import { getName } from 'country-list';

export const compareByName = (a, b) => {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

export const compareByNameReverse = (a, b) => {
  if ( a.name > b.name ){
    return -1;
  }
  if ( a.name < b.name ){
    return 1;
  }
  return 0;
}

export const compareByEmail = (a, b) => {
  if ( a.email < b.email ){
    return -1;
  }
  if ( a.email > b.email ){
    return 1;
  }
  return 0;
}

export const compareByEmailReverse = (a, b) => {
  if ( a.email > b.email ){
    return -1;
  }
  if ( a.email < b.email ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserContinents = (a, b) => {
  if ( a.continents.length < b.continents.length ){
    return -1;
  }
  if ( a.continents.length > b.continents.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserContinentsReverse = (a, b) => {
  if ( a.continents.length > b.continents.length ){
    return -1;
  }
  if ( a.continents.length < b.continents.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserCountries = (a, b) => {
  if ( a.continents.length < b.continents.length ){
    return -1;
  }
  if ( a.continents.length > b.continents.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserCountriesReverse = (a, b) => {
  if ( a.continents.length > b.continents.length ){
    return -1;
  }
  if ( a.continents.length < b.continents.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserLocations = (a, b) => {
  if ( a.continents.length < b.continents.length ){
    return -1;
  }
  if ( a.continents.length > b.continents.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserLocationsReverse = (a, b) => {
  if ( a.continents.length > b.continents.length ){
    return -1;
  }
  if ( a.continents.length < b.continents.length ){
    return 1;
  }
  return 0;
}

export const compareByContinentName = (a, b) => {
  if ( a.continent.name < b.continent.name ){
    return -1;
  }
  if ( a.continent.name > b.continent.name ){
    return 1;
  }
  return 0;
}

export const compareByContinentNameReverse = (a, b) => {
  if ( a.continent.name > b.continent.name ){
    return -1;
  }
  if ( a.continent.name < b.continent.name ){
    return 1;
  }
  return 0;
}


export const compareByCountryName = (a, b) => {
  if ( a.country.name < b.country.name ){
    return -1;
  }
  if ( a.country.name > b.country.name ){
    return 1;
  }
  return 0;
}

export const compareByCountryNameReverse = (a, b) => {
  if ( a.country.name > b.country.name ){
    return -1;
  }
  if ( a.country.name < b.country.name ){
    return 1;
  }
  return 0;
}

export const compareByYearVisited = (a, b) => {
  if ( a.yearVisited < b.yearVisited ){
    return -1;
  }
  if ( a.yearVisited > b.yearVisited ){
    return 1;
  }
  return 0;
}

export const compareByYearVisitedReverse = (a, b) => {
  if ( a.yearVisited > b.yearVisited ){
    return -1;
  }
  if ( a.yearVisited < b.yearVisited ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfContinents = (a, b) => {
  if ( a.numberOfContinents > b.numberOfContinents ){
    return -1;
  }
  if ( a.numberOfContinents < b.numberOfContinents ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfCountries = (a, b) => {
  if ( a.numberOfCountries > b.numberOfCountries ){
    return -1;
  }
  if ( a.numberOfCountries < b.numberOfCountries ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfLocations = (a, b) => {
  if ( a.numberOfLocations > b.numberOfLocations ){
    return -1;
  }
  if ( a.numberOfLocations < b.numberOfLocations ){
    return 1;
  }
  return 0;
}

export const compareByArrayLength = (a, b) => {
  if ( a.number > b.number ){
    return -1;
  }
  if ( a.number < b.number ){
    return 1;
  }
  return 0;
}

export const getCountryName = (countryCode) => {
  switch (countryCode) {
    case 'BO':
      return 'Bolivia';
    default:
      return getName(countryCode);
  }
}

export const renderButtonClassesByStringProperty = (stringProperty) => {
  if(stringProperty.trim().length === 0) {
    return 'btn disabled';
  }
  return 'btn';
}

export const renderButtonClassesByProperties = (properties) => {
  let result = 'btn';
  properties.forEach(prop => {
    if(prop === null || (prop.trim && prop.trim().length === 0)){
      result = 'btn disabled';
    }
  })
  
  return result;
}