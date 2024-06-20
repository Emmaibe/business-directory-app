import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function ActionButton({ business }) {
    const actionButtonMenu = [
        {
            id: 1,
            name: "Call",
            icon: require("../../assets/images/phone-call.png"),
            url: 'tel:'+business?.contact
        },
        {
            id: 2,
            name: "Location",
            icon: require("../../assets/images/location.png"),
            url: 'https://www.google.com/maps/search/?api=1&query='+business?.address
        },
        {
            id: 3,
            name: "Web",
            icon: require("../../assets/images/domain.png"),
            url: business?.website
        },
        {
            id: 4,
            name: "Share",
            icon: require("../../assets/images/social.png"),
            url: 'tel:'+business?.contect
        },
    ]

    const handleOnPress = (item) => {
        if (item.name === 'Share') {
            return ;
        }

        Linking.openURL(item.url)
    }

  return (
    <View className="bg-white p-[20]">
      <FlatList 
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({item, index}) => (
            <TouchableOpacity 
                key={index}
                onPress={() => handleOnPress(item)}
            >
                <Image 
                    source={item?.icon}
                    className="w-[50] h-[50]"
                />
                
                <Text className="font-outfitmedium text-center mt-1">{item?.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}