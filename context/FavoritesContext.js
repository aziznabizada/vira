import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const FavoritesContext = createContext();

// Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from AsyncStorage when the provider mounts
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  // Function to toggle favorite status
  const toggleFavorite = async (storyId) => {
    let updatedFavorites;
    if (favorites.includes(storyId)) {
      updatedFavorites = favorites.filter((id) => id !== storyId);
    } else {
      updatedFavorites = [...favorites, storyId];
    }
    setFavorites(updatedFavorites);

    // Save updated favorites to AsyncStorage
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  console.log(favorites);
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use favorites context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
