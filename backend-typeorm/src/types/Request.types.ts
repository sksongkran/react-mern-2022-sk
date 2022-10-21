import { Query } from "typeorm/driver/Query";
import * as Express from "express";

export interface TypedBodyRequest<U> extends Express.Request {
  body: U;
}

export interface TypedParamRequest<U> extends Express.Request {
  params: U;
}

export interface TypedQueryRequest<T extends Query> extends Express.Request {
  query: T;
}

export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U;
  query: T;
}
