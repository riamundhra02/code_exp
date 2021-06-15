import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../shared/globalStyles";
import { createStackNavigator } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";
import createFood from './CreateHawkerPost'
import createRecipe from './CreateRecipePost'
import CreateRecipe from "./CreateRecipePost";
import CreateFood from "./CreateHawkerPost";

function Main({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Create Recipe Post")}
      >
        <MaterialCommunityIcons name="chef-hat" size={150} color="black" />
        <Text style={globalStyles.titleText}>Recipe</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text>______________________________</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.navigate("Create Food Post")}>
        <FontAwesome5 name="utensils" size={150} color="black" />
        <Text style={globalStyles.titleText}>Food</Text>
      </TouchableOpacity>
    </View>
  );
}


const Stack = createStackNavigator();

export default function PostStack() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Back"
        component={Main}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen name="Create Recipe Post" component={CreateRecipe} />
      <Stack.Screen name="Create Food Post" component={CreateFood} />
    </Stack.Navigator>
  );
}
