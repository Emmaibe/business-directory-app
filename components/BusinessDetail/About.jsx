import { View, Text } from 'react-native'
import React from 'react'

export default function About({ business }) {
  return (
    <View className="p-[20] bg-white">
      <Text className="font-outfitbold text-[22px]">About</Text>

      <Text className="font-outfit leading-7">{business?.about}</Text>
    </View>
  )
}