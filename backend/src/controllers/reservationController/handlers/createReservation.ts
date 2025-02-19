import { Request, Response } from "express";
import { ReservationModel } from "../../../services/sequelize/models/reservation.model";
import { ZodHandler } from "../../../utils/zod/zod-handler.class";
import { ParamsDictionary } from "express-serve-static-core";
import { Route } from "../../../interfaces/route.interface";
import { createReservationSchema } from "../../../utils/zod/schema/reservation.schema";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { ReservationBody } from "src/interfaces/reservation.interface";

export class createReservation {
  private zodHandler: ZodHandler = new ZodHandler();
  private reservationModel: ReservationModel = new ReservationModel();

  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, ReservationBody>,
    response: Response
  ) => {
    const { body } = request;

    try {
      const errors = await this.zodHandler.validationBody(
        body,
        createReservationSchema
      );

      if (this.zodHandler.isValidationFail(errors)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: httpStatusCode.BAD_REQUEST, errors });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: httpStatusCode.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      const reservation = await this.reservationModel.checkReservationExist(body);

      if (reservation) {
        response.status(httpStatusCode.NOT_FOUND).json({
          message: `Cette Reservation exsite déjà`,
        });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: httpStatusCode.INTERNAL_SERVER_ERROR });
      return;
    }


    try {
      const scooter = await this.reservationModel.checkTimeSlotAvailability(body);

      if (!scooter) {
        response.status(httpStatusCode.NOT_FOUND).json({
          message: `Ce créneau horaire n'est pas disponible`,
        });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: httpStatusCode.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      const newReservation = await this.reservationModel.create(body);

      response.status(httpStatusCode.CREATED).json({
        data: newReservation,
      });
      return;
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: httpStatusCode.INTERNAL_SERVER_ERROR });
      return;
    }
  };
}
