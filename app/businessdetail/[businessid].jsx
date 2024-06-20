import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {
    const { businessid } = useLocalSearchParams();

    const [business, setBusiness] = useState();

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getBusinessDetialById();
    }, [])

    const getBusinessDetialById = async () => {
        setIsLoading(true)

        const docRef = doc(db, 'BusinessList', businessid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBusiness(docSnap.data())
        } else {
            console.log("No Such Document")
            alert("No such Document Found!")
        }

        setIsLoading(false)
    }

  return (
    <ScrollView>
        { isLoading ? 
            <ActivityIndicator 
                size={'large'}
                color={Colors.PRIMARY}
                className="mt-[100%]"
            /> : 
            <View>
                <Intro 
                    business={business}
                />

                <ActionButton business={business} />

                <About business={business}/>

                <Reviews business={business} />
            </View>
        }
    </ScrollView>
  )
}