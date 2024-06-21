import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(0);
    const [userInput, setUserInput] = useState('')
    const { user } = useUser();

    const handleSubmit = async () => {
      const docRef = doc(db, 'BusinessList', business?.id);

      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating: rating,
          comment: userInput,
          userName: user?.fullName,
          userImage: user?.imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress
        })
      });

      ToastAndroid.show('Comment added successfully', ToastAndroid.BOTTOM)
    }

  return (
    <View className="p-[20] bg-white">
      <Text className="font-outfitbold text-[22px]">Reviews</Text>

      <View>
        <Rating
            showRating={false}
            imageSize={20}
            onFinishRating={(rate) => setRating(rate)}
            style={{ paddingVertical: 10 }}
        />

        <TextInput 
            placeholder='Write your comment'
            multiline
            numberOfLines={4}
            onChangeText={e => setUserInput(e)}
            placeholderTextColor="#8f8f8f"
            className="border-2 p-[15px] rounded-lg border-gray-100 h-[100]"
        />

        <TouchableOpacity
          disabled={!userInput}
          onPress={handleSubmit}
          className="p-4 bg-primary rounded-lg mt-3"
        >
          <Text className="font-outfit text-white text-center">Submit</Text>
        </TouchableOpacity>
      </View>

      <View>
        { business?.reviews?.map((item, index) => (
          <View key={index} className="flex-row items-center p-3 border border-gray-100 rounded-lg mt-3">
            <Image 
              source={{ uri: item.userImage }} 
              className="w-[50] h-[50] rounded-full"
            />

            <View className="ml-2 flex-col">
              <Text className="font-outfitmedium">{item.userName}</Text>

              <Rating 
                imageSize={20}
                count={item.rating}
                className="items-start"
              />

              <Text>{item.comment}</Text>
            </View>
          </View>
        )) }
      </View>
    </View>
  )
}