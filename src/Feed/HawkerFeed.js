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
import { Hawker } from "../HawkerCard";
import { firebase } from "../shared/config";
import { globalStyles } from "../shared/globalStyles";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

export default function HawkerfeedScreen({ setHidden }) {
    const swipeable = useRef();
    const [hawkerData, setHawkerData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return imageRef.getDownloadURL();
    };

    useEffect(() => {
        const unsubscribeHawkers = firebase
            .firestore()
            .collection("hawkerData")
            .onSnapshot(async (collection) => {
                setLoading(true);
                let results = await Promise.all(
                    collection.docs.map(async (doc) => {
                        let data = doc.data();
                        let revieww = await Promise.all(
                            doc.data().reviews.map(async (review, index) => {
                                let copy = review;
                                let img = await getImage(doc.id + "/" + review.image)
                                copy.image = img
                                console.log(img)
                                copy.review = copy.review.replaceAll("\\n", "\n");
                                return copy;
                            })
                        );
                        data.reviews = revieww;
                        data.Location = data.Location.replaceAll("\\n", "\n");
                        return { ...data, id: doc.id };
                    })
                );
                console.log(results);
                setHawkerData(results);
                setLoading(false);
            });

        return () => {
            unsubscribeHawkers();
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
                    setHidden(true);
                    setTimeout(() => swipeable.current.close(), 150);
                    const id = item.id;
                    const user = firebase.auth().currentUser;
                    firebase
                        .firestore()
                        .collection("userData")
                        .doc(user.uid)
                        .update({
                            bookmarkedHawkers: firebase.firestore.FieldValue.arrayUnion(id),
                        })
                        .then(() => {
                            firebase
                                .firestore()
                                .collection("hawkerData")
                                .doc(id)
                                .update({
                                    saves: firebase.firestore.FieldValue.arrayUnion(user.uid),
                                });
                        });
                }}
                renderRightActions={() => Hawker(item)}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: item.reviews[0].image,
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
                            justifyContent:"space-between",
                            // alignItems:"flex-start"
                        }}
                    >
                        <View>
                            <Text style={{ ...globalStyles.feedTitleText, width: 240 }}>{item.stallName}</Text>
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
                                justifyContent: "center",
                                // bottom: 10,
                                // left: 10,
                            }}
                        >
                            <Text style={globalStyles.feedSubtitleText}>{item.region}</Text>
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
            {loading || hawkerData == null ? null : (
                <>
                    <FlatList
                        data={hawkerData}
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
