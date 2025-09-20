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
import { useState } from "react";
import { Text, View } from "react-native";

type ExerciseCardProps = {
  id: number;
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

const ExerciseCard = ({ id, onRemove, onConfirm }: ExerciseCardProps) => {
  const [setsValue, setSetsValue] = useState("");
  const [repsValue, setRepsValue] = useState("");
  const [isWarmUpSet, setIsWarmUpSet] = useState(false);
  const [exerciseName, setExerciseName] = useState("");

  const confirmCard = () => {
    const data = {
      exerciseName: exerciseName,
      sets: setsValue,
      reps: repsValue,
      isWarmUp: isWarmUpSet
    };
    onConfirm(id, data);
  };

  return (
    <Card
      variant="filled"
      className="mt-5 h-2/5 w-11/12 flex-1 items-center rounded-lg"
    >
      <View className="m-3 w-full">
        <ExerciseDropDown onValueChange={setExerciseName} />
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
              isChecked={isWarmUpSet}
              onChange={setIsWarmUpSet}
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
                onChangeText={text => setSetsValue(text)}
                value={setsValue}
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
                onChangeText={text => setRepsValue(text)}
                value={repsValue}
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
