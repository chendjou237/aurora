import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { play } from '../constants/icons'
import {Video, ResizeMode} from 'expo-av'
const zoomIn = {
  0: {
    scale: 0.9,
    opacity: 0.5
  },
  1:{
    scale:1.1,
    opacity:1
  }
}
const zoomOut = {
  0: {
    scale: 1.1,
    opacity: 1
  },
  1:{
    scale:0.9,
    opacity:0.5
  }
}

const TrendingItem = ({activeItem, item}) => {
const [plays, setPlay] = useState(false);
   return (
      <Animatable.View className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      >
        {plays ? (<Video
        source={{uri:item.video}}
        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status) => {if(status.didJustFinish){setPlay(false);}}  }
        />):
        <TouchableOpacity className="relative justify-center items-center" activeOpacity={.7}
        onPress={() => {setPlay(true); console.log(item.video);
        }}
        >
          <ImageBackground source={{uri: item.thumbnail}} className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40" resizeMode='cover'/>
          <Image
          source={play}
          className="w-12 h-12 absolute"
          resizeMode='contain'
          />
          </TouchableOpacity>}
      </Animatable.View>
   )
}

const Trending = ({posts}) => {
const [active, setActive] = useState(posts[0])

const viewableItemsChanged = ({viewableItems}) => {
  if(viewableItems.length > 0){
    setActive(viewableItems[0].key)
  }
}

  return (
    <FlatList
    data= {posts}
    keyExtractor={(item) => item.$id}
    renderItem={
     ({item}) => (
      <TrendingItem  activeItem={active} item={item}/>
     )
    }
    onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
      itemVisiblePercentThreshold: 70
    }}
    contentOffset={{x: 170}}
    horizontal
    />
  )
}

export default Trending
