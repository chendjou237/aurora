import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { createUser } from '../../lib/appwrite';
const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    isLoading: false
  })
  const submit =  async() => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    try {
      setForm({...form, isLoading: true});

 const result =   await   createUser(
        form.email,
        form.username,
        form.password
      );  

      //add to global state...

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    finally{
      
      setForm({...form, isLoading: false});
    }
    
  }
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView> 
        <View className="justify-center w-full px-4 my-6 min-h-[83vh]">
        <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
        <Text className="mt-10 text-2xl text-white text-semibold font-psemibold">Sign Up into Aurora</Text>
        <FormField 
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({...form, username: e})}
          otherStyles = "mt-7"
        />
        <FormField 
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          otherStyles = "mt-7"
          keybardType="email-address"
        />
        
        <FormField 
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          otherStyles = "mt-7"
        />

        <CustomButton title={form.isLoading ? "Signing Up...":"Sign Up"} handlePress={submit} containerStyles="mt-7" isLoading={form.isLoading}/>
        <View className="flex-row justify-center gap-2 pt-5">
          <Text className="text-lg text-gray-100 font-pregular">
           have an account?
          </Text>
          <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp