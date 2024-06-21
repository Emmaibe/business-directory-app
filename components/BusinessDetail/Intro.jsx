import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig"

export default function Intro({ business }) {
  const router = useRouter();

  const { user } = useUser();

  const handleBusinessDelete = () => {
    Alert.alert(
        "Warning!", 
        "Are you sure you want to delete this business? \nThis action CANNOT be undone!",
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => deleteBusiness()
            }
        ]
    )
  }

  const deleteBusiness = async () => {
    await deleteDoc(doc(db, 'BusinessList', business?.id))
        .catch(
            error => alert("Oops! Something went wrong, try again later.")
        );
    
    router.back();

    ToastAndroid.show('Business Deleted!', ToastAndroid.LONG);
  }

  return (
    <View>
      <View className="absolute z-10 flex-row justify-between w-full px-[20] pt-[45]">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image source={{ uri: business?.imageUrl }} className="w-full h-[340]" />

      <View className="p-5 -mt-5 rounded-tr-3xl rounded-tl-3xl bg-white shadow-xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-[28px] font-outfitbold">{business?.name}</Text>

          {user?.primaryEmailAddress?.emailAddress == business?.userEmail && (
            <TouchableOpacity onPress={handleBusinessDelete}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-[18px] font-outfit mt-2">
          {business?.address}
        </Text>
      </View>
    </View>
  );
}
