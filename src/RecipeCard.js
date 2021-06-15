import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { firebase } from './shared/config'
import { globalStyles } from './shared/globalStyles'

const ingredients = ['Ingredient 1: Chicken', 'Ingredient 2: Rice']
const steps = ['Step 1 : Boil a pot of water', 'Step 2: Cook chicken in the boiling pot for 5 minutes', 'Step 3: After 5 minutes, place the chicken into an ice bath', 'Step 4: Cook rice using Rice Cooker']

const ingredientsAsObjects = ingredients.map((item) => {
  return{
    ingredient : item,
  };
});

const stepsAsObjects = steps.map((item) => {
  return{
    step : item,
  };
});

export default function Recipe({ id }) {
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
    const renderIngredient = ({item}) => {
        return <Text style={styles.ingredientStyle}>{item.ingredient}</Text>;
      };
    
      const renderStep = ({item}) => {
        return <Text style={styles.ingredientStyle}>{item.step}</Text>;
      };
    
    const [recipeData, setRecipeData] = useState()

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return imageRef.getDownloadURL()
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


    useEffect(() => {
        getRecipeData(id)
            .then(recipe => {
                console.log(recipe)
                setRecipeData(recipe)
            })

    }, [])

    return (
        //<View>
            //<Text>Recipe Card</Text>
            //<Text>{JSON.stringify(recipeData)}</Text>
        //</View>
        <View style={styles.container}>
      <Image
          style={styles.profilePic}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/7/71/Hainanese_Chicken_Rice.jpg',
          }}
      />
      <Text style={styles.recipeName}>Chicken Rice</Text>
      
      <Text style ={styles.titleName}>Time Taken: 1.5hr </Text>
      <Text style={styles.titleName}>Difficulty Level: Easy</Text>
      
      <Text style = {styles.titleName}>Ingredients</Text>
        <FlatList
            data = {ingredientsAsObjects}
            renderItem = {renderIngredient}
            keyExtractor={(item) => item.ingredient}
        />
      
      
      <Text style = {styles.titleName}>Steps</Text>
          <FlatList
            data = {stepsAsObjects}
            renderItem = {renderStep}
            keyExtractor={(item) => item.step}
          />
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
  
    recipeName: {
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
  
    ingredientStyle: {
      paddingTop : 20,
    }
  });



