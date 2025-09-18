import React from "react";
import NavBar from "../NavBar/NavBar";

interface Props {
  children: React.ReactNode;
}
const ContentWrapper = ({ children }: Props) => {
  return (
    <div className="w-full relative min-h-screen text-text">
      <NavBar />
      <main className="pt-[10px] px-5 md:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default ContentWrapper;
