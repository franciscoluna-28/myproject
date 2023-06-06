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
  Alert
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Activity {
  id: number;
  name: string;
}

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityName, setActivityName] = useState("");

  const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'You cannot add an empty text!',
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
    }
  );

  const handleAddActivity = () => {

    if (activityName.trim() === "") {
      showAlert();
       // No se añade la actividad si el campo está vacío
    } else {

    const myActivity: Activity = {
      id: generateUniqueID(),
      name: activityName,
    };
  

    setActivities(activities.concat(myActivity));
    setActivityName("")
  };
  };

  const handleDeleteActivity = (id: number) => {
    const filteredActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(filteredActivities);
  };

  const generateUniqueID = (): number => {
    let newID = activities.length + 1;
    while (activities.some((activity) => activity.id === newID)) {
      newID++;
    }
    return newID;
  };





  // There's a bug, the activities should never have the same ID

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Todolist</Text>
      <TextInput
        style={styles.form}
        value={activityName}
        onChangeText={(text) => {
          setActivityName(text);
        }}
        placeholder="Enter an activity here..."
      ></TextInput>
      <Button onPress={handleAddActivity} title="Add new activity"></Button>

      {activities.length !== 0 ? (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.viewContainer}>
              <Text>
                {item.id}. {item.name}
              </Text>

              <MaterialIcons
                onPress={() => handleDeleteActivity(item.id)}
                name="delete"
                size={24}
                color="black"
              />
            </View>
          )}
        />
      ) : (
        <Text>No activities available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    marginTop: 50,
    alignSelf: 'stretch',
    paddingHorizontal: 60
  },
  item: {
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    backgroundColor: "green",
    margin: 20,
  },
  form: {
    padding: 10,
    borderWidth: 0.5,
    bottom: 10,
  },
  box: {
    top: 10,
    paddingTop: 10,
    marginTop: 10,
  },
  viewContainer: {
    padding: 20,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    gap: 2,
    marginTop: 20,


  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 5,
  },
  boxesContainer: {
    flex: 1,
    gap: 4,
    flexDirection: "column",
  }
});
