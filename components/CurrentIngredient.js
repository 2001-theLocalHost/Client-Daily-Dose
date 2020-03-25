import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SaveDish from './SaveDish';
import AnimatedPie from './Graph-Pieces/AnimatedPie';
import AnimatedPieLabel from './Graph-Pieces/AnimatedPieLabel';

export default class CurrentIngredient extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
    this.onSave = this.onSave.bind(this);
  }
  onSave() {
    this.setState({
      modalOpen: false,
    });
    console.log('HELLO I SUBMITTED');
    // this.props.createDish(this.props.dishNut, values)
    // redirect to mealDiary)
  }

  render() {
    const { ingrNut } = this.props;
    return (
      <View>
        {/* <SaveDish modalOpen={this.state.modalOpen} onSave={this.onSave} />
        <Button
          title="Save Meal"
          onPress={() => {
            this.setState({ modalOpen: true });
          }}
        /> */}
        <View>
          <Text style={styles.name}>{ingrNut.ingredientName}</Text>
          <Text style={styles.ingredients}>
            Portion Size: {ingrNut.portionSize}
          </Text>
          {ingrNut.healthLabels ? (
            <View>
              <Text style={styles.title}>Health Labels:</Text>
              <Text>{ingrNut.healthLabels}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.graph}>
          <Text style={styles.title}>TOTAL CALORIES BREAKDOWN:</Text>
          <Text style={styles.title}>{ingrNut.calories}KCAL</Text>
          <View>
            <AnimatedPie
                carbs={ingrNut.CHOCDF_KCAL > 0 ? ingrNut.CHOCDF_KCAL : 0.1}
                fat={ingrNut.FAT_KCAL > 0 ? ingrNut.FAT_KCAL : 0.1}
                protein={ingrNut.PROCNT_KCAL > 0 ? ingrNut.PROCNT_KCAL : 0.11}
            />
            <AnimatedPieLabel
              carbs={ingrNut.CHOCDF_KCAL}
              fat={ingrNut.FAT_KCAL}
              protein={ingrNut.PROCNT_KCAL}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  ingredients: {
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
  donutGraph: {
    width: 90,
    height: 90,
  },
  barGraph: {
    width: 100,
    height: 200,
  },
});
