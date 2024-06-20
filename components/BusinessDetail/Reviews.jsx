import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'

export default function Reviews({ business }) {
    const [rating, setRating] = useState(0)
  return (
    <View className="p-[20] bg-white">
      <Text className="font-outfitbold text-[22px]">Reviews</Text>
      <View>
        <Rating
            showRating={false}
            onFinishRating={(rate) => setRating(rate)}
            style={{ paddingVertical: 10 }}
        />

        <TextInput 
            placeholder='Write your comment'
            numberOfLines={4}
            placeholderTextColor="#8f8f8f"
            className="border-2 p-[15px] rounded-lg border-gray-100"
        />
      </View>
    </View>
  )
}