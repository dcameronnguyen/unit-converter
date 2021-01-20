import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import convert from 'convert-units';
import Constants from 'expo-constants';
import MeasureView from './components/MeasureView/MeasureView';


const measures = convert().measures();

function unCamelCase(value) {
  return value.replace(/([A-Z])/g, ' $1');
}
export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(measures.map(m => ({ key: m, title: unCamelCase(m) })))
  const [value, setValue] = useState('0');

  const renderScene = ({ route }) => {
    return <MeasureView measure={route.key} value={value} setValue={setValue} />
  }

  return (
    <View style={[styles.scene, { marginTop: Constants.statusBarHeight }]}>
      <Text style={styles.title}> Unit Converter </Text>
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
