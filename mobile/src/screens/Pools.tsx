import { FlatList, Icon, useToast, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { PoolCard, PoolPros } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
  const toast = useToast();
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [pools, setPools] = useState<PoolPros[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  async function fetchPools() {
    try {
      const response = await api.get("/pools");
      console.log(response.data);

      setPools(response.data.pools);
    } catch (error) {
      toast.show({
        title: "Não foi listar bolões",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate("find")}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
}
