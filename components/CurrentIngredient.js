// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchIngredients } from '../store/nutrition';
// import { StyleSheet, Text, View } from 'react-native';

// class CurrentIngredient extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   render() {
//     let {ing} = this.props

//     return (
//       <View>
//         <Text style={styles.name}>{ing[0].}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   name: {
//     fontSize: 50
//   }
// })

// const mapStateToProps = state => ({
//   ingredients: state.ingredients,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchIngredientsDispatch: () => dispatch(fetchIngredients()),
// });

// const ConnectedCurrentIng = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CurrentIngredient);
// export default ConnectedCurrentIng;
