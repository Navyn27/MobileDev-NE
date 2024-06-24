import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from "../styles/global";
import Comment from "../components/Comment";
import axios from "axios";

export default function Post({ item }) {
  console.log(item);
  const post = {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  };
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, []);

  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`
      );
      if (response.status === 200) {
        Alert.alert("SUCCESS!", "Post deleted successfully");
      } else {
        throw new Error("Failed to delete the post");
      }
    } catch (error) {
      alert("ERROR!", `Error deleting post: ${error.message}`);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Posts</Text>
      <View style={styles.post}>
        <Text style={globalStyles.titleText}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>
      <View style={styles.comments}>
        <Text style={styles.title2}>Comments</Text>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </View>
      <Button title="Delete Post" onPress={deletePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  title2: {
    fontWeight: "bold",
    fontSize: 26,
  },
  post: {
    marginTop: 20,
    fontSize: 25,
  },
  body: {
    marginTop: 15,
  },
  comments: {
    marginTop: 15,
  },
});
