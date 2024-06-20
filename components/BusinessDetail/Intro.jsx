import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Intro({ business }) {
    const router = useRouter();

  return (
    <View>
        <View className="absolute z-10 flex-row justify-between w-full px-[20] pt-[45]">
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
            <Ionicons name="heart-outline" size={40} color="white" />
        </View>
        <Image 
            source={{ uri: business?.imageUrl }}
            className="w-full h-[340]"
        />

        <View className="p-5 -mt-5 rounded-tr-3xl rounded-tl-3xl bg-white shadow-xl">
            <Text className="text-[26px] font-outfitbold">{business?.name}</Text>
            <Text className="text-[18px] font-outfit">{business?.address}</Text>
        </View>
    </View>
  )
}