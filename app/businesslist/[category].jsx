import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from "../../constants/Colors"

export default function BusinessListByCategory() {
    const navigation = useNavigation();

    const {category} = useLocalSearchParams();

    const [isLoading, setIsLoading] = useState(false);

    const [businessList, setBusinessList] = useState([])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
        });

        getBusinessList();

    }, [])

    const getBusinessList = async () => {
        setIsLoading(true);

        setBusinessList([])

        const q = query(collection(db, 'BusinessList'), where("category", '==', category));

        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            setBusinessList(
                prev => [...prev, { 
                    id: doc?.id, 
                    ...doc.data() 
                }]
            );
        })

        setIsLoading(false);
    }

  return (
    <View className="h-[100%]">
        { businessList?.length > 0 && !isLoading ?
            <FlatList 
                data={businessList}
                onRefresh={getBusinessList}
                refreshing={isLoading}
                renderItem={({ item, index }) => (
                    <BusinessListCard 
                        business={item}
                        key={index}
                    />
                )}
            />
        : isLoading ?  
            <ActivityIndicator 
                size={'large'}
                color={Colors.PRIMARY}
                className="mt-[70%]"
            />
        :
            <Text className="text-[25px] font-outfitbold text-gray-100 text-center mt-[70%]">
                No Business Found
            </Text>
        }
      
    </View>
  )
}