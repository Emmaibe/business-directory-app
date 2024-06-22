import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import PopularBusiness from "../../components/Home/PopularBusiness";

export default function home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <Slider />
      <Category />
      <PopularBusiness />
    </ScrollView>
  );
}
