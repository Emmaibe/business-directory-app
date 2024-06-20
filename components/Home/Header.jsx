import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const { user } = useUser();

  return (
    <View className="p-[20] pt-14 bg-primary rounded-bl-3xl rounded-br-3xl">
        <View className="">
            <View className="flex-row items-center gap-3">
                <Image 
                    source={{ uri: user?.imageUrl }} 
                    className="w-[45] h-[45] rounded-full"
                />

                <View>
                    <Text className="font-outfit text-white">Welcome,</Text>
                    <Text className="text-xl font-outfitmedium text-white">{ user?.fullName }</Text>
                </View>
            </View>

            <View className="flex-row items-center bg-white p-2 mb-3 mt-5 rounded-lg">
                <Ionicons name="search" size={24} color="#7F57F1" />

                <TextInput
                    placeholder='Search...'
                    placeholderTextColor="#DDDDDD"
                    className="font-oufit text-xl flex-1 ml-4 h-8"
                />
            </View>
        </View>
    </View>
  )
}