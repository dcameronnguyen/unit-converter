import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import convert from 'convert-units';

const measures = convert().measures();

const MeasureView = ({ measure }) => <Text>{measure}</Text>

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(measures.map(m => ({ key: m, title: m })))

  const renderScene = ({ route }) => {
    return <MeasureView measure={route.key} />
  }

  return (
    <View style={styles.scene}>
      <TabView navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
      >

      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
