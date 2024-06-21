import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setBusinessList([]);

    const q = query(collection(db, "BusinessList"), limit(10));

    const querySnapShot = getDocs(q);

    (await querySnapShot).forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View className="mb-5">
      <View className="mt-6 flex-row items-center px-[20] justify-between">
        <Text className="text-[20px] font-outfitbold">Popular Business</Text>
        <Text className="font-outfitmedium text-primary">View All</Text>
      </View>

      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className=""
        renderItem={({ item, index }) => (
          <PopularBusinessCard business={item} key={index} index={index} businessList={businessList} />
        )}
      />
    </View>
  );
}
