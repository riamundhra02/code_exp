import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from './shared/config'
import { globalStyles } from './shared/globalStyles'

const reviews = ['Jeffrey Sung said At S$4.50 per bowl, this has got to be the most value for money authentic Tom Yam soup in SG. The fresh seafood and unique deep spicy yet sour & sweet taste of real Tom Yam is all over Northern Thai’s Clear Tom Yam Soup. Seems like auntie and uncle has been doing this for years! And oh you get to control the spicyness level.', 'Huiwen said Creamy and thick tom yum soup ($4.50 + $0.50 for noodle) 👍🏻 must soak the fried fish with Tom yum 🤤🤤 will prefer with rice than noodle though. Overall worth trying!']

const reviewsAsObjects = reviews.map((item) => {
    return{
      review : item,
    };
  });
  
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

    const renderReview = ({item}) => {
        return <Text style={styles.reviewStyle}>{item.review}</Text>;
      };
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
        //<View>
            //<Text>Hawker Card</Text>
            //<Text>{JSON.stringify(hawkerData)}</Text>
        //</View>
        <View style={styles.container}>
      <Image
          style={styles.profilePic}
          source={{
            uri:
              'data:image/jpeg;base64,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',
          }}
      />
      <Text style={styles.hawkerName}>Northern Thai</Text>
      <Text style={styles.hawkerName}>Tom Yum</Text>
      <Text style ={styles.titleName}>Cuisine: Thai </Text>
      <Text style={styles.titleName}>Location: Berseh Food Centre, 166 Jln Besar #01-25 Singapore, Singapore 208877</Text>
      
      <Text style = {styles.titleName}>Reviews</Text>
        <FlatList
            data = {reviewsAsObjects}
            renderItem = {renderReview}
            keyExtractor={(item) => item.review}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
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
      paddingTop : 20,
      alignSelf: 'left',
      fontSize: 25,
  
    },
  
    reviewStyle: {
      paddingTop : 20,
    }
  });