import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Comment = ({ comment }) => {
  return (
    <View style={styles.comment}>
      <Text style={{ fontWeight: "bold" }}>{comment.name}</Text>
      <Text>{comment.body}</Text>
    </View>
  );

  return <View></View>;
};

export default Comment;

const styles = StyleSheet.create({
  comment: {},
});
