import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { globalStyles } from "../styles/global";
import PostItem from "../components/PostItem";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Home({ navigation: propNavigation }) {
  const navigation = propNavigation || useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/posts`,
    }).then((response) => {
      setPosts(response.data);
    });
  }, []);

  // if (!navigation) {
  //   return <Text>Loading...</Text>; // Display a loading text or any other placeholder if navigation is not ready
  // }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
          marginLeft: 0,
        }}
      >
        <View>
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 120, height: 80 }}
          />
        </View>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={(post) => navigation.navigate("AddPost", { post })}
        >
          <Text style={styles.post}>Add Post</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={globalStyles.bigTitle}>Posts</Text>
      </View>
      <View style={styles.posts}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={{ marginTop: 15 }}>
              <PostItem item={item} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 5,
    flex: 1,
  },
  posts: {
    paddingLeft: 20,
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
  },
});
