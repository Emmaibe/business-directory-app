import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function MenuList() {
  const router = useRouter();

  const menuList = [
    {
        id: 1,
        name: 'Add Business',
        icon: require('../../assets/images/add.png'),
        path: 'business/add-business'
    },
    {
        id: 2,
        name: 'My Business',
        icon: require('../../assets/images/business.png'),
        path: ''
    },
    {
        id: 3,
        name: 'Share App',
        icon: require('../../assets/images/share.png'),
        path: ''
    },
    {
        id: 4,
        name: 'Logout',
        icon: require('../../assets/images/logout.png'),
        path: ''
    },
  ];

  const handleMenuPress = (item) => {
    router.push(item.path); return;

    if (condition) {
      
    } else {
      
    }
  }

  return (
    <View className="mt-8">
      <FlatList 
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => handleMenuPress(item)} className="flex-row items-center flex-1 p-3 border rounded-xl m-3 bg-white border-primary">
                <Image 
                    source={item.icon}
                    className="w-[50] h-[50]"
                />

                <Text className="ml-2 font-outfitmedium text-[16px] flex-1">{item.name}</Text>
            </TouchableOpacity>
        )}
      />

      <Text className="font-outfitbold text-center mt-[50] text-gray-100">Developed by lordIB€ @ 2024</Text>
    </View>
  );
}
