import ExerciseCard from "@/components/ExerciseCard";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddIcon } from "@/components/ui/icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export interface CardInterface {
  id: number;
  isConfirmed: boolean;
  exerciseName?: string;
  startingWeight?: string;
  sets?: string;
  reps?: string;
}

interface ConfirmedCardProps {
  cardData: CardInterface;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}

const ConfirmedCard = ({ cardData }: ConfirmedCardProps) => (
  <Card className="mt-5 w-11/12 rounded-3xl border p-8">
    <View className="flex-row">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 18 }}>
        Exercise:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 18 }}>
        {cardData.exerciseName}
      </Text>
    </View>
    <View className="mt-1 flex-row">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 18 }}>
        Starting Weight:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 18 }}>
        {cardData.startingWeight}
        {"kg"}
      </Text>
    </View>
    <View className="mt-1 flex-row">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 18 }}>
        Sets:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 18 }}>
        {cardData.sets}
      </Text>
    </View>
    <View className="mt-1 flex-row">
      <Text style={{ fontFamily: "Roboto_600SemiBold", fontSize: 18 }}>
        Reps:{" "}
      </Text>
      <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 18 }}>
        {cardData.reps}
      </Text>
    </View>
  </Card>
);

export default () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const STORAGE_KEY = "@exercise_cards";

  useEffect(() => {
    const loadCards = async () => {
      try {
        const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedCards !== null) {
          setCards(JSON.parse(storedCards));
        } else {
          setCards([{ id: 1, isConfirmed: false }]);
        }
      } catch {
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
        } catch {}
      }
    };
    saveCards();
  }, [cards, isLoading]);

  const handleAddCard = () => {
    const newCard: CardInterface = {
      id: new Date().getTime(),
      isConfirmed: false
    };
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
      startingWeight: string;
      sets: string;
      reps: string;
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
    setModalVisible(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#555" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {cards.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 20,
              color: "#555"
            }}
          >
            No Exercises
          </Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={100}
        >
          <ScrollView
            contentContainerStyle={{ alignItems: "center", paddingBottom: 150 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            {cards.map(card =>
              card.isConfirmed ? (
                <Pressable
                  key={card.id}
                  onLongPress={() => {
                    setSelectedCardId(card.id);
                    setModalVisible(true);
                  }}
                  className="w-full items-center"
                >
                  <ConfirmedCard
                    cardData={card}
                    onRemove={handleRemoveCard}
                    onEdit={handleEditCard}
                  />
                </Pressable>
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
        </KeyboardAvoidingView>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/30"
          onPressOut={() => setModalVisible(false)}
        >
          <View
            className="absolute z-10 w-1/3 rounded-2xl bg-white p-3"
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity
              onPress={() => {
                if (selectedCardId !== null) {
                  handleEditCard(selectedCardId);
                }
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto_600SemiBold",
                  fontSize: 20,
                  color: "#555"
                }}
                className="m-5 mb-8"
              >
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (selectedCardId !== null) {
                  handleRemoveCard(selectedCardId);
                  setModalVisible(false);
                }
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto_600SemiBold",
                  fontSize: 20,
                  color: "red"
                }}
                className="mb-5 ml-5"
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

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
