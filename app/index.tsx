import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import exercisesData from "../data/exercises.json";

export default () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const sortedData = useMemo(() => {
    const formattedData = exercisesData.exercises.map(exercise => ({
      label: exercise.name,
      value: exercise.id
    }));

    return formattedData.sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="w-11/12 m-5">
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && { borderColor: "#3b3b3b", borderWidth: 2 }
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={sortedData}
          search={true}
          dropdownPosition="bottom"
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select exercise"
          searchPlaceholder="Search exercise..."
          fontFamily="Roboto_400Regular"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={exercise => {
            setValue(exercise.value);
            setIsFocus(false);
          }}
          autoScroll={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    width: "97%"
  }
});
