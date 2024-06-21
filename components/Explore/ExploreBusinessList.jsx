import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ExploreBusinessListCard from './ExploreBusinessListCard'

export default function ExploreBusinessList({ businessList }) {
  return (
    <View>
        <FlatList
            data={businessList}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <ExploreBusinessListCard 
                    key={index} 
                    business={item}
                />
            )}
        />
    </View>
  )
}