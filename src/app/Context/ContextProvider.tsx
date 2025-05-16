'use client';
import { info } from 'console';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ContextProviderProps {
  children: ReactNode;
}
interface Phone {
  _id: string;
  seller_name: string;
  phone_number: string;
  email: string;
  location: string;
  brand: string;
  category_id: string;
  picture: string;
  ram: string;
  camera: string;
  usage_duration: string;
  posted_date: string;
  resale_price: string;
  original_price: string;
  phone_name: string;
  phone_description: string;
  // add other fields as per your API
}


interface GlobalContextType {
    phones: Phone[] | null;
    SetPhones: (phones: Phone[] | null) => void;
    // loading: boolean;
    // error: string | null;
  }

// export const GlobalContext = createContext({});

export const GlobalContext = createContext<GlobalContextType>({
    phones: null,
    SetPhones: () => {},
    // loading: false,
    // error: null,
  });
// export const GlobalContext = createContext<GlobalContextType>({
//     phones: null,
//     SetPhones: () => {},
//     // loading: false,
//     // error: null,
//   });

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [phones, SetPhones] = useState<Phone[] | null>(null);
  useEffect(() => {
    fetch(`/api/phones`)
      .then((res) => res.json())
      .then((data) => SetPhones(data));
  }, [SetPhones]);

  // const { data: appointmentOptions = [], refetch } = useQuery({
  //     queryKey: ['appointmentOptions', date],
  //     queryFn: async () => {
  //       const res = await fetch(
  //         `http://localhost:5000/appointmentOptions?date=${date}`
  //       );
  //       const data = await res.json();
  //       return data;
  //     },
  //   });

  const info = {
    phones,
    SetPhones,
  };
  return (
    <GlobalContext.Provider value={info}>{children}</GlobalContext.Provider>
  );
};

export default ContextProvider;
