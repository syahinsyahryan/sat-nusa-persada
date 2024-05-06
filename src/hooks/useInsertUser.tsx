import { useEffect, useState } from "react";
import { insertUser } from "@/api";
import { User } from "@/utils/interface";
import { AxiosResponse } from "axios";

export const useInsertUser = (): ((payload: User) => Promise<void>) => {
  return async (payload: User) => {
    try {
      await insertUser(payload);
    } catch (error) {
      throw new Error("Failed to insert user. Please try again later.");
    }
  };
};
