import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { icons } from '../constants'
import { eye, eyeHide } from '../constants/icons'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...Props}) => {
   const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="flex-row items-center w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary">
         <TextInput
            className="flex-1 text-base text-white font-psemibold"
            value={value} placeholder={placeholder} onChangeText={handleChangeText} secureTextEntry={title=== 'Password' && !showPassword} placeholderTextColor="#7b7b8b"        />

            {title === "Password" && (<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
               <Image source={showPassword ? eye : eyeHide} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>)}
      </View>
    </View>
  )
}

export default FormField
