import { getScooters } from "@/utils/api/scooter";
import { Scooter } from "@/utils/interfaces/scooters.interface";
import { useEffect, useState } from "react";

export const useScooters = () => {
  const [scooters, setScooters] = useState<Scooter[]>([]);

  useEffect(() => {
    const fetchScooters = async () => {
      const scooters = await getScooters();

      setScooters(scooters);
    };

    fetchScooters();
  }, []);

  return { scooters };
};
