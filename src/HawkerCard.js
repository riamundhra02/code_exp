import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from './shared/config'
import { globalStyles } from './shared/globalStyles'

export default function Hawker({ id }) {
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
    const [hawkerData, setHawkerData] = useState([])

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return imageRef.getDownloadURL()
    }

    const getHawkerData = async (id) => {
        let data
        await firebase.firestore().collection("hawkerData").doc(id).get()
            .then(async (doc) => {
                data = doc.data()
                let revieww = await Promise.all(doc.data().reviews.map(async (review, index) => {
                    let copy = review
                    let img = await getImage(doc.id + "/" + review.image)
                    copy.image = img
                    copy.review = copy.review.replaceAll("\\n", "\n")
                    return copy
                }))
                data.reviews = revieww
                data.Location = data.Location.replaceAll("\\n", '\n')
            });
        return { ...data, id: id }
    }


    useEffect(() => {
        getHawkerData(id)
            .then(hawker => {
                console.log(hawker)
                setHawkerData(hawker)
            })

    }, [])

    return (
        <View>
            <Text>Hawker Card</Text>
            <Text>{JSON.stringify(hawkerData)}</Text>
        </View>
    )
}