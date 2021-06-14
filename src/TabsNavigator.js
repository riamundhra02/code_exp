import React, { useState, useEffect } from 'react';
import { View } from 'react-native'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer, DefaultTheme, configurefonts } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import CreatePost from './CreatePost/Main'
import Feed from './Feed/Main'
import Profile from './Profile/Main'
import Login from './Authentication/Login'
import Register from './Authentication/Register'

import { tabsNavigatorStyle, colorTheme } from './shared/globalStyles'
import Main from './CreatePost/Main';

import { firebase } from "./shared/config"

const TabsNavigator = createMaterialBottomTabNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF'
    },
}

function MainTabs() {
    return (
        <NavigationContainer theme={MyTheme}>
            <TabsNavigator.Navigator
                backBehavior='none'
                inactiveColor='#4c74cc'
                activeColor='#154c79'
                shifting={true}
            >

                <TabsNavigator.Screen
                    name="Explore"
                    component={Feed}
                    options={{
                        tabBarLabel: 'Explore',
                        tabBarColor: tabsNavigatorStyle.color.feed,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-home" color={color} size={26} />
                        ),
                    }}
                />

                <TabsNavigator.Screen
                    name="Create Post"
                    component={CreatePost}
                    options={{
                        tabBarLabel: 'Create Post',
                        tabBarColor: tabsNavigatorStyle.color.createPost,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-create-outline" color={color} size={26} />
                        ),
                    }}
                />

                <TabsNavigator.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarColor: tabsNavigatorStyle.color.profilePage,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-person" color={color} size={26} />
                        ),
                    }}
                />

            </TabsNavigator.Navigator>
        </NavigationContainer>
    )
}

function AuthTabs() {
    return (
        <NavigationContainer theme={MyTheme}>
            <TabsNavigator.Navigator
                backBehavior='none'
                inactiveColor='#4c74cc'
                activeColor='#154c79'
                shifting={true}
            >

                <TabsNavigator.Screen
                    name="Login"
                    component={Login}
                    options={{
                        tabBarLabel: 'Login',
                        tabBarColor: tabsNavigatorStyle.color.feed,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" color={color} size={26} />
                        ),
                    }}
                />

                <TabsNavigator.Screen
                    name="Register"
                    component={Register}
                    options={{
                        tabBarLabel: 'Register',
                        tabBarColor: tabsNavigatorStyle.color.createPost,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-create-outline" color={color} size={26} />
                        ),
                    }}
                />

            </TabsNavigator.Navigator>
        </NavigationContainer>
    )
}

export default function TabNavigator() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {  
                setUser(user)    //if user has signed in and reloads the app, the app will save the login and automatically navigates to home screen
                setLoading(false)

            } else {
                setUser()
                setLoading(false)
            }
        });
    }, []);

    return (
        <>
            {!loading && user ? <MainTabs /> : <AuthTabs />}
        </>
    )

}