import ExerciseCard from "@/components/ExerciseCard";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddIcon, EditIcon, TrashIcon } from "@/components/ui/icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export type CardType = {
  id: number;
  isConfirmed: boolean;
  exerciseName?: string;
  sets?: string;
  reps?: string;
  isWarmUp?: boolean;
};

type ConfirmedCardProps = {
  cardData: CardType;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
};

const ConfirmedCard = ({ cardData, onRemove, onEdit }: ConfirmedCardProps) => (
  <Card variant="filled" className="mt-5 w-11/12 items-center rounded-lg p-3">
    <View className="flex-row items-center mt-5">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 16 }}>
        Exercise:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 16 }}>
        {cardData.exerciseName}
      </Text>
    </View>
    <View className="flex-row items-center">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 16 }}>
        Warm Up Set:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 16 }}>
        {cardData.isWarmUp ? "Yes" : "No"}
      </Text>
    </View>
    <View className="flex-row items-center">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 16 }}>
        Working Sets:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 16 }}>
        {cardData.sets}
      </Text>
    </View>
    <View className="flex-row items-center">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 16 }}>
        Reps:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 16 }}>
        {cardData.reps}
      </Text>
    </View>
    <View className="flex-row justify-center my-10">
      <Button
        onPress={() => onRemove(cardData.id)}
        variant="solid"
        className="h-12 w-1/4 bg-[#555555] mr-20"
      >
        <ButtonIcon as={TrashIcon} className="h-7 w-7" />
      </Button>
      <Button
        onPress={() => onEdit(cardData.id)}
        variant="solid"
        className="h-12 w-1/4 bg-[#555555]"
      >
        <ButtonIcon as={EditIcon} className="h-7 w-7" />
      </Button>
    </View>
  </Card>
);

export default () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = "@workout_cards";

  useEffect(() => {
    const loadCards = async () => {
      try {
        const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedCards !== null) {
          setCards(JSON.parse(storedCards));
        } else {
          setCards([{ id: 1, isConfirmed: false }]);
        }
      } catch (e) {
        console.error("Failed to load cards.", e);
        setCards([{ id: 1, isConfirmed: false }]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, []);

  useEffect(() => {
    const saveCards = async () => {
      if (!isLoading) {
        try {
          const jsonValue = JSON.stringify(cards);
          await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (e) {
          console.error("Failed to save cards.", e);
        }
      }
    };

    saveCards();
  }, [cards, isLoading]);

  const handleAddCard = () => {
    const newCard: CardType = { id: new Date().getTime(), isConfirmed: false };
    setCards(currentCards => [...currentCards, newCard]);
  };

  const handleRemoveCard = (idToRemove: number) => {
    setCards(currentCards =>
      currentCards.filter(card => card.id !== idToRemove)
    );
  };

  const handleConfirmCard = (
    idToConfirm: number,
    data: {
      exerciseName: string;
      sets: string;
      reps: string;
      isWarmUp: boolean;
    }
  ) => {
    setCards(currentCards =>
      currentCards.map(card =>
        card.id === idToConfirm ? { ...card, ...data, isConfirmed: true } : card
      )
    );
  };

  const handleEditCard = (idToEdit: number) => {
    setCards(currentCards =>
      currentCards.map(card =>
        card.id === idToEdit ? { ...card, isConfirmed: false } : card
      )
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#555555" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ alignItems: "center", paddingBottom: 120 }}
        keyboardDismissMode="on-drag"
      >
        {cards.map(card =>
          card.isConfirmed ? (
            <ConfirmedCard
              key={card.id}
              cardData={card}
              onRemove={handleRemoveCard}
              onEdit={handleEditCard}
            />
          ) : (
            <ExerciseCard
              key={card.id}
              initialData={card}
              id={card.id}
              onRemove={handleRemoveCard}
              onConfirm={handleConfirmCard}
            />
          )
        )}
      </ScrollView>
      <View className="absolute bottom-5 right-5">
        <Button
          variant="solid"
          className="mb-10 h-20 w-20 rounded-full bg-[#555555]"
          onPress={handleAddCard}
        >
          <ButtonIcon as={AddIcon} className="h-10 w-10" />
        </Button>
      </View>
    </View>
  );
};
