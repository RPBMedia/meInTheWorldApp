import { getName } from 'country-list';

export const setErrors = (response) => {
  if(response.graphQLErrors) {
    return response.graphQLErrors.map(error => error.message);
  }
  return ['request failed. Unknown error'];
} 

export const compareByName = (a, b) => {
  if ( a.name.toLowerCase() < b.name.toLowerCase() ){
    return -1;
  }
  if ( a.name.toLowerCase() > b.name.toLowerCase() ){
    return 1;
  }
  return 0;
}

export const compareByNameReverse = (a, b) => {
  if ( a.name.toLowerCase() > b.name.toLowerCase() ){
    return -1;
  }
  if ( a.name.toLowerCase() < b.name.toLowerCase() ){
    return 1;
  }
  return 0;
}

export const compareByEmail = (a, b) => {
  if ( a.email.toLowerCase < b.email.toLowerCase ){
    return -1;
  }
  if ( a.email.toLowerCase > b.email.toLowerCase ){
    return 1;
  }
  return 0;
}

export const compareByEmailReverse = (a, b) => {
  if ( a.email.toLowerCase() > b.email.toLowerCase() ){
    return -1;
  }
  if ( a.email.toLowerCase() < b.email.toLowerCase() ){
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
  if ( a.countries.length < b.countries.length ){
    return -1;
  }
  if ( a.countries.length > b.countries.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserCountriesReverse = (a, b) => {
  if ( a.countries.length > b.countries.length ){
    return -1;
  }
  if ( a.countries.length < b.countries.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserLocations = (a, b) => {
  if ( a.locations.length < b.locations.length ){
    return -1;
  }
  if ( a.locations.length > b.locations.length ){
    return 1;
  }
  return 0;
}

export const compareByNumberOfUserLocationsReverse = (a, b) => {
  if ( a.locations.length > b.locations.length ){
    return -1;
  }
  if ( a.locations.length < b.locations.length ){
    return 1;
  }
  return 0;
}

export const compareByContinentName = (a, b) => {
  if ( a.continent.name.toLowerCase() < b.continent.name.toLowerCase() ){
    return -1;
  }
  if ( a.continent.name.toLowerCase() > b.continent.name.toLowerCase() ){
    return 1;
  }
  return 0;
}

export const compareByContinentNameReverse = (a, b) => {
  if ( a.continent.name.toLowerCase() > b.continent.name.toLowerCase() ){
    return -1;
  }
  if ( a.continent.name.toLowerCase() < b.continent.name.toLowerCase() ){
    return 1;
  }
  return 0;
}


export const compareByCountryName = (a, b) => {
  if ( a.country.name.toLowerCase() < b.country.name.toLowerCase() ){
    return -1;
  }
  if ( a.country.name.toLowerCase() > b.country.name.toLowerCase() ){
    return 1;
  }
  return 0;
}

export const compareByCountryNameReverse = (a, b) => {
  if ( a.country.name.toLowerCase() > b.country.name.toLowerCase() ){
    return -1;
  }
  if ( a.country.name.toLowerCase() < b.country.name.toLowerCase() ){
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

export const compareByArrayLength = (a, b) => {
  if ( a.number > b.number ){
    return -1;
  }
  if ( a.number < b.number ){
    return 1;
  }
  return 0;
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

export const getCountryName = (countryCode) => {
  switch (countryCode) {
      case 'BO':
        return 'Bolivia';
      case 'BO':
        return 'Bonaire';
      case 'CC':
        return 'Cocos Islands';
      case 'CD':
        return 'Democratic Republic of Congo';
      case 'IR':
        return 'Iran';
      case 'US':
        return 'United States of America';
      case 'VN':
        return 'Vietnam';
      case 'VE':
        return 'Venezuela';
      case 'RU':
        return 'Russia';
      case 'KR':
        return 'Republic of Korea';
      case 'KP':
        return 'Democratic People\'s Republic of Korea';
      case 'MK':
        return 'Former Yugoslav Republic of Macedonia';
      case 'FM':
        return 'Federated States of Micronesia';
      case 'MD':
        return 'Republic of Moldova';
      case 'PA':
        return 'Palestine';
      case 'TW':
        return 'Taiwan';
      case 'TZ':
        return 'Tanzania';
      case 'VG':
        return 'British Virgin Islands';
    default:
      return getName(countryCode);
  }
}

//To make sure all names match the argument expectation of getCode 
export const parseCountryName = (originalName) => {
  console.log('Original name: ', originalName);
  switch (originalName.toLowerCase()) {
    case 'united states of america':
    case 'USA':
    case 'US':  
      return 'United States';
    case 'laos':
      return 'Lao People\'s Democratic Republic';
    case 'vietnam':
      return 'Viet nam';
    case 'bolivia':
      return 'Bolivia, Plurinational State of';
    case 'venezuela':
      return 'Venezuela, Bolivarian Republic of';
    case 'russia':
      return 'Russian Federation';
    case 'republic of korea':
    case 'korea':
    case 'south korea':
      return 'Korea, Republic of';
    case 'north korea':
    case 'democratic people\'s republic of korea':
      return 'Korea, Democratic People\'s Republic of';
    case 'bonaire':
      return 'Bonaire, Sint Eustatius and Saba';
    case 'bosnia':
      return 'Bosnia and Herzegovina';
    case 'brunei':
      return 'Brunei Darussalam';
    case 'cocos islands':
      return 'Cocos (Keeling) Islands';
    case 'democratic republic of congo':
      return 'Congo, the Democratic Republic of the';
    case 'cote d\'ivoire':
      return 'Côte d\'Ivoire';
    case 'curacao':
      return 'Curaçao';
    case 'falkland islands':
      return 'Falkland Islands (Malvinas)';
    case 'guine bissau':
    case 'bissau':
      return 'Guinea-Bissau';
    case 'vatican':
    case 'the vatican':
      return 'Holy See (Vatican City State)';
    case 'iran':
      return 'Iran, Islamic Republic of';
    case 'macedonia':
    case 'former yugoslav republic of macedonia':
      return 'Macedonia, the Former Yugoslav Republic of';
    case 'micronesia':
    case 'federated states of micronesia':
      return 'Micronesia, Federated States of';
    case 'moldova':
    case 'republic of moldova':
      return 'Moldova, Republic of';
    case 'palestine':
    case 'state of palestine':
      return 'Palestine, State of';
    case 'pitcairn islands':
      return 'Pitcairn';
    case 'reunion':
      return 'Réunion';
    case 'saint helena':
    case 'ascension':
    case 'tristan da cunha':
      return 'Saint Helena, Ascension and Tristan da Cunha';
    case 'saint kitts':
      return 'Saint Kitts and Nevis';
    case 'st martin':
    case 'saint martin':
      return 'Saint Martin (French part)';
    case 'saint vincent and grenadines':
    case 'st vincent and grenadines':
      return 'Saint Vincent and the Grenadines';
    case 'sao tome & principe':
    case 'st tome and principe':
    case 'sao tome e principe':
    case 'sao tomé e príncipe':
    case 'sao tomé & príncipe':
      return 'Sao Tome and Principe';
    case 'kingdom of saudi arabia':
    case 'saudi':
      return 'Saudi Arabia'
    case 'saint maarten':
      return 'Sint Maarten (Dutch part)';
    case 'taiwan':
      return 'Taiwan, Province of China';
    case 'tanzania':
    case 'united republic of tanzania':
      return 'Tanzania, United Republic of';
    case 'east timor':
    case 'east-timor':
    case 'timor leste':
      return 'Timor-Leste';
    case 'trinidad & tobago':
      return 'Trinidad and Tobago';
    case 'turks and caicos islands':
      return 'Turks and Caicos Islands';
    case 'british virgin islands':
      return 'Virgin Islands, British';
    case 'wallis & fortuna':
    case 'wallis & futuna':
    case 'wallis and fortuna':
      return 'Wallis and Futuna';
    default:
      return originalName;
  }
}

export const isValidContinentName = (name) => {
  const continentNames = ['Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'Oceania',
    'North America',
    'South America'];
  return continentNames.includes(toTitleCase(name));
}

export const toTitleCase = (str) => {
  
  let splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
 
}