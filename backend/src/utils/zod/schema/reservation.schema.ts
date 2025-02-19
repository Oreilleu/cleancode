import { z } from "zod";
import { reservationErrorMessage } from "../../../enums/error-message.enum";

export const createReservationSchema = z.object({
  clientId: z
    .string({
      required_error: reservationErrorMessage.EMPTY_CLIENT_ID,
      invalid_type_error: reservationErrorMessage.INVALID_TYPE_CLIENT_ID,
    })
    .nonempty({ message: reservationErrorMessage.EMPTY_CLIENT_ID }),
  scooterId: z
    .string({
      required_error: reservationErrorMessage.EMPTY_SCOOTER_ID,
      invalid_type_error: reservationErrorMessage.INVALID_TYPE_SCOOTER_ID,
    })
    .nonempty({ message: reservationErrorMessage.EMPTY_SCOOTER_ID }),
  startTime: z.date({
    required_error: reservationErrorMessage.EMPTY_START_TIME,
    invalid_type_error: reservationErrorMessage.INVALID_TYPE_START_TIME,
  }),
  endTime: z.date({
    required_error: reservationErrorMessage.EMPTY_END_TIME,
    invalid_type_error: reservationErrorMessage.INVALID_TYPE_END_TIME,
  }),
});
