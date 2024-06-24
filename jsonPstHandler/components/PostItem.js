import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PostItem = ({ item, updatePosts }, { navigation: propNavigation }) => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigation = propNavigation || useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        setUsername(response.data.name);
        setUserEmail(response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const deleteItem = () => {
    updatePosts(item);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
      .then((response) => {
        Alert.alert("SUCCESS!", "Post Deleted");
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("ERROR!", error.message);
      });
  };

  if (!username) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.post}>
      <View>
        <View>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.touchables}>
        <TouchableOpacity onPress={(item) => navigation.navigate("Post")}>
          <View style={styles.next}>
            <View>
              <Text style={styles.btnText}>Read Blog</Text>
            </View>
            <View>
              <Ionicons
                name="arrow-forward-outline"
                size={15}
                color="#00417D"
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          {isLoading ? (
            <Ionicons name="trash-outline" size={24} color="#00417D" />
          ) : (
            <Ionicons name="trash-bin-outline" size={24} color="#00417D" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
    paddingRight: 30,
    borderBottomColor: "grey",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  next: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
  },
  email: {
    fontWeight: "bold",
    color: "grey",
  },
  title: {
    fontSize: 20,
  },
  touchables: {
    marginTop: 14,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readTouchable: {
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "#00417D",
    borderWidth: 1,
    padding: 7,
    height: 40,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#00417D",
  },
  btnText: {
    color: "#00417D",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PostItem;
