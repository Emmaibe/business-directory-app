import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function PopularBusinessCard({ business, index, businessList }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      className={`${
        index == businessList.length - 1 ? "mr-5" : ""
      } w-[216] ml-[20] mt-3 p-2 bg-white rounded-xl`}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        className="w-[200] h-[130] rounded-xl mb-1"
      />

      <View className="gap-[0.5px] flex-1 justify-between">
        <Text className="font-outfitbold text-xl">{business.name}</Text>
        <Text className="font-outfit text-[12px] text-gray-100 mb-1">
          {business.address}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <Image
              source={require("./../../assets/images/star.png")}
              className="w-[15] h-[15]"
            />
            <Text className="font-oufit">4.5</Text>
          </View>

          <View className="rounded-md overflow-hidden">
            <Text className="font-outfit bg-primary text-white p-1 px-2 text-[10px]">
              {business.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
