import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import Store from "@/store/context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { counter, setCounter } = useContext(Store);

  useEffect(() => {
    const id = setTimeout(() => {
    console.log(counter);

    const fetchData = async () => {
      const res = await fetch("api/" + counter);
      const data = await res.json();
      if (!res.ok) console.log("خطا");
      else console.log(data);
    };
    fetchData().then(() => {
      setCounter((prev: number) => prev + 1);
    });
    }, 30 * 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return <main>Hello</main>;
}
