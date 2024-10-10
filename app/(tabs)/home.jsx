import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons

import { images } from "../../constants";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Image */}
        <Image
          source={images.aboutUsHeader} // Replace with your header image URL
          style={styles.headerImage}
          resizeMode="cover"
        />

        <Text style={styles.title}>درباره ما</Text>
        <Text style={styles.description}>
          در مکتب ویرا، ما به ارائه آموزش با کیفیت و ایجاد یک محیط حمایتی برای
          دانش‌آموزان متعهد هستیم. هدف ما پرورش خلاقیت، تفکر انتقادی و عشق به
          یادگیری در دانش‌آموزان است.
        </Text>

        <Text style={styles.subtitle}>مراکز پخش</Text>
        <Text style={styles.location}>
          کابل، جاده شهید مزاری، بعد از ایستگاه تانک تیل، کتابفروشی اقرأ
        </Text>
        <Text style={styles.location}>
          کابل، خیرخانه، چهارراهی قلعه نجارها، پلازای احمدیار، طبقه دوم، کتاب
          زریاب
        </Text>

        <Text style={styles.subtitle}>آدرس مکتب ویرا</Text>
        <Text style={styles.location}>
          کابل، جاده شهید مزاری، سرک معرفت، گلستان هشتم، مکتب ویرا
        </Text>

        {/* Icons for Website and Phone Number */}
        <View style={styles.contactIcons}>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="phone"
              size={24}
              color="#FF9001"
              onPress={() => Linking.openURL("tel:0799448050")}
            />
            <Text
              style={styles.iconText}
              onPress={() => Linking.openURL("tel:0799448050")}
            >
              0799448050
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="globe"
              size={24}
              color="#FF9001"
              onPress={() => Linking.openURL("http://www.vira.af")}
            />
            <Text
              style={styles.iconText}
              onPress={() => Linking.openURL("http://www.vira.af")}
            >
              www.vira.af
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          حق هر گونه انتشار برای مکتب ویرا محفوظ است.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 16,
  },
  headerImage: {
    width: "100%",
    height: 200, // Adjust height as needed
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  contact: {
    fontSize: 16,
    marginBottom: 8,
  },
  contactIcons: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#FF9001",
  },
  footer: {
    fontSize: 14,
    marginTop: 16,
    color: "#666",
    textAlign: "center",
  },
});
