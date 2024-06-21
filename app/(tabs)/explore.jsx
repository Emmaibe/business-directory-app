import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function explore() {
  return (
    <SafeAreaView className="px-6">
      <Text className="font-outfitbold text-[30px]">Explore More</Text>
    </SafeAreaView>
  )
}