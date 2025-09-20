import { CardType } from "@/app";
import ExerciseDropDown from "@/components/ExerciseDropDown";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator
} from "@/components/ui/checkbox";
import { CheckIcon, TrashIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type ExerciseCardProps = {
  id: number;
  initialData?: CardType;
  onRemove: (id: number) => void;
  onConfirm: (
    id: number,
    data: {
      exerciseName: string;
      sets: string;
      reps: string;
      isWarmUp: boolean;
    }
  ) => void;
};

const ExerciseCard = ({
  id,
  onRemove,
  initialData,
  onConfirm
}: ExerciseCardProps) => {
  const [exerciseName, setExerciseName] = useState(
    initialData?.exerciseName || ""
  );
  const [sets, setSets] = useState(initialData?.sets || "");
  const [reps, setReps] = useState(initialData?.reps || "");
  const [isWarmUp, setIsWarmUp] = useState(initialData?.isWarmUp || false);

  useEffect(() => {
    if (initialData) {
      setExerciseName(initialData.exerciseName || "");
      setSets(initialData.sets || "");
      setReps(initialData.reps || "");
      setIsWarmUp(initialData.isWarmUp || false);
    }
  }, [initialData]);

  const confirmCard = () => {
    const data = {
      exerciseName: exerciseName,
      sets: sets,
      reps: reps,
      isWarmUp: isWarmUp
    };
    onConfirm(id, data);
  };

  return (
    <Card
      variant="filled"
      className="mt-5 h-2/5 w-11/12 flex-1 items-center rounded-lg"
    >
      <View className="m-3 w-full">
        <ExerciseDropDown
          onValueChange={setExerciseName}
          value={exerciseName}
        />
        <View className="mt-5 flex-row justify-between">
          <View className="w-1/4 items-center">
            <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 14 }}>
              Warm Up Set
            </Text>
            <Checkbox
              isDisabled={false}
              isInvalid={false}
              size="lg"
              value="Warm Up Sets"
              className="mt-6"
              isChecked={isWarmUp}
              onChange={setIsWarmUp}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
          </View>
          <View className="w-1/4 items-center">
            <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 14 }}>
              Working Sets
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
                onChangeText={text => setSets(text)}
                value={sets}
                inputMode="numeric"
              />
            </Input>
          </View>
          <View className="w-1/4 items-center">
            <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 14 }}>
              Reps
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
            className="h-12 w-1/4 mr-20 bg-[#555555]"
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
