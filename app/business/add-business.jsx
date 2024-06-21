import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc
} from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();

  const { user } = useUser();

  const [image, setImage] = useState(null);

  const [categoryList, setCategoryList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    website: "",
    about: "",
    category: "",
  });

  const handleTextChange = (e, target) => {
    setFormData({ ...formData, [target]: e });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);

    const q = query(collection(db, "Category"));

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) =>
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ])
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
      headerBackButton: false,
    });
  }, []);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    setImage(result?.assets[0]?.uri);
  };

  const handleSubmit = async () => {
    if (
        !formData.name || 
        !formData.address || 
        !formData.contact || 
        !formData.website || 
        !formData.about || 
        !formData.category ||
        !image
    ) {
        alert("Please complete all fields to continue");
        return;
    }


    setIsLoading(true);

    try {
      const fileName = Date.now().toString() + ".jpg";

      const response = await fetch(image);
      const blob = await response.blob();

      const imageRef = ref(storage, "business-app/" + fileName);

      uploadBytes(imageRef, blob).then((snapShot) => {
        console.log(fileUploaded);
        getDownloadURL(imageRef).then(async (url) => {
          console.log(url);

          saveBusinessDetail(url);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBusinessDetail = async (imageurl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      ...formData,
      imageurl: imageurl,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
    });

    ToastAndroid.show("New Business Added...", ToastAndroid.LONG);
  };

  return (
    <View className="p-4">
      <Text className="font-outfitbold text-[25px]">Add New Business</Text>

      <Text className="font-outfit text-gray-100">
        Fill all fields in order to add new business
      </Text>

      <TouchableOpacity onPress={handleImagePick} className="mt-5">
        {!image ? (
          <Image
            source={require("../../assets/images/image-picker.png")}
            className="w-[100] h-[100]"
          />
        ) : (
          <Image
            source={{ uri: image }}
            className="w-[100] h-[100] rounded-xl"
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(e) => handleTextChange(e, "name")}
          className="p-3 border border-primary rounded-md text-[17px] bg-white mt-3 font-outfit"
        />

        <TextInput
          placeholder="Address"
          onChangeText={(e) => handleTextChange(e, "address")}
          className="p-3 border border-primary rounded-md text-[17px] bg-white mt-3 font-outfit"
        />

        <TextInput
          placeholder="Contact"
          onChangeText={(e) => handleTextChange(e, "contact")}
          className="p-3 border border-primary rounded-md text-[17px] bg-white mt-3 font-outfit"
        />

        <TextInput
          placeholder="Website"
          onChangeText={(e) => handleTextChange(e, "website")}
          className="p-3 border border-primary rounded-md text-[17px] bg-white mt-3 font-outfit"
        />

        <TextInput
          placeholder="About"
          onChangeText={(e) => handleTextChange(e, "about")}
          multiline
          numberOfLines={5}
          className="p-3 border border-primary rounded-md text-[17px] bg-white mt-3 font-outfit h-[100]"
        />

        <View className="p-3 border border-primary rounded-md text-[17px] bg-white mt-3">
          <RNPickerSelect
            onValueChange={(value) => {
              handleTextChange(value, "category");
            }}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        className="p-4 bg-primary rounded-md mt-[20]"
      >
        {isLoading ? (
          <ActivityIndicator size={'small'} color={"#7F57F1"}/>
        ) : (
          <Text className="text-center font-outfitmedium text-white">
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
