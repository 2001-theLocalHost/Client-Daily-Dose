import nutritionKey from './nutritionKey.json';

export const routes = arr => {
  let newRoutes = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = {
      title: arr[i],
      key: arr[i],
    };
    newRoutes.push(obj);
  }
  return newRoutes;
};

export const urlEncoded = arr => {
  if (Array.isArray(arr)) {
    let stringify = arr.join(',').replace(',', ' and ');
    return stringify;
  } else {
    return arr.split(' ').join('%20');
  }
};

export const cleanStr = (dietLabelArr, healthLabelsArr) => {
  let newArr = [...dietLabelArr, ...healthLabelsArr];
  let tempArr = newArr.map(el => {
    return el.split('_').join(' ');
  });
  return tempArr;
};

export const convertData = (dishName, dishUrl, nutritionData) => {
  let dishObject = {};

  dishObject.name = dishName;
  dishObject.imgUrl = dishUrl;
  dishObject.healthLabels = cleanStr(
    nutritionData.dietLabels,
    nutritionData.healthLabels
  );
  dishObject.CHOCDF_KCAL =
    nutritionData.totalNutrientsKCal.CHOCDF_KCAL.quantity;
  dishObject.FAT_KCAL = nutritionData.totalNutrientsKCal.FAT_KCAL.quantity;
  dishObject.PROCNT_KCAL =
    nutritionData.totalNutrientsKCal.PROCNT_KCAL.quantity;
  dishObject.calories = nutritionData.calories;

  let totalNutrientKeys = Object.keys(nutritionData.totalNutrients);
  totalNutrientKeys.map(ele => {
    if (nutritionData.totalNutrients[ele].unit === 'mg') {
      return (dishObject[ele] = parseFloat(
        nutritionData.totalNutrients[ele].quantity.toFixed(4)
      ));
    } else if (nutritionData.totalNutrients[ele].unit === 'g') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity * 1000;
      return (dishObject[ele] = parseFloat(newQuantity.toFixed(4)));
    } else if (nutritionData.totalNutrients[ele].unit === 'µg') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 1000;
      return (dishObject[ele] = parseFloat(newQuantity.toFixed(4)));
    } else if (nutritionData.totalNutrients[ele].unit === 'IU') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 40 / 1000;
      return (dishObject[ele] = parseFloat(newQuantity.toFixed(4)));
    } else {
      return;
    }
  });

  for (let key in nutritionKey) {
    if (!dishObject[key]) {
      dishObject[key] = 0;
    }
  }

  return dishObject;
};

export const ingrNameFunc = finalIngrArr => {
  return finalIngrArr.map(eachIngrObj => {
    return eachIngrObj.name; // ['rice', 'rice cake']
  });
};

export const portionQuantFunc = finalIngrArr => {
  return finalIngrArr.map(eachIngrObj => {
    return `${eachIngrObj.quantity} ${eachIngrObj.measurement}`; // ['1 cup', '1 oz']
  });
};

export const convertIngrData = (ingrName, portionQuant, nutritionData) => {
  let ingrObject = {};

  ingrObject.ingredientName = ingrName; // 'rice cake'
  ingrObject.portionSize = portionQuant; // '1 oz'
  ingrObject.healthLabels = cleanStr(
    nutritionData.dietLabels,
    nutritionData.healthLabels
  );
  ingrObject.CHOCDF_KCAL =
    nutritionData.totalNutrientsKCal.CHOCDF_KCAL.quantity;
  ingrObject.FAT_KCAL = nutritionData.totalNutrientsKCal.FAT_KCAL.quantity;
  ingrObject.PROCNT_KCAL =
    nutritionData.totalNutrientsKCal.PROCNT_KCAL.quantity;
  ingrObject.calories = nutritionData.calories;

  let totalNutrientKeys = Object.keys(nutritionData.totalNutrients);
  totalNutrientKeys.map(ele => {
    if (nutritionData.totalNutrients[ele].unit === 'mg') {
      return (ingrObject[ele] = parseFloat(
        nutritionData.totalNutrients[ele].quantity.toFixed(4)
      ));
    } else if (nutritionData.totalNutrients[ele].unit === 'g') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity * 1000;
      return (ingrObject[ele] = parseFloat(newQuantity.toFixed(4)));
    } else if (nutritionData.totalNutrients[ele].unit === 'µg') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 1000;
      return (ingrObject[ele] = parseFloat(newQuantity.toFixed(4)));
    } else if (nutritionData.totalNutrients[ele].unit === 'IU') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 40 / 1000;
      return (ingrObject[ele] = parseFloat(newQuantity.toFixed(4)));
    } else {
      return;
    }
  });

  for (let key in nutritionKey) {
    if (!ingrObject[key]) {
      ingrObject[key] = 0;
    }
  }

  return ingrObject;
};

export const capitalize = str => {
  let name = str.split(' ');

  let capitalizedName = name.map(el => {
    return el[0].toUpperCase() + el.slice(1);
  });
  return capitalizedName.join(' ');
};


export const dataForStackGraph = (currentDish, goal) => {
  let finalArr = [];
  for (let label in currentDish) {
    let goalQuant = goal[label];
    let currentQuant = currentDish[label];
    if (
      label !== 'CHOCDF_KCAL' &&
      label !== 'PROCNT_KCAL' &&
      label !== 'FAT_KCAL' &&
      label !== 'calories' &&
      label !== 'healthLabels' &&
      label !== 'ingredientName' &&
      label !== 'portionSize' &&
      label !== 'name' &&
      label !== 'imgUrl'
    ) {
      let obj = {};
      obj[label] = currentQuant;
      obj[`diff${label}`] = goalQuant - currentQuant;
      finalArr.push(obj);
    }
  }
  return finalArr;
};

export const finalData = (currentDish, goal) => {
  let finalArr = [];

  for (let label in currentDish) {
    let goalQuant = goal[label];
    let currentQuant = currentDish[label];

    if (
      label !== 'CHOCDF_KCAL' &&
      label !== 'PROCNT_KCAL' &&
      label !== 'ENERC_KCAL' &&
      label !== 'FAT_KCAL' &&
      label !== 'calories' &&
      label !== 'healthLabels' &&
      label !== 'ingredientName' &&
      label !== 'portionSize' &&
      label !== 'name' &&
      label !== 'imgUrl'
    ) {
      let obj = {};
      obj[label] = currentQuant;
      obj['current'] = currentQuant;
      obj['diff'] = goalQuant - currentQuant;
      finalArr.push(obj);
    }
  }

  return finalArr;
};

export const startData = (currentDish, goal) => {
  let finalArr = [];

  for (let label in currentDish) {
    let goalQuant = goal[label];
    let currentQuant = currentDish[label];

    if (
      label !== 'CHOCDF_KCAL' &&
      label !== 'PROCNT_KCAL' &&
      label !== 'ENERC_KCAL' &&
      label !== 'FAT_KCAL' &&
      label !== 'calories' &&
      label !== 'healthLabels' &&
      label !== 'ingredientName' &&
      label !== 'portionSize' &&
      label !== 'name' &&
      label !== 'imgUrl'
    ) {
      let obj = {};
      obj[label] = currentQuant;
      obj['current'] = currentQuant;
      obj['diff'] = goalQuant - currentQuant;
      finalArr.push(obj);
    }
  }
  return finalArr;
};

export const saveDishValues = (original, updated) => {
  for (let key in updated) {
    if (updated[key] !== original[key]) {
      original[key] = updated[key];
    }
    if (!original[key]) {
      original[key] = updated[key];
    }
  }
};
