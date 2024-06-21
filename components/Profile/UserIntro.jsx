import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function UserIntro() {
    const { user } = useUser();

  return (
    <View className="justify-center items-center mt-8">
      <Image 
        source={{ uri: user.imageUrl }}
        className="w-[100] h-[100] rounded-full"
      />

      <Text className="font-outfitbold text-[20px] mt-1">{user?.fullName}</Text>
      <Text className="font-outfit text-[16px]">{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}