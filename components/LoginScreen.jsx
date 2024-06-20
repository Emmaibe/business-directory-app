import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

  return (
    <View>
        <View className="flex items-center mt-[100]">
            <Image 
                source={require("../assets/images/login.png")}
                className="w-[220] h-[450] border-[6px] rounded-xl border-[#000]"
            />
        </View>

        <View className="bg-[#FFF] p-[20] -mt-[20]">
            <Text className="text-4xl font-outfitbold text-center">
                Your Ultimate <Text className="text-primary">Community Business Directory</Text> App
            </Text>

            <Text className="font-outfit text-xl text-center my-[15] text-gray-100">
                Find your favorite business near you and post your own business to your community
            </Text>

            <TouchableOpacity onPress={onPress} className="bg-primary p-[16] rounded-full mt-[20]">
                <Text className="text-center text-white font-outfit">Let's Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}