import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'

export default function Slider() {
    const [sliderList, setSliderList] = useState([])

    useEffect(() => {
        getSliderList();
    }, [])

    const getSliderList = async () => {
        setSliderList([]);

        const q = query(collection(db, 'Slider'));

        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(prev => [...prev, doc.data()]);
        })
    }

  return (
    <View>
        <Text className="font-outfitbold text-[20px] pt-[20] pl-[20] mb-[5]">
            #Special for you
        </Text>

        <FlatList 
            data={sliderList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="pl-[20]"
            renderItem={({ item, index }) => (
                <Image 
                    key={index}
                    source={{ uri: item.imageUrl }} 
                    className={`w-[300] h-[160] rounded-xl mr-[15] ${index == (sliderList?.length - 1) ? 'mr-[38]' : ''}`}
                />
            )}
        />
    </View>
  )
}