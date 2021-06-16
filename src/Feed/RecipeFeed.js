import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Dimensions,
    TouchableOpacity,
    Button,
    SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Recipe } from "../RecipeCard";
import { firebase } from "../shared/config";
import { globalStyles } from "../shared/globalStyles";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

export default function HawkerfeedScreen({ setHidden }) {
    const swipeable = useRef();
    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return imageRef.getDownloadURL();
    };

    useEffect(() => {
        const unsubscribeRecipes = firebase
            .firestore()
            .collection("recipeData")
            .onSnapshot(async (collection) => {
                setLoading(true);
                let results = await Promise.all(
                    collection.docs.map(async (doc) => {
                        let data = doc.data();
                        // let img = await getImage(data.image)
                        // data.image = img
                        data.ingredients = data.ingredients.replaceAll("\\n", "\n");
                        data.method = data.method.replaceAll("\\n", "\n");
                        return { ...data, id: doc.id };
                    })
                );
                setRecipeData(results);
                setLoading(false);
            });

        return () => {
            unsubscribeRecipes();
        };
    }, []);

    function leftswipe(id) {
        return (
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 40,
                    backgroundColor: "lightgreen",
                }}
            >
                <Text style={globalStyles.otherText}>Bookmarked</Text>
                <MaterialCommunityIcons name="bookmark" size={24} color="black" />
            </View>
        );
    }

    function renderItem({ item }) {
        //takes an item from data and renders it into the list
        return (
            <Swipeable
                ref={swipeable}
                renderLeftActions={() => leftswipe(item.id)}
                onSwipeableRightWillOpen={() => setHidden(true)}
                onSwipeableClose={() => setHidden(false)}
                onSwipeableLeftWillOpen={() => {
                    setHidden(false);
                    setTimeout(() => swipeable.current.close(), 150);
                    const id = item.id;
                    const user = firebase.auth().currentUser;
                    firebase
                        .firestore()
                        .collection("userData")
                        .doc(user.uid)
                        .update({
                            bookmarkedRecipes: firebase.firestore.FieldValue.arrayUnion(id),
                        })
                        .then(() => {
                            firebase
                                .firestore()
                                .collection("recipeData")
                                .doc(id)
                                .update({
                                    saves: firebase.firestore.FieldValue.arrayUnion(user.uid),
                                });
                        });
                }}
                renderRightActions={() => Recipe(item)}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_450,h_300/https://danielfooddiary.com/wp-content/uploads/2020/05/pratasingapore3.jpg",
                        }}
                    />
                    <View
                        style={{
                            width: "100%",
                            position: "absolute",
                            bottom: -10,
                            zIndex: 1000,
                            display: "flex",
                            padding: 25,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text style={{ ...globalStyles.feedTitleText, width: 240 }}>{item.recipeName}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                {item.cuisine.map((cuis, index) => {
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
                            </View>
                        </View>

                        <View
                            style={{
                                // position: "absolute",
                                // top: 55,
                                // left: 350,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ ...globalStyles.otherText, marginTop: 0 }}>{item.saves.length}</Text>
                            <MaterialCommunityIcons
                                name="bookmark-multiple"
                                size={30}
                                color="black"
                            />
                        </View>
                    </View>
                </View>
            </Swipeable>
        );
    }

    return (
        <View style={globalStyles.container}>
            {loading || recipeData == null ? null : (
                <>
                    <FlatList
                        data={recipeData}
                        renderItem={renderItem}
                        snapToAlignment={"top"}
                        snapToInterval={Dimensions.get("screen").height-80}
                        pagingEnabled={true}
                        decelerationRate={"fast"}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    leftswipetext: {
        fontSize: 30,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
    },
    image: {
        height: Dimensions.get("window").height - 80,
        width: Dimensions.get("window").width,
        flex: 1,
    },
    filter: {
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        color: "white",
    },
});
