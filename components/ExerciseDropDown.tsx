import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import exercisesData from "../data/exercises.json";

const ITEM_HEIGHT = 50;

interface DropdownItem {
  label: string;
  value: string | number;
}

type ExerciseDropDownProps = {
  onValueChange: (value: string) => void;
};

const ExerciseDropDown = ({ onValueChange }: ExerciseDropDownProps) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const getItemLayout = (
    data: ArrayLike<DropdownItem> | null | undefined,
    index: number
  ) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  });

  const sortedData = useMemo(() => {
    const formattedData = exercisesData.exercises.map(exercise => ({
      label: exercise.name,
      value: exercise.id
    }));

    return formattedData.sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  return (
    <Dropdown
      style={[
        styles.dropdown,
        isFocus && { borderColor: "#555555", borderWidth: 2 }
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
        onValueChange(exercise.label);
      }}
      autoScroll={false}
      flatListProps={{
        getItemLayout: getItemLayout,
        initialNumToRender: 15
      }}
    />
  );
};

export default ExerciseDropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
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
