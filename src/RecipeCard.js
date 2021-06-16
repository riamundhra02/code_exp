import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import { firebase } from './shared/config'
import { globalStyles } from './shared/globalStyles'

export function Recipe(recipeData) {
    // {
    //     cuisine: ["Local", "Vegetarian"],
    //     difficulty: "easy",
    //     id: "NGa21ieM5LIsEHe0V8uk",
    //     image: image_source,
    //     ingredients: "maggie\nmee\n",
    //     method: "Step 1\n2. Step 2",
    //     recipeName: "Maggie Mee",
    //     saves: 0,
    //     time: "1h"
    // }

    // const [recipeData, setRecipeData] = useState(null)
    // const [loading, setLoading] = useState(true)

    // const getImage = async (img) => {
    //     let imageRef = firebase.storage().ref(img);
    //     return imageRef.getDownloadURL()
    // }

    // const getRecipeData = async (id) => {
    //     setLoading(true)
    //     let data
    //     await firebase.firestore().collection("recipeData").doc(id).get()
    //         .then(async (doc) => {
    //             if (doc.exists) {
    //                 data = doc.data()
    //                 let img = await getImage(data.image)
    //                 data.image = img
    //                 data.ingredients = data.ingredients.replaceAll("\\n", "\n")
    //                 data.method = data.method.replaceAll("\\n", "\n")
    //                 setLoading(false)
    //             }
    //         })
    //     return { ...data, id: id }
    // }


    // useEffect(() => {
    //     getRecipeData(id)
    //         .then(recipe => {
    //             console.log(recipe)
    //             setRecipeData(recipe)
    //         })

    // }, [])

    return (
        //<View>
        //<Text>Recipe Card</Text>
        //<Text>{JSON.stringify(recipeData)}</Text>
        //</View>
        <ScrollView style={{ ...styles.container }}>
            {recipeData == null ? null : (
                <>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom:20
                        }}>
                        <Image
                            style={{ ...styles.profilePic, width: 60, height: 60 , marginTop:0, marginBottom:0, marginRight:40}}
                            source={{ uri: 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_450,h_300/https://danielfooddiary.com/wp-content/uploads/2020/05/pratasingapore3.jpg' }}
                        />
                        <Text style={styles.recipeName}>{recipeData.recipeName}</Text>
                    </View>
                    <Text style={globalStyles.otherText}>Cuisine:</Text>
                    {recipeData.cuisine.map((cuis, index) => {
                        return (
                            <TouchableOpacity
                            key={index}
                                style={{
                                    backgroundColor: "lightgrey",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignSelf: "flex-start",
                                    opacity: 0.8,
                                    marginRight: 10,
                                    marginTop: 5,
                                }}
                            >
                                <Text style={globalStyles.feedSubtitleText}>{cuis}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    <Text style={globalStyles.otherText}>Time Taken:</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "lightgrey",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignSelf: "flex-start",
                            opacity: 0.8,
                            marginRight: 10,
                            marginTop: 5,
                        }}
                    >
                        <Text style={globalStyles.feedSubtitleText}>{recipeData.time}</Text>
                    </TouchableOpacity>
                    <Text style={globalStyles.otherText}>Difficulty Level:</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: recipeData.difficulty === "Easy" ? "lightgreen" : recipeData.difficulty === "Medium" ? "lemonchiffon" : "lightcoral",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignSelf: "flex-start",
                            opacity: 0.8,
                            marginRight: 10,
                            marginTop: 5,
                        }}
                    >
                        <Text style={{ ...globalStyles.feedSubtitleText, }}>{recipeData.difficulty}</Text>
                    </TouchableOpacity>

                    <Text style={globalStyles.otherText}>Ingredients:</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "lightgrey",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignSelf: "flex-start",
                            opacity: 0.8,
                            marginRight: 10,
                            marginTop: 5,
                        }}
                    >
                        <Text style={globalStyles.feedSubtitleText}>{recipeData.ingredients}</Text>
                    </TouchableOpacity>

                    <Text style={globalStyles.otherText}>Method:</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "lightgrey",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignSelf: "flex-start",
                            opacity: 0.8,
                            marginRight: 10,
                            marginTop: 5,
                        }}
                    >
                        <Text style={globalStyles.feedSubtitleText}>{recipeData.method}</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: Dimensions.get('window').width,
        margin: 20,
        marginTop: 50
    },

    recipeName: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 35,
        borderStyle: "solid",
        borderColor: "black"

    },

    profilePic: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 2,
    },

    titleName: {
        paddingTop: 20,
        alignSelf: 'flex-start',
        fontSize: 25,

    },

    ingredientStyle: {
        paddingTop: 20,
    }
});



