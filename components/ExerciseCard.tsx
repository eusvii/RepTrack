import { CardInterface } from "@/app";
import ExerciseDropDown from "@/components/ExerciseDropDown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

interface ExerciseCardProps {
  id: number;
  initialData?: CardInterface;
  onRemove: (id: number) => void;
  onConfirm: (
    id: number,
    data: {
      exerciseName: string;
      startingWeight: string;
      sets: string;
      reps: string;
    }
  ) => void;
}

const ExerciseCard = ({
  id,
  initialData,
  onRemove,
  onConfirm
}: ExerciseCardProps) => {
  const [exerciseName, setExerciseName] = useState(
    initialData?.exerciseName || ""
  );
  const [startingWeight, setStartingWeight] = useState(
    initialData?.startingWeight || ""
  );
  const [sets, setSets] = useState(initialData?.sets || "");
  const [reps, setReps] = useState(initialData?.reps || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setExerciseName(initialData.exerciseName || "");
      setStartingWeight(initialData.startingWeight || "");
      setSets(initialData.sets || "");
      setReps(initialData.reps || "");
    }
  }, [initialData]);

  const confirmCard = () => {
    if (!exerciseName || !startingWeight || !sets || !reps) {
      setError(true);
      missingDataAlert();
      return;
    }

    setError(false);

    const data = {
      exerciseName: exerciseName,
      startingWeight: startingWeight,
      sets: sets,
      reps: reps
    };
    onConfirm(id, data);
  };

  const missingDataAlert = () => {
    Alert.alert("Empty Fields", "Please fill out all fields.", [
      { text: "Close", style: "default" }
    ]);
  };

  return (
    <Card
      variant="filled"
      className="mt-5 w-11/12 flex-1 items-center rounded-3xl border"
    >
      <View className="m-3 w-11/12">
        <ExerciseDropDown onValueChange={setExerciseName} name={exerciseName} />
        <View className="mt-7 flex-row justify-between">
          <View className="w-1/4 flex-col">
            <Text
              style={{
                fontFamily: "Roboto_600SemiBold",
                fontSize: 14
              }}
            >
              Starting Weight (kg)
            </Text>
            <Input
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mt-3 rounded-lg border-black focus:border-2"
            >
              <InputField
                placeholder="0"
                onChangeText={text => setStartingWeight(text)}
                value={startingWeight}
                inputMode="decimal"
                maxLength={6}
              />
            </Input>
          </View>
          <View className="w-1/4 flex-col">
            <Text
              style={{
                fontFamily: "Roboto_600SemiBold",
                fontSize: 14
              }}
            >
              Working Sets
            </Text>
            <Input
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mt-7 rounded-lg border-black focus:border-2"
            >
              <InputField
                placeholder="0"
                onChangeText={text => setSets(text)}
                value={sets}
                inputMode="numeric"
                maxLength={2}
              />
            </Input>
          </View>
          <View className="w-1/4 flex-col">
            <Text
              style={{
                fontFamily: "Roboto_600SemiBold",
                fontSize: 14
              }}
            >
              Reps
            </Text>
            <Input
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mt-7 rounded-lg border-black focus:border-2"
            >
              <InputField
                placeholder="0"
                onChangeText={text => setReps(text)}
                value={reps}
                inputMode="numeric"
                maxLength={2}
              />
            </Input>
          </View>
        </View>
        <View className="mt-10 h-12 flex-row justify-center">
          <Button
            variant="solid"
            action="primary"
            className="mr-10 h-full w-1/3 self-center rounded-lg bg-red-600"
            onPress={() => onRemove(id)}
          >
            <Text
              style={{
                fontFamily: "Roboto_600SemiBold",
                fontSize: 16,
                color: "white"
              }}
            >
              Delete
            </Text>
          </Button>
          <Button
            variant="solid"
            action="primary"
            className="h-full w-1/3 self-center rounded-lg bg-[#555555]"
            onPress={confirmCard}
          >
            <Text
              style={{
                fontFamily: "Roboto_600SemiBold",
                fontSize: 16,
                color: "white"
              }}
            >
              Confirm
            </Text>
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default ExerciseCard;
