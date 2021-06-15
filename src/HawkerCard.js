import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native'
import { firebase } from './shared/config'
import { globalStyles } from './shared/globalStyles'

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
            <View style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3 }}>
                <Image style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3 }} source={{ uri: item.image }} />
                <Text style={styles.reviewStyle}>{item.review}</Text>
            </View>
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
        <View style={styles.container}>
            {hawkerData==null ? null : (
                <>
                    <Image
                        style={styles.profilePic}
                        source={hawkerData.reviews[0].image}
                    />
                    <Text style={styles.hawkerName}>{hawkerData.stallName}</Text>
                    <Text style={styles.titleName}>{"Cuisine: " + hawkerData.cuisine}</Text>
                    <Text style={styles.titleName}>{"Location: " + hawkerData.Location}</Text>

                    <Text style={styles.titleName}>Reviews</Text>
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: Dimensions.get('window').width,
        margin:20,
    },

    hawkerName: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 35,
        textDecorationLine: 'underline',

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