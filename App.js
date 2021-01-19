import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import convert from 'convert-units';
import Constants from 'expo-constants';

const measures = convert().measures();

const MeasureView = ({ measure }) => {
  const units = convert().possibilities(measure)
  return (
    <View style={styles.scene}>
      <View style={styles.row}>

      </View>
      <Text>{measure}</Text>
    </View>
  )
}

function unCamelCase(value) {
  return value.replace(/([A-Z])/g, ' $1')
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
});
