import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import SearchInput from '../../components/SearchInput'
import VideoCard from '../../components/VideoCard'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { logout as icon } from '../../constants/icons'
import InfoBox from '../../components/InfoBox'
const Profile = () => {
   const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: posts, refetch} = useAppwrite(() => getUserPosts(user.$id));

   const logout = async() => {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in')
   }

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
      data={posts}
      // data={[]}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) =>
        (
         <VideoCard video={item}/>
        )}

        ListHeaderComponent={
          () => (
            <View className="items-center justify-center w-full px-4 mt-6 mb-12">
               <TouchableOpacity className='items-end w-full mb-10' onPress={logout}>
                  <Image source={icon} resizeMode='contain' className='w-6 h-6'/>
               </TouchableOpacity>
               <View className='items-center justify-center w-16 h-16 border rounded-lg border-secondary'>
                  <Image source={{uri: user?.avatar}} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover'/>

               </View>
                  <InfoBox title={user?.username} containerStyles='mt-5' titleStyles="text-lg"/>
               <View className='flex-row mt-5'>
                  <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles='mr-10' titleStyles="text-xl"/>
                  <InfoBox title={'1.2k'} subtitle="Followers"  titleStyles="text-xl"/>

                  </View>
            </View>
          )
        }

        ListEmptyComponent={() => (
      <EmptyState
      title="No Videos Found"
      subtitle="No videos found for this search query"
      />        )}


      />
    </SafeAreaView>
  )
}

export default Profile
