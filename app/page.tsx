"use client";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCokkies } from "@/lib";


export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);

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
  const cookiesData =async () => {
    const data = await getCokkies()
    setData(data)
}
  useEffect(() => {
   cookiesData()
  }, [router])

  console.log(" home page data issssssss",data);
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-300">
        <ul>
          <li>Name: {data?.email}</li>
          <li>ID: {data?.userId}</li>
        </ul>
      </div>
    </>
  );
}
