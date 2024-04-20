"use client";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCokkies, getDocsData } from "@/lib";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<{email: string, userId: string}>();
  const [paginatedData, setPaginatedData] = useState(null);

  // const { isLoading, error, user } = useSelector((state: any) => state.auth);
  // const router = useRouter();
  // console.log(router)
  // const searchParams = useSearchParams();
  // const user = searchParams.getAll("user");
  // const email = searchParams.getAll("email");
  // const password = searchParams.getAll("password");
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.push("/");
  //       const uid = user.uid;
  //     } else {
  //       console.log("error getting user data");
  //     }
  //   });
  // }, [auth, router]);
  const cookiesData = async () => {
    const data = await getCokkies();
    setData(data);
  };
  // const paginateValue = async () => {
  //   const paginateData = await getDocsData(paginatedData?.lastDocument); // Pass last document for pagination
  //   console.log("paginate data issssssss", paginateData);
  //   setPaginatedData(paginateData);
  // };
  useEffect(() => {
    cookiesData();
  }, [router]);

  console.log(" home page data issssssss", data);
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-300">
        <ul>
          {data ? (
            <>
              <li>Name: {data.email}</li>
              <li>ID: {data.userId}</li>
            </>
          ) : null}
        </ul>

        {/* <button onClick={paginateValue}>paginateee</button>
        {paginatedData && paginatedData.data && (
          <ul>
            {paginatedData.Name.map((item: any, index: any) => (
              <li key={index}>Name: {item.Name}</li>
            ))}
          </ul>
        )} */}
      </div>
    </>
  );
}
