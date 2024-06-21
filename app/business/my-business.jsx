import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import ExploreBusinessListCard from "../../components/Explore/ExploreBusinessListCard"
import { useNavigation } from "expo-router";

export default function MyBusiness() {
  const { user } = useUser();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Business'
    })
  }, [])

  useEffect(() => {
    user && getUserBusiness();
  }, [])

  const getUserBusiness = async () => {
    setIsLoading(true)

    setBusinessList([]);

    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) =>
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }])
    );

    setIsLoading(false);
  };

  return (
    <View className="px-[19px] mt-2">
      {/* <Text className="font-outfitbold text-[25px]">My Business</Text> */}

      <FlatList 
        data={businessList}
        refreshing={isLoading}
        onRefresh={getUserBusiness}
        renderItem={({ item, index }) => (
          <ExploreBusinessListCard 
            key={index}
            business={item}
          />
        )}
      />
    </View>
  );
}
