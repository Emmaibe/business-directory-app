import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import CategoryItem from "./CategoryItem";
import { db } from "../../configs/FirebaseConfig";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);

    const q = query(collection(db, "Category"));

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
      console.log(doc.data());
    });
  };

  const handleOnCategoryPress = (item) => {
    if (!explore) {
        router.push("/businesslist/" + item.name);
    } else {
        onCategorySelect(item)
    }
  }

  return (
    <View>
      {!explore && (
        <View className="mt-6 flex-row items-center px-[20] justify-between">
          <Text className="text-[20px] font-outfitbold">Category</Text>
          <Text className="font-outfitmedium text-primary">View All</Text>
        </View>
      )}

      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className=""
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={item.id}
            index={index}
            totalNum={categoryList?.length}
            onCategoryPress={() => handleOnCategoryPress(item)}
          />
        )}
      />
    </View>
  );
}
