import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import DropDownPicker from "react-native-dropdown-picker";


export default function RecipeFilter(){
    const [Time, setTime] = useState("");
    const [openDiff, setOpenDiff] = useState(false);
    const [Diff, setDiff] = useState("");
    const [itemsDiff, setItemsDiff] = useState([
        { label: "Easy", value: "Easy" },
        { label: "Medium", value: "Medium" },
        { label: "Hard", value: "Hard" }
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

    const setData = async () => {
        let user = firebase.auth().currentUser
        var newRecipeRef = firebase.firestore().collection("recipeData").doc()
        var imageRef = firebase.storage().ref(newRecipeRef.id + "." + image.split('.')[image.split('.').length - 1])
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });
        imageRef.put(blob)
            .then(() => {
                newRecipeRef.set({
                    recipeName: RecipeName,
                    method: Method,
                    ingredients: Ingredients,
                    cuisine: Cuisine,
                    difficulty: Diff,
                    saves: 0,
                    time: Time,
                    image: newRecipeRef.id + "." + image.split('.')[image.split('.').length - 1]
                })
                    .then((recipeRef) => {
                        firebase.firestore().collection("userData").doc(user.uid).update({
                            recipePosts: firebase.firestore.FieldValue.arrayUnion(newRecipeRef.id)
                        })
                    })
                    .then(() => {
                        navigation.navigate("Back")
                        navigation.navigate("Explore")
                    })
            })
    }

    return (
        <View style={globalStyles.createPostView}>
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
                    style={{ ...globalStyles.button, marginBottom: 20 }}
                    onPress={setData}
                >
                    <Text style={globalStyles.secondaryTitleText}>Set Filter!</Text>
                </TouchableOpacity>
                </View>
    )
}