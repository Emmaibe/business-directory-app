import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function BusinessListCard({ business }) {
    const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/businessdetail/'+business.id)} className="p-3 m-3 rounded-xl bg-white flex-row" style={{ gap: 10 }}>
      <Image 
        source={{ uri: business.imageUrl }}
        className="w-[120] h-[120] rounded-xl"
      />

      <View className="flex-1 gap-2">
        <Text className="font-outfitbold text-[20px]">{business.name}</Text>

        <Text className="font-outfit text-gray-100 text-[15px]">{business.address}</Text>

        <View className="flex-row items-center gap-1">
            <Image 
                source={require('./../../assets/images/star.png')}
                className="w-[15] h-[15]"
            />
            <Text className="font-oufit">4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}