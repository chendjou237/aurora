import { StatusBar } from 'expo-status-bar';
import {  Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import logo from '../assets/images/logo.png';
import card from '../assets/images/cards.png';
import path from '../assets/images/path.png';

import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full" >
    <ScrollView contentContainerStyle={{height: '100%'}}>
    <View className="w-full justify-center items-center min-h-[85vh] px-4">
    <Image source={logo}  className="w-[130px] h-[84px]" resizeMode='contain'/>
    <Image source={card} className="max-w-[380px] w-full h-[300px]" resizeMode='contain'/>

    <View className="relative mt-5">
      <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibility With <Text className="text-secondary-200">Aurora</Text></Text>
    <Image source={path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8 " resizeMode='contain'/>
    
    </View>
    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration</Text>
    <CustomButton title="Continue with Email" handlePress={() => {router.push('/sign-in')}} containerStyles="w-full mt-7" />
    </View>
    </ScrollView>
    <StatusBar backgroundColor='#161622' style='dark'/>
    </SafeAreaView>
  );
}


