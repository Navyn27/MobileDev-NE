import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PostItem = ({ item }, { navigation: propNavigation }) => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigation = propNavigation || useNavigation();
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
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
      .then((response) => {
        console.log("Item deleted", response);
        Alert.alert("SUCCESS!", "Post Deleted");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
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
        <TouchableOpacity
          style={styles.readTouchable}
          onPress={(item) => navigation.navigate("Post")}
        >
          <View>
            <Text style={styles.btnText}>Read Blog</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Ionicons name="trash-outline" size={24} color="#395f4e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
    paddingRight: 30,
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
    borderColor: "#395f4e",
    borderWidth: 1,
    padding: 7,
    height: 40,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#395f4e",
  },
  btnText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PostItem;
