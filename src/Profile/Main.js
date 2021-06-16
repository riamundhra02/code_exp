import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView, Modal } from 'react-native'
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'
import { Title, Caption } from 'react-native-paper'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { Hawker } from '../HawkerCard'
import { Recipe } from '../RecipeCard'

export default function Main() {

    // {
    //     email: "ria.mundhra1234@gmail.com",
    //     fullName: "ria mu",
    //     hawkerPosts:[
    //         "UGafNQZ88Fddddmx6nH5",
    //     ],
    //     recipePosts:[
    //         "NGa21ieM5LIsEHe0V8uk",
    //     ],
    // }
    const [user, setUser] = useState()

    // [{
    //     cuisine: ["Local", "Vegetarian"],
    //     difficulty: "easy",
    //     id: "NGa21ieM5LIsEHe0V8uk",
    //     image: image_source,
    //     ingredients: "maggie\nmee\n",
    //     method: "Step 1\n2. Step 2",
    //     recipeName: "Maggie Mee",
    //     saves: 0,
    //     time: "1h"
    // },
    // {...},
    // {...}]
    const [recipeData, setRecipeData] = useState([])

    // [{
    //     cuisine: ["Local", "Vegetarian"],
    //     difficulty: "easy",
    //     id: "NGa21ieM5LIsEHe0V8uk",
    //     image: image_source,
    //     ingredients: "maggie\nmee\n",
    //     method: "Step 1\n2. Step 2",
    //     recipeName: "Maggie Mee",
    //     saves: 0,
    //     time: "1h"
    // },
    // {...},
    // {...}]
    const [bookmarkedRecipeData, setBookmarkedRecipeData] = useState([])

    // [{
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
    // },
    // {...},
    // {...}]
    const [hawkerData, setHawkerData] = useState([])

    // [{
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
    // },
    // {...},
    // {...}]
    const [bookmarkedHawkerData, setBookmarkedHawkerData] = useState([])
    const [loading, setloading] = useState(true)
    const [flatlistData, setFlatlistData] = useState([])
    const [hawker, setHawker] = useState(null)
    const [modal, setModalVisible] = useState(false)
    const [modalRecipe, setModalRecipeVisible] = useState(false)
    const [recipe, setRecipe] = useState(null)

    const logOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return await imageRef.getDownloadURL()
    }

    const getRecipeData = async (id) => {
        let data
        await firebase.firestore().collection("recipeData").doc(id).get()
            .then(async (doc) => {
                if (doc.exists) {
                    data = doc.data()
                    let img = await getImage(data.image)
                    data.image = img
                    data.ingredients = data.ingredients.replaceAll("\\n", "\n")
                    data.method = data.method.replaceAll("\\n", "\n")
                }
            })
        return { ...data, id: id }
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

    function renderItem({ item }) {
        if (item.hawker) {
            return (
                <TouchableOpacity onPress={async () => {
                    let hawker = await getHawkerData(item.id)
                    setHawker(hawker)
                    setModalVisible(true)
                }}>
                    <Image style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3 }} source={{ uri: item.image }} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={async () => {
                    let hawker = await getRecipeData(item.id)
                    setRecipe(hawker)
                    setModalRecipeVisible(true)
                }}>
                    <Image style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3 }} source={{ uri: item.image }} />
                </TouchableOpacity>
            )
        }
    }


    useEffect(() => {
        const user = firebase.auth().currentUser
        const unsubscribeUser = firebase.firestore().collection("userData").doc(user.uid).onSnapshot(async (doc) => {
            let data = doc.data()
            setloading(true)
            setUser(data)
            if (data.recipePosts.length > 0) {
                let recipes = await Promise.all(data.recipePosts.map(async (id, index) => {
                    return await getRecipeData(id)
                }))
                setRecipeData(recipes)
            }

            if (data.bookmarkedRecipes.length > 0) {
                let bookmarkedRecipes = await Promise.all(data.bookmarkedRecipes.map(async (id, index) => {
                    return await getRecipeData(id)
                }))
                setBookmarkedRecipeData(bookmarkedRecipes)
            }

            if (data.hawkerPosts.length > 0) {
                let hawkers = await Promise.all(data.hawkerPosts.map(async (id, index) => {
                    return await getHawkerData(id)
                }))
                setHawkerData(hawkers)
                setFlatlistData(hawkers.map((hawker, i) => {
                    return ({ image: hawker.reviews[0].image, id: hawker.id, hawker: true })
                }))
            }

            if (data.bookmarkedHawkers.length > 0) {
                let bookmarkedHawkers = await Promise.all(data.bookmarkedHawkers.map(async (id, index) => {
                    return await getHawkerData(id)
                }))
                setBookmarkedHawkerData(bookmarkedHawkers)
            }
            setloading(false)
        })

        return () => {
            unsubscribeUser()
        };
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
            {loading ? null : (
                <View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 100, margin: 10 }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "75%" }}>
                            <Image style={globalStyles.profilePicture} source={{ uri: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg ' }} />
                            <Text style={globalStyles.profileName}> {user?.fullName} </Text>
                        </View>
                        <TouchableOpacity style={globalStyles.logOut} onPress={logOut}>
                            <Text style={globalStyles.secondaryTitleText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.ProfileboxWrapper}>
                        <TouchableOpacity style={globalStyles.Profilebox} onPress={() => {
                            setFlatlistData(hawkerData.map((hawker, i) => {
                                return ({ image: hawker.reviews[0].image, id: hawker.id, hawker: true })
                            }))
                        }}>
                            <Title>{hawkerData.length}</Title>
                            <Caption><MaterialCommunityIcons name="chef-hat" size={24} color="black" /></Caption>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.Profilebox} onPress={() => {
                            setFlatlistData(recipeData.map((recipe, i) => {
                                return ({ image: recipe.image, id: recipe.id, hawker: false })
                            }))
                        }}>
                            <Title>{recipeData.length}</Title>
                            <Caption><FontAwesome name="cutlery" size={24} color="black" /></Caption>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.Profilebox} onPress={() => {
                            let temp = bookmarkedRecipeData.map((recipe, i) => {
                                return ({ image: recipe.image, id: recipe.id, hawker: false })
                            })
                            let tempTwo = bookmarkedHawkerData.map((hawker, i) => {
                                return ({ image: hawker.reviews[0].image, id: hawker.id, hawker: true })
                            })
                            setFlatlistData([...temp, ...tempTwo])
                        }}>
                            <Title>{bookmarkedHawkerData.length + bookmarkedRecipeData.length}</Title>
                            <Caption><MaterialCommunityIcons name="bookmark-multiple" size={24} color="black" /></Caption>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        visible={modal}
                        onRequestClose={() => {
                            setModalVisible(false)
                        }}
                    >
                        <TouchableOpacity
                            style={{ marginTop: 40, marginLeft: 30 }}
                            onPress={() => {
                                setModalVisible(false)
                            }}>
                            <MaterialCommunityIcons name="close-circle" size={32} color="black" />
                        </TouchableOpacity>
                        {Hawker(hawker)}
                    </Modal>
                    <Modal
                        animationType="slide"
                        visible={modalRecipe}
                        onRequestClose={() => {
                            setModalRecipeVisible(false)
                        }}
                    >
                        <TouchableOpacity
                            style={{ marginTop: 40, marginLeft: 30 }}
                            onPress={() => {
                                setModalRecipeVisible(false)
                            }}>
                            <MaterialCommunityIcons name="close-circle" size={32} color="black" />
                        </TouchableOpacity>
                        {Recipe(recipe)}
                    </Modal>
                    <FlatList
                        columnWrapperStyle={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}
                        data={flatlistData}
                        keyextractor={item => item.id.toString()}
                        renderItem={renderItem}
                        numColumns={3}
                        horizontal={false}
                    />
                </View>)}
        </SafeAreaView>

    )
}