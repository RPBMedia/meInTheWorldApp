export const compareByName = (a, b) => {
  console.log('non-reverse');
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

export const compareByNameReverse = (a, b) => {
  console.log('reverse');
  if ( a.name > b.name ){
    return -1;
  }
  if ( a.name < b.name ){
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