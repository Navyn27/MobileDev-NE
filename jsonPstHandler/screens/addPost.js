import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import axios from "axios";
import { TouchableOpacity } from "react-native";

export default function ReviewDetails({ navigation: propNavigation }) {
  const [userId, setUserId] = useState(null);
  const [body, setBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const navigation = propNavigation || useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const validateUser = (id) => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => true)
      .catch((error) => false);
  };
  const savePost = async () => {
    try {
      if (!userId) {
        Alert.alert("OOPS!", "The User Id field must not be empty");
      } else if (!validateUser(userId)) {
        Alert.alert("OOPS!", "The entered user does not exist");
      } else if (!postTitle) {
        Alert.alert("OOPS!", "The Post Title field must not be empty");
      } else if (!body) {
        Alert.alert("OOPS!", "The Post Body field must not be empty");
      } else if (body.length < 10) {
        Alert.alert(
          "OOPS!",
          "The Post Content should be more than 10 characters long"
        );
      } else {
        setIsLoading(true);
        const response = await axios.post(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            userId,
            title: postTitle,
            body,
          }
        );
        if (response.status === 201) {
          Alert.alert(
            "SUCCESS!",
            `You have created a new post:\n ${JSON.stringify(
              response.data.title
            )}`
          );
          setIsLoading(false);
          setUserId("");
          setPostTitle("");
          setBody("");
          navigation.navigate("Home");
        } else {
          throw new Error("An error has occurred");
        }
      }
    } catch (error) {
      alert("ERROR!", error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback
      omPress={() => {
        Keyboard.dismiss;
      }}
    >
      <View style={globalStyles.container}>
        <Text style={globalStyles.bigTitle}>Create a new post</Text>
        <View style={styles.inputs}>
          <Text style={styles.labelText}>User Id</Text>
          <TextInput
            style={styles.inputField}
            placeholder="User Id"
            keyboardType="numeric"
            value={userId}
            onChangeText={(val) => {
              setUserId(val);
            }}
          />
          <Text style={styles.labelText}>Post title</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Post Title"
            onChangeText={(val) => {
              setPostTitle(val);
            }}
            value={postTitle}
          />
          <Text style={styles.labelText}>Post Body</Text>
          <TextInput
            style={styles.inputField2}
            placeholder="Post Body"
            onChangeText={(val) => {
              setBody(val);
            }}
            value={body}
          />
          {isLoading ? (
            <TouchableOpacity style={styles.btn}>
              <View>
                <Text style={styles.btnText}>Saving...</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={savePost}>
              <View>
                <Text style={styles.btnText}>Save Post</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  inputs: {
    marginTop: 50,
  },
  inputField: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 7,
    paddingLeft: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  inputField2: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 7,
    paddingLeft: 20,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    fontSize: 15,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 7,
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#00417D",
  },
});
