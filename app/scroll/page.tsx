"use client";
import { getDocsData } from "@/lib";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastDoc, setLastdocs] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const newData: any = await getDocsData();
       console.log("New data:", newData);
      setData(newData.data);
      setLastdocs(newData.lastDocument);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (lastDoc && !loading) {
      setIsFetchingMore(true);
      try {
        const newData: any = await getDocsData(lastDoc);
        setData((prevData) => [...prevData, ...newData.data]);
        setLastdocs(newData.lastDocument);
      } catch (error) {
        console.log(error);
      }
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = document.documentElement;
      if (scrollTop === 0 && !loading && !isFetchingMore) {
        handleNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, isFetchingMore, handleNextPage]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Pagination Example</h1>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <>
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <span className="text-red-500">NAME :</span>
              {item.Name}
            </li>
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <span className="text-red-500">EMAIL : </span>
              {item.email}
            </li>
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <span className="text-red-500">PASSWORD : </span>{item.Password}
            </li>
          </>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {isFetchingMore && <p>Fetching more...</p>}
    </div>
  );
}
