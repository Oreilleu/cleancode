import toast from "react-hot-toast";
import { globalErrorMessage } from "../enums/error-message.enum";
import { LocalStorageKey } from "../enums/localstorage-key.enum";
import { ResponseError } from "../interfaces/response-error.interface";
import { getLocalStorage } from "../localstorage-handler";
import { Scooter } from "../interfaces/scooters.interface";

export const getScooters = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/scooter/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalStorage(LocalStorageKey.TOKEN)}`,
      },
    }
  );

  if (!response.ok) {
    const json: ResponseError = await response.json();

    toast.error(json.message || globalErrorMessage.ERROR_OCCURRED);
    return [];
  }

  const json: { scooters: Scooter[] } = await response.json();

  return json.scooters;
};
