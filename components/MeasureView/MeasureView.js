import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import convert from 'convert-units';
import { SimpleLineIcons } from '@expo/vector-icons';

const MeasureView = ({ measure, value, setValue }) => {
  const units = convert().possibilities(measure);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1]);
  const [valueConverted, setValueConverted] = useState(0);

  useEffect(() => {
    setValueConverted(convert(+value).from(fromUnit).to(toUnit).toFixed(2))
  }, [value, fromUnit, toUnit])

  return (
    <View style={styles.scene}>

      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <Picker
          style={styles.column}
          selectedValue={fromUnit}
          onValueChange={setFromUnit} >
          {units.map((unit, index) => (
            <Picker.Item label={unit}
              value={unit}
              key={index}
            />
          ))}
        </Picker>
      </View>

      <SimpleLineIcons
        name='arrow-down-circle'
        size={40}
        color={'dodgerblue'}
        style={{ alignSelf: 'center'}}
      />


      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.output, { fontSize: 35, fontWeight: 'bold' }]}>{valueConverted}</Text>
        </View>

        <Picker
          style={styles.column}
          selectedValue={toUnit}
          onValueChange={setToUnit} >
          {units.map((unit, index) => (
            <Picker.Item label={unit}
              value={unit}
              key={index}
            />
          ))}
        </Picker>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    title: {
      padding: 15,
      fontWeight: 'bold',
      color: 'dodgerblue',
      fontSize: 20,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    column: {
      flex: 1,
      marginLeft: 20,
      marginRight: 20,
    },
    input: {
      height: 40,
      borderColor: 'dodgerblue',
      borderBottomWidth: 1,
      fontSize: 30,
      textAlign: 'center',
    },
    output: {
      height: 40,
      textAlign: 'center',
    }
  });

export default MeasureView;