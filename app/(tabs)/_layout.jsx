import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import  home  from '../../assets/icons/home.png';
import  bookmark  from '../../assets/icons/bookmark.png';
import  plus  from '../../assets/icons/plus.png';
import  profile  from '../../assets/icons/profile.png';

const TabIcon = ({icon, color,name,  focused}) => {
   return (
      <View className="items-center justify-center gap-2">
         <Image 
         source={icon} resizeMode='contain' tintColor={color} className="w-6 h-6" />
         <Text className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'}`} style={{color: color}}>{name}</Text>
      </View>
   )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={
         {
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarActiveTintColor: '#CDCDE0',
            tabBarStyle: {
               backgroundColor: '#161622',
               borderTopWidth: 1,
               borderTopColor: '#232533',
               height: 84,
            }
         }
      }>
         <Tabs.Screen name='home' options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
               <TabIcon icon={home} name={"Home"} color={color} focused={focused}/>
            )
         }}/>
         <Tabs.Screen name='bookmark' options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
               <TabIcon icon={bookmark} name={"Bookmark"} color={color} focused={focused}/>
            )
         }}/>
         <Tabs.Screen name='create' options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
               <TabIcon icon={plus} name={"Create"} color={color} focused={focused}/>
            )
         }}/>

         <Tabs.Screen name='profile' options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
               <TabIcon icon={profile} name={"Profile"} color={color} focused={focused}/>
            )
         }}/>
      </Tabs>
    </>
  )
}

export default TabsLayout