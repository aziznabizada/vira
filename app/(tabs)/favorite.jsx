import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getFavorites } from "./../../utils/favoritesStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import { images } from "../../assets/images";

const FavoriteCard = ({ item }) => {
  const imageSource = images[item.image]; // Access the image using the mapping
  return (
    <View style={styles.card}>
      <Link href={`/stories/${item.id}`} asChild>
        <TouchableOpacity>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        const storedFavorites = await getFavorites();
        setFavorites(storedFavorites);
      };
      loadFavorites();
    }, [])
  );

  return (
    <SafeAreaView>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    width: cardWidth,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    paddingVertical: 5,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FavoritesPage;
