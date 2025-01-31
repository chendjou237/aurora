import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { eye, eyeHide, search } from '../constants/icons'
import { router, usePathname } from 'expo-router'
const SearchInput = ({initialQuery}) => {
const pathname = usePathname();
const [query, setQuery] = useState(initialQuery || '')
   return (
      <View className="flex-row items-center w-full h-16 px-4 space-x-4 bg-black-100 rounded-2xl focus:border-secondary">
         <TextInput
            className="text-white mt-0.5 text-base flex-1 font-pregular"
            value={query}  onChangeText={(e)=> setQuery(e)} placeholder='Search for a video topic' placeholderTextColor="#CDCDE0" />

           <TouchableOpacity onPress={() => {if(!query){return Alert.alert('Missing Query', 'Please input something to search  results across the database')}
           if(pathname.startsWith('/search'))router.setParams({query})
           else router.push(`/search/${query}`)
           }}>
            <Image source={search} className="w-5 h-5" resizeMode='contain' />
           </TouchableOpacity>

      </View>
  )
}

export default SearchInput
