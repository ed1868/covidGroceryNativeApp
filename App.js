import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  ImageBackground,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  const image = {
    uri:
      "https://www.wilsoncenter.org/sites/default/files/styles/embed_text_block/public/media/uploads/images/shutterstock_1662701254.jpg",
  };

  return (
    <ImageBackground source={image} style={styles.image}>
    <View style={styles.screen}>
      <Text style={styles.header}>Get in and Get out as fast as possible</Text>
        <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
        <GoalInput
          visible={isAddMode}
          onAddGoal={addGoalHandler}
          onCancel={cancelGoalAdditionHandler}
        />
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              id={itemData.item.id}
              onDelete={removeGoalHandler}
              title={itemData.item.value}
            />
          )}
        />
   
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
header:{
  fontSize:30,
  color:"white",
  fontWeight: "bold",
},
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
