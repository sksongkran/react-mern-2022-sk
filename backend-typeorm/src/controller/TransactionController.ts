import { NextFunction, Request, Response } from "express";
import { Transactions } from "../entity/Transactions";
import { AppDataSource } from "../data-source";
import { ObjectID } from "mongodb";
import { generateSeq } from "../utils/cm-util";
import { TypedParamRequest } from "../types/Request.types";

export class TransactionController {
  private transRepo = AppDataSource.getMongoRepository(Transactions);

  async all(req: Request, res: Response, next: NextFunction) {
    const data = await this.transRepo
      .aggregate([
        { $match: { paid: { $gt: 600 } } },
        { $match: { paid: { $lt: 1500 } } },
        {
          $lookup: {
            from: "users",
            localField: "staff_id",
            foreignField: "_id",
            as: "staff",
          },
        },
        { $unwind: "$staff" },
        {
          $project: {
            "staff.password": 0,
          },
        },
        {
          $addFields: {
            staff_id: "$staff.username",
          },
        },
        {
          $project: {
            staff: 0,
          },
        },
      ])
      .sort({ timestamp: -1 });
    return data.toArray();
  }

  async between(req: Request, res: Response, next: NextFunction) {
    console.log(JSON.stringify(req.params));
    var startDate = new Date(req.params.startDate);
    var endDate = new Date(req.params.endDate);
    console.log(startDate);
    console.log(endDate);

    const data = await this.transRepo
      .aggregate([
        {
          $match: {
            timestamp: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "staff_id",
            foreignField: "_id",
            as: "staff",
          },
        },
        { $unwind: "$staff" },
        {
          $addFields: {
            staff_id: "$staff.username",
          },
        },
        {
          $project: {
            staff: 0,
          },
        },
      ])
      .sort({ timestamp: -1 });
    return data.toArray();
  }

  async add(req, res: Response, next: NextFunction) {
    try {
      req.body.staff_id = ObjectID(req.userId);
      req.body.transaction_id = await generateSeq("transaction_id");
      req.body.timestamp = new Date();
      req.body.__v = 0;

      const doc = await this.transRepo.save(req.body);
      return { result: "ok", message: doc };
    } catch (e) {
      return { result: "nok", message: "invalid data" };
    }
  }

  async one(
    req: TypedParamRequest<Transactions>,
    res: Response,
    next: NextFunction
  ) {
    return await this.transRepo.findOne({
      where: {
        transaction_id: Number(req.params.transaction_id),
      },
    });
  }
}
