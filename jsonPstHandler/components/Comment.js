import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Comment = ({ comment }) => {
  return (
    <View style={styles.comment}>
      <Text style={{ fontWeight: "bold", marginBottom: 3, color: "#00417D" }}>
        {comment.name}
      </Text>
      <Text>{comment.body}</Text>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  comment: {
    marginTop: 8,
  },
});
