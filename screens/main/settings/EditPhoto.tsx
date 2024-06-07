import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../routes/AppStacks";
import { ArrowForward, ArrowRight, Edit } from "iconsax-react-native";
import { Colors } from "../../../components/Colors";
import Photo from "../../../assets/images/DashboardEmojis/Avatar-a.png";
import { MediumText } from "../../../components/styles/styledComponents";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import updateUserRequest from "../../../apis/updateuser";
import { useToast } from "../../../components/CustomToast/ToastContext";
import Loader from "../../../components/Loader/LogoLoader";
import { ThunkDispatch } from "redux-thunk";
import { fetchUserData } from "../../../features/user/userSlice";
import OtpKeypad from "../../../components/CustomPin/OtpKeypad";
import getOtpRequest from "../../../apis/otp";

type EditProfileT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function EditPhoto({ navigation }: EditProfileT) {
  const { fontScale } = useWindowDimensions();
  const [imageUri, setImageUri] = useState(null);
  const [hasMediaLibPermission, setHasMediaLibPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [fetchingImage, setFetchingImage] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const { showToast } = useToast();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [showOtp, setShowOtp ] = useState(false)

  const [updating, setUpdating] = useState(false);
  const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    userProfile,
  } = useSelector((state: RootState) => state.user);

  const getOtp = async () => {
    try{
      setUpdating(true)
      const res = await getOtpRequest({
        token,
        apiKey: activeUserApp?.keys.pub_keys[0].value,
      });
      if(res) {
        setUpdating(false)
        showToast("Code sent", "success");
        setShowOtp(true)
      }
    }catch(err){
      setUpdating(false);
      showToast(err?.message, "error");
    }
  }

  const handleUpdatePhoto = async (avatar, code, excludedFields = ["role", "invitedBy"]) => {
    setUpdating(true);
    // Filter out excluded fields
    const filteredUserProfile = Object.keys(userProfile)
      .filter((key) => !excludedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = userProfile[key];
        return obj;
      }, {});
    const data = { ...filteredUserProfile, avatar, code };
    const apiKey = activeUserApp?.keys.pub_keys[0].value;
    try {
      setUpdating(true);
      const response = await updateUserRequest({
        data,
        token,
        apiKey: activeUserApp?.keys.pub_keys[0].value,
      });

      if (response) {
        setUpdating(false);
        setShowOtp(false);
        dispatch(fetchUserData(token));
        showToast("Photo update successful 🎉", "success");
        navigation.goBack();
      }
    } catch (err) {
      setUpdating(false);
      showToast(err?.message, "error");
    }
  };

  const cloudinaryUpload = async (photo) => {
    setFetchingImage(true)
    try {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "userpfp");
      data.append("cloud_name", "dam9srkbt");
      console.log(data, "from line 90", photo)
       
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dam9srkbt/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

     

      // Log FormData contents for debugging

      if (response.status === 200) {
        // handleUpdatePhoto(response.data?.secure_url);
        console.log(response.data);
        setFetchingImage(false);
        setImageUri(response.data?.secure_url);

        // savePhotoToGallery(response.data?.secure_url);
      }
    } catch (err) {
      setFetchingImage(false);
      showToast(err?.message, "error");
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const openCamera = async () => {
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

    if (!result.canceled) {
      if (result.assets[0].uri) {
        const source = {
          uri: result.assets[0].uri,
          type: "image/png",
          name: `${userProfile?._id}.png`,
          size: result.assets[0].fileSize,
  
        };
        setImageUri(result.assets[0].uri);
        cloudinaryUpload(result.assets[0].uri);
      }
    }
  };

  //   const savePhotoToGallery = async (uri) => {
  //     try {
  //       const asset = await MediaLibrary.createAssetAsync(uri);
  //       await MediaLibrary.createAlbumAsync("Salis Rider", asset);
  //     } catch (error) {
  //       console.log("Error saving photo to gallery:", error);
  //     }
  //   };

  const pickImage = async () => {

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      
    });

    console.log(result, "resultttttt");

    if (!result.canceled) {
      if (result.assets[0].uri) {
        const source = {
          uri: result.assets[0].uri,
          type: "image/png",
          name: `${userProfile?._id}.png`,
        };
        setImageUri(result.assets[0].uri);
        cloudinaryUpload(result.assets[0].uri);
      }
    }
  };

  return (
    <CustomView>
      <CustomHeader
        icon={<Edit variant="TwoTone" color={Colors.primary} />}
        text="Edit Photo"
        onPress={() => (imageUri ? setImageUri(null) : navigation.goBack())}
      />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 50,
        }}
      >
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : userProfile?.avatar && userProfile?.avatar !== "user.png"
              ? { uri: userProfile?.avatar }
              : Photo
          }
          style={{ width: 200, height: 200, borderRadius: 200 }}
        />
      </View>

      <View style={{ marginTop: "auto", gap: 10, paddingVertical: 50 }}>
        {imageUri ? (
          <Button onPress={()=> getOtp()} isLarge={true} variant="primary">
            <MediumText
              style={{ fontSize: 15 / fontScale, color: Colors.white }}
            >
              Save
            </MediumText>
            <ArrowRight variant="TwoTone" color={Colors.white} size={24} />
          </Button>
        ) : (
          <>
            <Pressable style={styles.buttons} onPress={openCamera}>
              <MediumText style={{ fontSize: 15 / fontScale }}>
                Snap Photo
              </MediumText>
            </Pressable>
            <Pressable onPress={pickImage} style={styles.buttons}>
              <MediumText style={{ fontSize: 15 / fontScale }}>
                Select from Gallery
              </MediumText>
            </Pressable>
          </>
        )}
      </View>

      <Loader visible={fetchingImage || updating} />
      <OtpKeypad
        isVisible={showOtp}
        mainTxt={"Enter OTP"}
        subTxt={"Enter the OTP sent to your email here to save changes."}
        onClose={()=> setShowOtp(false)}
        onResendPress={()=> getOtp()}
        onSubmit={(code)=> handleUpdatePhoto(imageUri, code)}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: Colors.ash,
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
