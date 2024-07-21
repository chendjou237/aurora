import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { createUser } from '../../lib/appwrite';
const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const submit = () => {
    createUser();
  }
  const [isSubmitting, setIsSubmitting] = useState(false)
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

        <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>
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