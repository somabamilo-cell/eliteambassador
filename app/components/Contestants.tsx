"use client";
import { useEffect, useState } from "react";
import { client } from "./lib/client";
import PopupInfo from "./PopupInfo";
import Image from "next/image";

type Story = {
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any[];
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
};

function Contestants() {
  const [stories, setStories] = useState<Story[]>([]);
  const [choice, setChoice] = useState("1140c6f7-9964-4066-986d-1be168903d28");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
          title,
          slug,
          publishedAt,
          body,
          mainImage{
            asset ->{
              _id,
              url
            },
            alt
          },
        } | order(publishedAt desc)`
      )
      .then((data) => {
        setStories(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section>
      <div className="md:text-center">
        <h1 className="text-4xl mb-10">Contestants</h1>
        <div className="flex items-center gap-3 text-black flex-wrap md:mx-auto w-fit">
          <span
            className={`px-6 cursor-pointer py-2 border-2 rounded-lg ${
              choice === "1140c6f7-9964-4066-986d-1be168903d28"
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300"
            }`}
            onClick={() => setChoice("1140c6f7-9964-4066-986d-1be168903d28")}
          >
            All
          </span>
          <span
            className={`px-6 cursor-pointer py-2 border-2 rounded-lg ${
              choice === "ae711f4c-36fc-4d97-bdcf-5f8857dcdcca"
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300"
            }`}
            onClick={() => setChoice("ae711f4c-36fc-4d97-bdcf-5f8857dcdcca")}
          >
            Fashion
          </span>
          <span
            className={`px-6 cursor-pointer py-2 border-2 rounded-lg ${
              choice === "0f71a6f7-bab4-4953-9edd-3c76f62b942c"
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300"
            }`}
            onClick={() => setChoice("0f71a6f7-bab4-4953-9edd-3c76f62b942c")}
          >
            Beauty
          </span>
          <span
            className={`px-6 cursor-pointer py-2 border-2 rounded-lg ${
              choice === "43501d56-861d-41fb-9437-dc905824a1a1"
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300"
            }`}
            onClick={() => setChoice("43501d56-861d-41fb-9437-dc905824a1a1")}
          >
            Entertainment
          </span>
        </div>
      </div>

      {stories && (
        <div className="mt-16 grid gap-y-12 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((items) => (
            <div
              key={items.slug.current}
              className="rounded-2xl overflow-hidden"
            >
              <div className="h-[350px]">
                {items.mainImage && (
                  <Image
                    sizes="100%"
                    height={350}
                    width={400}
                    className="h-full w-full object-cover object-center"
                    src={items.mainImage.asset.url}
                    alt={items.mainImage.alt? items.mainImage.alt : "Contestant Image"}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="bg-[#F8F8F8] px-6 py-5 flex flex-col items-start">
                <h3 className="text-2xl font-bold capitalize">{items.title}</h3>
                <p className="text-[#000000] font-medium text-base mb-5">
                  {`Total Votes: ${items.body[0].children[0].text}`}
                </p>
                <div className="w-full">
                  <PopupInfo value={`Vote ${items.title}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Contestants;
