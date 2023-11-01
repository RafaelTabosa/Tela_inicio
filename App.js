import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AnotacoesScreen from './src/AnotacoesScreen';
import ConfiguracoesScreen from './src/ConfiguracoesScreen';
import NotificacoesScreen from './src/NotificacoesScreen';


function HomeScreen({ navigation }) {
  const data = [
    { title: "Anotações", icon: "ios-calendar", action: () => navigation.navigate('Anotações') },
    { title: "Configurações", icon: "ios-settings", action: () => navigation.navigate('Configurações') },
    { title: "Notificações", icon: "ios-notifications", action: () => navigation.navigate('Notificações') },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={item.action}>
    <Icon name={item.icon} size={50} color="blue" />
    <Text>{item.title}</Text>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>Pagina Inicial</Text>
      <View style={styles.buttonContainer}>
        {data.slice(0, 2).map((item, index) => (
          <View key={index}>{renderItem({ item })}</View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {data.slice(2).map((item, index) => (
          <View key={index}>{renderItem({ item })}</View>
        ))}
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Anotações" component={AnotacoesScreen} />
        <Stack.Screen name="Configurações" component={ConfiguracoesScreen} />
        <Stack.Screen name="Notificações" component={NotificacoesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 190,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    margin: 5,
  },
});

export default App;
