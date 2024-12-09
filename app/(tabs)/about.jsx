import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  // Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons

// import { images } from "../../constants";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Image */}
        {/* <Image
          source={images.aboutUsHeader} // Replace with your header image URL
          style={styles.headerImage}
          resizeMode="cover"
        /> */}

        <Text style={styles.title} className="font-bkoodakbold">
          درباره اپلیکیشن بزک چینی
        </Text>
        <Text style={styles.description} className="font-koodak">
          <Text>
            در دنیای شگفت‌انگیز داستان‌گویی، اینک نوبت کودکانی رسید که مشق
            نویسندگی کرده اند. گروه آموزشی بزک چینی به شما اپلیکیشن بزک چینی را
            معرفی می‌کند حاصل خلاقیت و تخیل کودکان را در معرض دید و شنود شما
            قرار می دهد. این اپلیکیشن مخصوص داستان‌سرایی کودکان طراحی شده است.
            در تیم بزک چینی، دو مربی ارجمند{" "}
            <Text className="font-bold">رحیمه عطایی</Text> و{" "}
            <Text className="font-bold">جهان یعقوبی</Text> از دل و جان مایه
            گذاشته اند و تخیل آنها را به سوی نوشتن، سوق داده اند. آنها در یک
            فرایند پر خم و پیچ برای این کودکان، این امکان را فراهم کرده اند تا
            داستان‌های خود را بنویسند و پادکست آن را تولید کنند. پشت سر هر
            داستان این اپلیکیشن، تخیل و شادی کودکانه است که تبدیل به یک داستان
            مینیمال شده است.
          </Text>
          <Text>
            علاوه بر آن آنها تمرین کرده اند تا این داستان ها را با صدای شیرین و
            دلنشین خود شان روایت کنند. بدون شک کار این کودکان، بدون عیب و نقص
            نیست. مربیان نخواسته اند جلو تخیل آنها را بگیرند، به آنها اجازه داده
            اند تا از محیط پیرامون خود ایده بگیرند، اقتباس کنند، اما آن را با
            قلم و زبان خودشان روایت کنند. تیم بزک چینی بر این باور است که کودکان
            به عنوان نویسندگان، می‌توانند دنیای جدیدی را خلق کنند و احساسات و
            تجربیات خود را با دیگران به اشتراک بگذارند. و ما متعهدیم این درخت
            تخیل را تا جایی که ممکن است بارور تر کنیم. گسترش دنیای تخیل این
            کودکان نیازمند حمایت و همراهی شماست. از هر داستانی که شما را مجذوب
            خود کرده، با حمایت از خود آن کودک و مربیانشان، به رشد و شکوفایی آنها
            کمک کنید. این حمایت می‌تواند با یک لایک ساده، یک تماس محبت‌آمیز یا
            حتی یک هدیه کوچک به نمایش گذاشته شود. بیایید با هم دنیای خلاقیت و
            .خیال‌پردازی را برای این هنرمندان کوچک زیباتر کنیم
          </Text>
        </Text>

        <Text style={styles.subtitle} className="font-bkoodakbold">
          آدرس مکتب ویرا
        </Text>
        <Text style={styles.location} className="font-koodak">
          کابل، جاده شهید مزاری، سرک معرفت، گلستان هشتم، مکتب ویرا
        </Text>

        {/* Icons for Website and Phone Number */}
        <View style={styles.contactIcons}>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="envelope"
              size={24}
              color="#FF9001"
              onPress={() => Linking.openURL("mailto:info@vira-edu.com")}
            />
            <Text
              style={styles.iconText}
              onPress={() => Linking.openURL("mailto:info@vira-edu.com")}
            >
              info@vira-edu.com
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome
              name="globe"
              size={24}
              color="#FF9001"
              onPress={() => Linking.openURL("https://vira-edu.com")}
            />
            <Text
              style={styles.iconText}
              onPress={() => Linking.openURL("https://vira-edu.com")}
            >
              www.vira.af
            </Text>
          </View>
        </View>

        <Text style={styles.footer} className="font-koodak">
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
