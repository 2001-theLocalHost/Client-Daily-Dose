import nutritionKey from './nutritionKey.json';

export const routes = arr => {
  let final = [];
  let temp = [];
  let innerObj = {};

  innerObj['key'] = arr[0];
  innerObj['title'] = arr[0];

  temp.push(innerObj);

  if (arr.length === 1) {
    return temp;
  } else {
    let result = routes(arr.slice(1));
    final = [...temp, ...result];
  }
  return final;
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
      return (dishObject[ele] = nutritionData.totalNutrients[
        ele
      ].quantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'g') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity * 1000;
      return (dishObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'µg') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 1000;
      return (dishObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'IU') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 40 / 1000;
      return (dishObject[ele] = newQuantity.toFixed(4));
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
      return (ingrObject[ele] = nutritionData.totalNutrients[
        ele
      ].quantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'g') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity * 1000;
      return (ingrObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'µg') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 1000;
      return (ingrObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'IU') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 40 / 1000;
      return (ingrObject[ele] = newQuantity.toFixed(4));
    } else {
      return;
    }
  });

  return ingrObject;
};

export const capitalize = str => {
  let name = str.split(' ');

  let capitalizedName = name.map(el => {
    return el[0].toUpperCase() + el.slice(1);
  });
  return capitalizedName.join(' ');
};

export const arraysOfData = (currentDish, goal) => {
  let finalArr = [];
  let dishNutQuant = [];
  let dishNutLabel = [];
  let diffNutQuant = [];

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
      label !== 'name'
    ) {
      dishNutLabel.push(label);
      dishNutQuant.push(currentQuant);
      diffNutQuant.push(goalQuant - currentQuant);
    }
  }

  finalArr.push(dishNutLabel, dishNutQuant, diffNutQuant);

  return finalArr;
};

export const finalData = (label, quant, diff) => {
  let final = [];
  let temp = [];
  let innerObj = {};

  innerObj[label[0]] = quant[0];
  innerObj['current'] = quant[0];
  innerObj['diff'] = diff[0];
  temp.push(innerObj);

  if (label.length === 1) {
    return temp;
  } else {
    let result = this.finalData(label.slice(1), quant.slice(1), diff.slice(1));
    final = [...temp, ...result];
  }
  return final;
};

export const startData = (label, quant, diff) => {
  let final = [];
  let temp = [];
  let innerObj = {};

  innerObj[label[0]] = 0;
  innerObj['current'] = 0;
  innerObj['diff'] = 0;
  temp.push(innerObj);

  if (label.length === 1) {
    return temp;
  } else {
    let result = this.startData(label.slice(1), quant.slice(1), diff.slice(1));
    final = [...temp, ...result];
  }
  return final;
};
