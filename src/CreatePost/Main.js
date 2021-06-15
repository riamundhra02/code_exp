import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../shared/globalStyles";
import { createStackNavigator } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";

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

function CreateRecipe({ navigation }) {
  const [Image, setImage] = useState("");
  const [RecipeName, setRecipeName] = useState("");
  const [Ingredients, setIngredients] = useState("");
  const [Method, setMethod] = useState("");
  const [Time, setTime] = useState("");
  const [openDiff, setOpenDiff] = useState(false);
  const [Diff, setDiff] = useState("");
  const [itemsDiff, setItemsDiff] = useState([
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ]);
  const [openCuisine, setOpenCuisine] = useState(false);
  const [Cuisine, setCuisine] = useState([]);
  const [itemsCuisine, setItemsCuisine] = useState([
    { label: "Japanese", value: "Japanese" },
    { label: "Italian", value: "Italian" },
    { label: "Korean", value: "Korean" },
    { label: "Chinese", value: "Chinese" },
    { label: "Western", value: "Western" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Halal", value: "Halal" },
    { label: "Others", value: "Others" },
  ]);

  return (
    <View style={globalStyles.createPostView}>
      <Text style={globalStyles.createPostText}>Recipe Name</Text>
      <TextInput
        style={globalStyles.createPostInput}
        onChangeText={(text) => setRecipeName(text)}
        placeholder="Recipe Name"
      />
      <Text style={globalStyles.createPostText}>Ingredients</Text>
      <TextInput
        style={globalStyles.createPostInput}
        onChangeText={(text) => setIngredients(text)}
        placeholder="Ingredients"
      />
      <Text style={globalStyles.createPostText}>Method</Text>
      <TextInput
        style={globalStyles.createPostInputLong}
        onChangeText={(text) => setMethod(text)}
        placeholder="Method"
        multiline
        numberOfLines={4}
      />
      <Text style={globalStyles.createPostText}>Time Required</Text>
      <TextInput
        style={globalStyles.createPostInput}
        onChangeText={(text) => setTime(text)}
        placeholder="Time"
      />
      <Text style={globalStyles.createPostText}>Difficulty Level</Text>
      <DropDownPicker
        placeholder="Select a difficulty"
        containerProps={{
          paddingRight: 20,
          margin: 10,
        }}
        open={openDiff}
        value={Diff}
        items={itemsDiff}
        setOpen={setOpenDiff}
        setValue={setDiff}
        setItems={setItemsDiff}
        zIndex={3000}
        zIndexInverse={1000}
      />
      <Text style={globalStyles.createPostText}>Cuisine</Text>
      <DropDownPicker
        mode="BADGE"
        placeholder="Select the cuisine(s)"
        containerProps={{
          paddingRight: 20,
          margin: 10,
        }}
        multiple={true}
        min={0}
        max={5}
        open={openCuisine}
        value={Cuisine}
        items={itemsCuisine}
        setOpen={setOpenCuisine}
        setValue={setCuisine}
        setItems={setItemsCuisine}
        zIndex={1000}
        zIndexInverse={3000}
        maxHeight={250}
        bottomOffset={100}
      />
      <TouchableOpacity
        style={globalStyles.createPostButton}
        onPress={() =>
          console.log(`this is post!\n Recipe Name: ${RecipeName}`)
        }
      >
        <Text style={globalStyles.secondaryTitleText}>Create Post!</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreateFood({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create Food!</Text>
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
