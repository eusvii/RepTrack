import { CardInterface } from "@/app";
import ExerciseDropDown from "@/components/ExerciseDropDown";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, TrashIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

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

  useEffect(() => {
    if (initialData) {
      setExerciseName(initialData.exerciseName || "");
      setStartingWeight(initialData.startingWeight || "");
      setSets(initialData.sets || "");
      setReps(initialData.reps || "");
    }
  }, [initialData]);

  const confirmCard = () => {
    const data = {
      exerciseName: exerciseName,
      startingWeight: startingWeight,
      sets: sets,
      reps: reps
    };
    onConfirm(id, data);
  };

  return (
    <Card
      variant="filled"
      className="mt-5 h-2/5 w-11/12 flex-1 items-center rounded-lg"
    >
      <View className="m-3 w-full">
        <ExerciseDropDown onValueChange={setExerciseName} name={exerciseName} />
        <View className="mt-5 flex-row justify-between">
          <View className="w-1/4">
            <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 14 }}>
              Starting Weight (kg)
            </Text>
            <Input
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mt-3 rounded-lg border-[#ddd]"
            >
              <InputField
                placeholder="0"
                onChangeText={text => setStartingWeight(text)}
                value={startingWeight}
                inputMode="numeric"
              />
            </Input>
          </View>
          <View className="w-1/4">
            <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 14 }}>
              Working Sets
            </Text>
            <Input
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mt-7 rounded-lg border-[#ddd]"
            >
              <InputField
                placeholder="0"
                onChangeText={text => setSets(text)}
                value={sets}
                inputMode="numeric"
              />
            </Input>
          </View>
          <View className="w-1/4">
            <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 14 }}>
              Reps
            </Text>
            <Input
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="mt-7 rounded-lg border-[#ddd]"
            >
              <InputField
                placeholder="0"
                onChangeText={text => setReps(text)}
                value={reps}
                inputMode="numeric"
              />
            </Input>
          </View>
        </View>
        <View className="my-10 flex-row justify-center">
          <Button
            variant="solid"
            action="primary"
            className="mr-20 h-12 w-1/4 bg-[#555555]"
            onPress={() => onRemove(id)}
          >
            <ButtonIcon as={TrashIcon} className="h-7 w-7" />
          </Button>
          <Button
            variant="solid"
            action="primary"
            className="h-12 w-1/4 bg-[#555555]"
            onPress={confirmCard}
          >
            <ButtonIcon as={CheckIcon} className="h-8 w-8" />
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default ExerciseCard;
