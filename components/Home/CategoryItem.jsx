import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={onCategoryPress}>
      <View className="p-4 bg-secondary-100 rounded-full ml-4 mt-3">
        <Image 
          source={{ uri: category.icon }}
          className="w-[40] h-[40]"
        />
      </View>

      <Text className="text-[12px] font-outfitmedium text-center mt-2 ml-4">
        {category.name}
      </Text>
    </TouchableOpacity>
  )
}