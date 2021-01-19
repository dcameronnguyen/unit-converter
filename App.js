import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Picker } from '@react-native-community/picker';
import convert from 'convert-units';
import Constants from 'expo-constants';

const measures = convert().measures();

const MeasureView = ({ measure }) => {
  const units = convert().possibilities(measure);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [value, setValue] = useState('0');

  return (
    <View style={styles.scene}>
      <View style={styles.row}>
        <Picker
          style={styles.column}
          selectedValue={fromUnit}
          onValueChange={setFromUnit}
        >
          {units.map((unit, index) => (
            <Picker.Item label={unit}
              value={unit}
              key={index}
            />
          ))}
        </Picker>
        <View style={styles.column}>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  )
}

function unCamelCase(value) {
  return value.replace(/([A-Z])/g, ' $1');
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(measures.map(m => ({ key: m, title: unCamelCase(m) })))

  const renderScene = ({ route }) => {
    return <MeasureView measure={route.key} />
  }

  return (
    <View style={[styles.scene, { marginTop: Constants.statusBarHeight }]}>
      <Text style={styles.title}> Unit Converter</Text>
      <TabView navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar {...props}
            scrollEnabled
            tabStyle={{ width: 'auto' }}
            indicatorStyle={{ backgroundColor: 'orange' }}
          />
        )}
      >

      </TabView>
    </View>
  );
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
});
