
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../shared/globalStyles";
import { createStackNavigator } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";
import { firebase } from '../shared/config'
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function CreateRecipe({ navigation }) {
    const [image, setImage] = useState("");
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

    const setData = () => {
        let user = firebase.auth().currentUser
        var newRecipeRef = firebase.firestore().collection("recipeData").doc()
        var imageRef = firebase.storage().ref(newRecipeRef.id + "." + image.split('.')[image.split('.').length - 1])
        imageRef.put(Platform.OS === 'ios' ? image.replace('file://', '') : image)
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
                        console.log("hereeee")
                        setImage(null)
                        setRecipeName(null)
                        setDiff(null)
                        setIngredients(null)
                        setMethod(null)
                        setTime(null)
                        setCuisine(null)
                        navigation.navigate("Back")
                        navigation.navigate("Explore")
                    })
            })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    return (
        <View style={globalStyles.createPostView}>
            <KeyboardAwareScrollView>
                {image ? <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} /></View> : null}
                <TouchableOpacity
                    style={{ ...globalStyles.button, marginBottom: 20, marginTop: 10 }}
                    onPress={pickImage}
                >
                    <Text style={globalStyles.secondaryTitleText}>Pick an Image!</Text>
                </TouchableOpacity>
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
                    style={{ ...globalStyles.button, marginBottom: 20 }}
                    onPress={setData}
                >
                    <Text style={globalStyles.secondaryTitleText}>Create Post!</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}