import { View, Text, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [businessList, setBusinessList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBusinessByCategory = async (category) => {
    setIsLoading(true);

    setBusinessList([]);

    try {
      const q = query(
        collection(db, "BusinessList"),
        where("category", "==", category)
      );

      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) =>
        setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }])
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="pt-6">
      <View className="px-[19px]">
        <Text className="font-outfitbold text-[30px]">Explore More</Text>

        <View className="flex-row items-center bg-white p-2 mb-3 mt-5 rounded-lg border border-primary">
          <Ionicons name="search" size={24} color="#7F57F1" />

          <TextInput
            placeholder="Search..."
            placeholderTextColor="#DDDDDD"
            className="font-oufit text-xl flex-1 ml-4 h-8"
          />
        </View>
      </View>

      <Category
        explore={true}
        onCategorySelect={(item) => getBusinessByCategory(item.name)}
      />

      {businessList?.length > 0 && !isLoading ? (
        <View className="px-[19px] mt-3">
          <ExploreBusinessList businessList={businessList} />
        </View>
      ) : isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#7F57F1"}
          className="mt-[50%]"
        />
      ) : (
        <Text className="text-[25px] font-outfitbold text-gray-100 text-center mt-[50%]">
          No Business Found
        </Text>
      )}
    </SafeAreaView>
  );
}
