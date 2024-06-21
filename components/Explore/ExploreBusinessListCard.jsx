import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function ExploreBusinessListCard({ business }) {
    const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/businessdetail/'+business?.id)} className="bg-white rounded-br-xl rounded-bl-xl mt-4">
      <Image
        source={{ uri: business.imageUrl }}
        className="w-full h-[150] rounded-tr-xl rounded-tl-xl"
      />

      <View className="p-3">
        <Text className="font-outfitbold text-[20px]">{business.name}</Text>
        <Text className="font-oufit text-gray-100">{business.address}</Text>
      </View>
    </TouchableOpacity>
  )
}