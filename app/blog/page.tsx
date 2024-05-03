import Image from "next/image";
type Props = {};
export default function Page({}: Props) {
  return (
    <div>
      <h1 className="mb-10 mt-20 font-bold text-blue-500">
        Our Trending Cities
      </h1>
      <div className="grid grid-cols-3 gap-5">
          <div
            className="cursor-pointer rounded-2xl p-4 shadow-2xl"
          >
            <div className="aspect-w-16 aspect-h-9 bg-red-400">
              <Image
                          className="object-cover"
                          width={320}
                          height={180} src={""} alt={""}              />
            </div>
            <h2 className="mt-3 font-bold">hey</h2>
            <p className="my-3 tracking-wide">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
            <button
              className="float-right rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-400 active:bg-blue-600"
            >
              View
            </button>
          </div>
      </div>
    </div>
  );
}
