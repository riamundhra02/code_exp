import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native'
import { firebase } from './shared/config'
import { globalStyles } from './shared/globalStyles'
import { Rating } from "react-native-elements";
import { ScrollView } from 'react-native';

export function Hawker(hawkerData) {
    // {
    //     Location: "Blk, 208B New Upper Changi Rd, 462208",
    //     id: "UGafNQZ88Fddddmx6nH5",
    //     rating: 5,
    //     region: "East",
    //     reviews: [{
    //         "image": image_source,
    //         "review": "Very tasty",
    //     },
    //     {
    //         "image": image_source,
    //         "review": "Very tasty",
    //     }],
    //     saves: 0,
    //     stallName: "Prata Stall",
    // }

    const renderReview = ({ item }) => {
        return (
            <>
                <View style={{
                    height: Dimensions.get('window').width / 3 - 10, width: Dimensions.get('window').width / 3 - 10, borderRadius: 10, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,

                    elevation: 6,
                }}>
                    <Image style={{ height: Dimensions.get('window').width / 3 - 10, width: Dimensions.get('window').width / 3 - 10 }} source={{ uri: item.image }} />
                    <Text style={styles.reviewStyle}>{item.review}</Text>
                </View>
            </>

        )
    };
    // const [hawkerData, setHawkerData] = useState(null)
    // const [loading, setLoading] = useState(true)

    // const getImage = async (img) => {
    //     let imageRef = firebase.storage().ref(img);
    //     return imageRef.getDownloadURL()
    // }

    // const getHawkerData = async (id) => {
    //     setLoading(true)
    //     let data
    //     await firebase.firestore().collection("hawkerData").doc(id).get()
    //         .then(async (doc) => {
    //             data = doc.data()
    //             let revieww = await Promise.all(doc.data().reviews.map(async (review, index) => {
    //                 let copy = review
    //                 let img = await getImage(doc.id + "/" + review.image)
    //                 copy.image = img
    //                 copy.review = copy.review.replaceAll("\\n", "\n")
    //                 return copy
    //             }))
    //             data.reviews = revieww
    //             data.Location = data.Location.replaceAll("\\n", '\n')
    //             setLoading(false)
    //         });
    //     return { ...data, id: id }
    // }


    // useEffect(() => {
    //     getHawkerData(id)
    //         .then(hawker => {
    //             console.log(hawker)
    //             setHawkerData(hawker)
    //         })

    // }, [])

    return (
        //<View>
        //<Text>Hawker Card</Text>
        //<Text>{JSON.stringify(hawkerData)}</Text>
        //</View>
        <ScrollView style={styles.container}>
            {hawkerData == null ? null : (
                <>
                    <Text style={styles.hawkerName}>{hawkerData.stallName}</Text>
                    <Text style={globalStyles.otherText}>Cuisine:</Text>
                    {hawkerData.cuisine.map((cuis, index) => {
                        return (
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
                                <Text style={globalStyles.feedSubtitleText}>{cuis}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    <Text style={globalStyles.otherText}>Location:</Text>
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
                        <Text style={globalStyles.feedSubtitleText}>{hawkerData.Location}</Text>
                    </TouchableOpacity>
                    <Text style={globalStyles.otherText}>Rating:</Text>
                    <TouchableOpacity
                        style={{
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
                        <Rating imageSize={32} readonly startingValue={hawkerData.rating-1} />
                    </TouchableOpacity>

                    <Text style={globalStyles.otherText}>Reviews</Text>
                    <FlatList
                        data={hawkerData.reviews}
                        renderItem={renderReview}
                        keyExtractor={(item) => item.review}
                        numColumns={3}
                        horizontal={false}
                        columnWrapperStyle={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}
                    />
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

    hawkerName: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 35,
        marginBottom: 20,
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

    reviewStyle: {
        paddingTop: 20,
    }
});