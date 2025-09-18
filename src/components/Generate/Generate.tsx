"use client";

import { useState } from "react";
import {
  AngleDownIcon,
  EditIcon,
  EnhancerIcon,
  ImageIcon,
  MicrophoneIcon,
  PersonIcon,
  RealtimeIcon,
  TrainIcon,
  VideoIcon,
} from "../icons";
import Link from "next/link";

const Generate = () => {
  const [showAll, setShowAll] = useState(true);
  return (
    <div className="font-sans mt-8 text-text">
      <div className="flex items-center justify-between">
        <h1 className="text-[16px] sm:text-lg md:text-xl mb-5 font-bold">
          Generate
        </h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[10px] md:text-xs text-secondaryText font-semibold flex items-center gap-1"
        >
          {showAll ? (
            <AngleDownIcon className="w-6 h-6 fill-secondaryText" />
          ) : (
            <AngleDownIcon className="w-6 h-6 rotate-180 fill-secondaryText" />
          )}
          Show All
        </button>
      </div>
      {showAll && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {generateItems.map((item) => (
            <div key={item.id} className="flex items-center">
              <div
                className={`${
                  item.title === "Train"
                    ? "border-4 border-gray-500 bg-primaryBackground rounded-full border-dashed p-1"
                    : "p-2 rounded-xl w-fit h-fit "
                }${item.bgColor.startsWith("bg-") ? item.bgColor : ""}`}
                style={
                  item.bgColor.startsWith("#")
                    ? { backgroundColor: item.bgColor }
                    : {}
                }
              >
                {item.icon}
              </div>
              <div className="ml-2 ">
                <div className="flex gap-2 items-center">
                  <h2 className="font-bold text-sm sm:text-xs lg:text-sm">
                    {item.title}
                  </h2>
                  {item.new === true && (
                    <p className="bg-blue-600 text-white text-[6px] md:text-[8px] text-center rounded-2xl w-8 md:w-10 py-1">
                      New
                    </p>
                  )}
                </div>
                <p className="text-xs sm:text-[9px] lg:text-[11px] text-primaryText w-[95%] sm:w-[80%] lg:w-[90%]">
                  {item.description}
                </p>
              </div>
              <button className="ml-auto bg-primaryBackground hover:bg-primaryHover text-[10px] lg:text-xs font-medium rounded-2xl px-4 py-2 h-fit w-fit ">
                <Link href={item.buttonLink}> {item.buttonText}</Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Generate;

const generateItems = [
  {
    id: 1,
    icon: <ImageIcon className="w-6 lg:w-8 h-6 lg:h-8" fill="#fff" />,
    title: "Image",
    new: true,
    description: "Generate images with custom style in Flux and Ideogram.",
    buttonText: "Open",
    buttonLink: "/image",
    bgColor: "bg-linear-to-b from-sky-950 to-gray-400/50",
  },
  {
    id: 2,
    icon: <VideoIcon className="w-6 lg:w-8 h-6 lg:h-8" fill="#fff" />,
    title: "Video",
    new: false,
    description: "Generate videos with Hailuo, Pika, Runway, Luma and more.",
    buttonText: "Open",
    buttonLink: "/video",
    bgColor: "#f4aa18",
  },
  {
    id: 3,
    icon: <RealtimeIcon className="w-6 lg:w-8 h-6 lg:h-8" fill="#fff" />,
    title: "Realtime",
    new: false,
    description: "Realtime AI rendering on a canvas. Instant feedback loops.",
    buttonText: "Open",
    buttonLink: "/realtime",
    bgColor: "bg-linear-to-b from-sky-600 to-sky-300/20",
  },
  {
    id: 4,
    icon: <EnhancerIcon className="w-6 lg:w-8 h-6 lg:h-8" fill="#fff" />,
    title: "Enhancer",
    new: true,
    description: "Upscale and enhance images and videos up to 22k.",
    buttonText: "Open",
    buttonLink: "/enhancer",
    bgColor: "bg-linear-to-b from-gray-950 to-gray-500/50",
  },
  {
    id: 5,
    icon: <EditIcon className="w-6 lg:w-8 h-6 lg:h-8" fill="#fff" />,
    title: "Edit",
    new: true,
    description: "Add objects, change styles or expand photos and generations.",
    buttonText: "Open",
    buttonLink: "/edit",
    bgColor: "bg-linear-to-b from-purple-950 to-purple-400",
  },
  {
    id: 6,
    icon: <MicrophoneIcon className="w-6 lg:w-8 h-6 lg:h-8" fill="#fff" />,
    title: "Video Lipsync",
    new: true,
    description: "Lip-sync any video to any audio.",
    buttonText: "Open",
    buttonLink: "/video",
    bgColor:
      "bg-linear-to-b from-green-950/95 from-10% via-blue-900/95 via-50% to-green-950/60 to-90%",
  },
  {
    id: 7,
    icon: <PersonIcon className="w-6 lg:w-8 h-6 lg:h-8" fill="#fff" />,
    title: "Motion Transfer",
    new: true,
    description: "Transfer motion to images and animate characters.",
    buttonText: "Open",
    buttonLink: "#",
    bgColor: "#000",
  },
  {
    id: 8,
    icon: <TrainIcon className="w-6 lg:w-8 h-6 lg:h-8" />,
    title: "Train",
    new: false,
    description: "Teach Krea to replicate your style, products or characters.",
    buttonText: "Open",
    buttonLink: "#",
    bgColor: "",
  },
];
