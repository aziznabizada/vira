import React from "react";
import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>

      <Text style={styles.sectionTitle}>Who We Are</Text>
      <Text style={styles.paragraph}>
        Welcome to <Text style={styles.appName}>[Your App Name]</Text>! We are a
        team of passionate developers, designers, and creators who believe in
        the power of storytelling. Our mission is to bring inspiring stories and
        content right to your fingertips.
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.paragraph}>
        At <Text style={styles.appName}>[Your App Name]</Text>, we strive to
        empower, inspire, and connect people with stories that matter.
      </Text>

      <Text style={styles.sectionTitle}>Why Choose Us?</Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>User-Centric Design</Text>: We focus on
        creating an intuitive and enjoyable experience.{"\n"}-{" "}
        <Text style={styles.bold}>Quality Content</Text>: Our team curates
        high-quality stories to keep you informed and inspired.{"\n"}-{" "}
        <Text style={styles.bold}>Continuous Improvement</Text>: We’re always
        working to enhance your experience.
      </Text>

      <Text style={styles.sectionTitle}>Get in Touch</Text>
      <Text style={styles.paragraph}>
        We love hearing from our users! Feel free to reach out at:{"\n"}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("mailto:support@yourappname.com")}
        >
          support@yourappname.com
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginTop: 10,
  },
  appName: {
    fontWeight: "bold",
    color: "#000",
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
    marginTop: 5,
  },
});
