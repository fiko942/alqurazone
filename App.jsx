import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import screens from "./screens"
import { SafeAreaView } from "react-navigation"

const Stack = createNativeStackNavigator()

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='surah-detail' component={screens.SurahDetail} />
          <Stack.Screen name="SurahList" component={screens.SurahList} options={{name: ''}} />
          <Stack.Screen name="Home" component={screens.Home} options={{}} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App
