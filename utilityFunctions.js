// ['1 oz rice', '2 cup green apple', 'green apple rice']

// 1 µg = 0.001 mg

// From IU to mcg: IU/40 = mcg

// let userData = [‘1 cup kale’, ‘1 oz rice cake’, ‘1 g hot ramen cake’, ‘kale rice salad’]

// let justIngredients = userData.slice(0, userData.length - 1)

// function oneIngredient (arr) {
//   let newArr = []
//   for (let i = 0; i < arr.length; i++) {
//     let el = arr[i]
//     let cup = el.indexOf(‘cup’)
//     let oz = el.indexOf(‘oz’)
//     let g = el.indexOf(‘g’)
//     if (el.indexOf(‘cup’) !== -1) {
//      let ingredient = el.slice(cup + 4, el.length)
//       newArr.push([ingredient])
//     }
//     if (el.indexOf(‘oz’) !== -1) {
//       let ingredient = el.slice(oz + 3, el.length)
//       newArr.push([ingredient])
//     }
//     if (el.indexOf(‘g’) !== -1) {
//       let ingredient = el.slice(g + 2, el.length)
//       newArr.push([ingredient])
//     }
//   }
//   return newArr
// }

// let oneIngredientsArr = (oneIngredient(justIngredients))
// //routes: [{key: ‘dish’, title: ‘dish’}, {key: ‘dish’, title: ‘dish’}]
// function routes (arr) {
//   let final = []
//   let temp = []
//   let innerObj = {}
//   innerObj[‘key’] = arr[0][0]
//   innerObj[‘title’] = arr[0][0]
//   temp.push(innerObj)
//   if (arr.length === 1) {
//     temp.push({key: ‘dish’, title: ‘dish’})
//     return temp
//   } else {
//      let result = routes(arr.slice(1))
//      final = [...temp, ...result]
//   }
//   return final
// }


export const cleanStr = (dietLabelArr, healthLabelsArr) => {
  let newArr = [...dietLabelArr, ...healthLabelsArr];
  let tempArr = newArr.map((el) => {
    return el.split('_').join(' ');
  })
  return tempArr.join(', ');
}

export const convertData =  (dishName, dishUrl, nutritionData) => {
  let dishObject = {}

  dishObject.name = dishName
  dishObject.imgUrl = dishUrl
  dishObject.healthLabels = cleanStr(nutritionData.dietLabels, nutritionData.healthLabels)
  dishObject.carbKCAL =  nutritionData.totalNutrientsKCal.CHOCDF_KCAL.quantity
  dishObject.fatKCAL =  nutritionData.totalNutrientsKCal.FAT_KCAL.quantity
  dishObject.proteinKCAL =  nutritionData.totalNutrientsKCal.PROCNT_KCAL.quantity
  dishObject.calories = nutritionData.calories

  let totalNutrientKeys = Object.keys(nutritionData.totalNutrients)
  totalNutrientKeys.map(ele => {
    if (nutritionData.totalNutrients[ele].unit === 'mg') {
      return dishObject[ele] = nutritionData.totalNutrients[ele].quantity.toFixed(4)
    } else if (nutritionData.totalNutrients[ele].unit === 'g') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity * 1000
      return dishObject[ele] = newQuantity.toFixed(4)
    } else if (nutritionData.totalNutrients[ele].unit === 'µg') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 1000
      return dishObject[ele] = newQuantity.toFixed(4)
    } else if (nutritionData.totalNutrients[ele].unit === 'IU') {
      let newQuantity = (nutritionData.totalNutrients[ele].quantity / 40 ) / 1000
      return dishObject[ele] = newQuantity.toFixed(4)
    } else {
      return
    }

  })

  return dishObject;
}


