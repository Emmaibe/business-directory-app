import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function profile() {
  return (
    <SafeAreaView className="px-[19px] pt-6">
      <Text className="font-outfitbold text-[30px]">profile</Text>

      <UserIntro />
      <MenuList />
    </SafeAreaView>
  )
}