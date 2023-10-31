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
    { title: "Anotações", action: () => navigation.navigate('Anotações') },
    { title: "Configurações", action: () => navigation.navigate('Configurações') },
    { title: "Notificações", action: () => navigation.navigate('Notificações') },
    { title: "Botão 4", action: () => {} },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={item.action}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>Pagina Inicial</Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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
  button: {
    width: 190,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    margin: 5,
    borderRadius: 20,
  },
});

export default App;
