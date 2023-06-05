import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

interface Activity {
  id: number;
  name: string;
}

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([
    { name: "Go for a walk", id: 1 },
  ]);
  const [activityName, setActivityName] = useState("");

  const handleAddActivity = () => {
    const myActivity: Activity = {
      id: activities.length + 1,
      name: activityName,
    };

    setActivities(activities.concat(myActivity));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form}
        onChangeText={(text) => {
          setActivityName(text);
        }}
        placeholder="Enter an activity here..."
      ></TextInput>
      <Button onPress={handleAddActivity} title="Add activity"></Button>
      <ScrollView style={styles.box}>
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id.toFixed()}
          renderItem={({ item }) => (
            <Text>
              {item.id}. {item.name}
            </Text>
          )}
        ></FlatList>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    marginTop: 50,
  },
  item: {
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    backgroundColor: "green",
    margin: 20,
  },
  form: {
    padding: 8,
    borderWidth: 0.5,
    bottom: 10,
  },
  box: {
    top: 10,
  },
});
