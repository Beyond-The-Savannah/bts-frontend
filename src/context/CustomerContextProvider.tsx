'use client'

import { subscriptionDetailsProps } from "@/types/subscriptions";
import { createContext, ReactNode, useContext } from "react";

const CustomerContext1=createContext<Promise<subscriptionDetailsProps>|null>(null)

export function useCustomerDetails1(){
  
  const userSubscriptionInfo=useContext(CustomerContext1)

  if(!userSubscriptionInfo){throw new Error("useCustomerDetails1 must be used within a UserProvider ")}
  return userSubscriptionInfo
}

export function CustomerContextProvider({children,userSubscriptionInfo}: {children: ReactNode,userSubscriptionInfo:Promise<subscriptionDetailsProps>}) {
  return (
    <CustomerContext1.Provider value={userSubscriptionInfo}>{children}</CustomerContext1.Provider>
  )

}
