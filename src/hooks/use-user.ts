'use client'

import { UserContext } from "@/contexts/user";
import { useContext } from "react";

export function useUser(){
  const value = useContext(UserContext)
  return value
}