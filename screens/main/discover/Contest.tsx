import { View, Text, ScrollView, Platform, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomView from '../../../components/Views/CustomView'
import CustomHeader from '../../../components/headers/CustomHeaders'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/AppStacks';
import { Colors } from '../../../components/Colors';
import { ShoppingCart } from 'iconsax-react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';

type ContestT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Contest({navigation}: ContestT ) {
    const contestLink = "https://pay-p2p.netlify.app/?payId=160005";
     const [webViewLoading, setWebViewLoading] = useState(false);
     const webViewRef = useRef<WebView>(null);

     const handleNavigationStateChange = (navState: WebViewNavigation) => {
       try {
         if (navState.canGoBack) {
           webViewRef?.current?.goBack();

        //    setShowWebView(false);
        //    setSnapTo(["38%", "50%"]);
        //    setPaymentLink("");
        //    setShowWebView(false);
         }
         if (navState.loading) {
           setWebViewLoading(true);
         } else {
           setWebViewLoading(false);
         }
         console.log(navState);
       } catch (err: any) {
         console.log(err.message);
       }
     };


      const handleWebViewLoadStart = () => {
        console.log("WebView Load Start");
        setWebViewLoading(true);
      };

      const handleWebViewLoadEnd = () => {
        console.log("WebView Load End");
        setWebViewLoading(false);
      };

      const handleIframeLoadStart = () => {
        console.log("Iframe Load Start");
        setWebViewLoading(true);
      };

      const handleIframeLoad = () => {
        console.log("Iframe Load End");
        setWebViewLoading(false);
      };
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        onPress={() => navigation.goBack()}
        icon={<ShoppingCart color={Colors.primary} size={24} />}
        text="Contest App"
      />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, height: "100%" }}>
          {webViewLoading && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <ActivityIndicator size={30} color={Colors.primary} />
            </View>
          )}
          {Platform.OS === "web" ? (
            <iframe
              style={{ flex: 1, borderWidth: 0 }}
              src={`${contestLink}`}
              title="100Pay - Best crypto platform"
              onLoad={handleIframeLoad}
              onLoadStart={handleIframeLoadStart}
              onError={(e) => {
                console.error("iframe error:", e);
                setWebViewLoading(false); // Ensure to hide loader on error
              }}
            />
          ) : (
            <WebView
              source={{ uri: contestLink }}
              onNavigationStateChange={handleNavigationStateChange}
              style={{ flex: 1 }}
              ref={webViewRef}
              onShouldStartLoadWithRequest={() => true}
              scrollEnabled
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}