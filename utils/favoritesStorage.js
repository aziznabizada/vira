import AsyncStorage from "@react-native-async-storage/async-storage";

// Get favorites from AsyncStorage
export const getFavorites = async () => {
  try {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Error loading favorites", error);
    return [];
  }
};

// Add a story to favorites
export const addFavorite = async (story) => {
  try {
    const favorites = await getFavorites();
    favorites.push(story);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorite", error);
  }
};

// Remove a story from favorites
export const removeFavorite = async (storyId) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.id !== storyId);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing favorite", error);
  }
};

// Check if a story is a favorite
export const isFavorite = async (storyId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some((fav) => fav.id === storyId);
  } catch (error) {
    console.error("Error checking favorite", error);
    return false;
  }
};
