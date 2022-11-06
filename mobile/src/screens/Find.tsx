import { VStack, Text, Heading, useToast } from "native-base";
import { Header } from "../components/Header";

import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const toast = useToast();
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      setIsLoading(false);
      navigate("pools");
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Pool not found.") {
        return toast.show({
          title: "Bolão não encontrado",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already joined this pool.") {
        return toast.show({
          title: "Voce já está nesse bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possível encontrar bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontrar um bolão através de {"\n"}
          seu código únicor
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
