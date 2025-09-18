"use client";
import Image from "next/image";
import {
  AngleDownIcon,
  EditIcon,
  EnhancerIcon,
  FolderIcon,
  HouseIcon,
  ImageIcon,
  MenuIcon,
  MoonIcon,
  NotificationIcon,
  RealtimeIcon,
  SunIcon,
  SupportIcon,
  VideoIcon,
} from "../icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropdown } from "../DropDown/DropDown";

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };
  const profile = useDropdown<HTMLDivElement>();
  const menu = useDropdown<HTMLDivElement>();

  const { setOpen: setProfileOpen } = profile;
  const { setOpen: setMenuOpen } = menu;

  useEffect(() => {
    setProfileOpen(false);
    setMenuOpen(false);
  }, [pathname, setProfileOpen, setMenuOpen]);

  return (
    <div className="sticky top-0 z-100 bg-background shadow-lg  text-text">
      <nav className="flex items-center justify-between px-6 py-4 sm:py-3">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image
              src={
                darkMode
                  ? "/assets/images/logo2.png"
                  : "/assets/images/logo.png"
              }
              alt="StackStudio Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
            />
          </Link>

          <div
            ref={profile.toggleRef}
            onClick={() => profile.setOpen((prev) => !prev)}
            className="relative flex items-center gap-2 rounded-[22px] px-3 py-2 cursor-pointer bg-primaryBackground"
          >
            <div className="md:size-6 lg:size-8 rounded-full bg-radial-[at_50%_50%] from-purple-300 via-blue-400 to-indigo-900 to-90%"></div>
            <p className="text-xs md:text-sm">Johnson Alex</p>
            <AngleDownIcon className="w-5 h-5 fill-fill" />
          </div>
          {profile.open && (
            <div
              ref={profile.dropdownRef}
              className="absolute top-[60px] sm:top-[50px] md:top-[60px] lg:top-[70px] left-44 sm:left-52 bg-primaryBackground  rounded-[18px] px-3 py-3 flex flex-col gap-1 text-xs md:text-sm text-text"
            >
              <Link
                href="/profile"
                className="py-2 px-2 hover:bg-primaryHover rounded-[12px] cursor-pointer"
              >
                View profile
              </Link>
              <Link
                href="/"
                className="py-2 px-2 hover:bg-primaryHover rounded-[12px] cursor-pointer"
              >
                Upgrade
              </Link>
              <Link
                href="/"
                className="py-2 px-2 hover:bg-primaryHover rounded-[12px] cursor-pointer"
              >
                Settings
              </Link>
              <Link
                href="/"
                className="py-2 px-2 hover:bg-primaryHover rounded-[12px] cursor-pointer"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
        {/* Nav Menu */}
        <div className="hidden bg-primaryBackground rounded-[22px] px-2 py-2 md:flex items-center gap-1">
          {navMenu.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className={`lg:py-2 lg:px-3 px-2 py-1 flex items-center justify-center rounded-[16px] hover:bg-primaryHover ${
                pathname.includes(menu.href) && pathname === menu.href
                  ? "bg-primaryHover"
                  : ""
              }`}
            >
              {menu.icon}
            </Link>
          ))}
        </div>
        {/* Right Nav */}
        <div className="flex items-center gap-4 font-sans text-[11px]">
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/gallery"
              className="bg-primaryBackground hover:bg-primaryHover rounded-lg px-2 py-[4px] flex items-center gap-2 cursor-pointer"
            >
              <ImageIcon className="w-5 h-5 fill-fill" />
              <p> Gallery</p>
            </Link>
            <Link
              href="/support"
              className="bg-primaryBackground hover:bg-primaryHover rounded-lg px-2 py-[4px] flex items-center gap-2 cursor-pointer"
            >
              <SupportIcon className="w-5 h-5 fill-fill" />
              <p> Support</p>
            </Link>
            <Link
              href="/notification"
              className="bg-primaryBackground hover:bg-primaryHover rounded-full px-1 py-1 flex items-center gap-2 cursor-pointer"
            >
              <NotificationIcon className="w-5 h-5 fill-fill" />
            </Link>
          </div>
          <div
            onClick={toggleTheme}
            className="bg-primaryBackground hover:bg-primaryHover rounded-full px-1 py-1 flex items-center gap-2 cursor-pointer"
          >
            {darkMode ? (
              <MoonIcon className="w-5 h-5 fill-fill" />
            ) : (
              <SunIcon className="w-5 h-5 fill-fill" />
            )}
          </div>
          <Link
            href="/profile"
            className="hidden lg:flex size-6 rounded-full bg-radial-[at_50%_50%] from-purple-300 via-blue-400 to-indigo-900 to-90% cursor-pointer"
          ></Link>
          {/* Mobile Nav */}
          <div
            ref={menu.toggleRef}
            onClick={() => menu.setOpen((prev) => !prev)}
            className="lg:hidden"
          >
            <MenuIcon className=" w-5 h-5 fill-fill cursor-pointer" />
            {menu.open && (
              <div
                ref={menu.dropdownRef}
                className="absolute top-[60px] sm:top-[50px] md:top-[60px] lg:top-[70px] right-4 bg-primaryBackground rounded-[18px] w-[200px] px-2 pt-2 pb-10 flex flex-col gap-5 text-sm text-text shadow-xl"
              >
                <div className="md:hidden flex flex-col gap-1">
                  {navMenu.map((menu) => (
                    <Link
                      key={menu.id}
                      href={menu.href}
                      className={`py-2 px-2 flex gap-2 items-end rounded-[12px] hover:bg-primaryHover ${
                        pathname.includes(menu.href) && pathname === menu.href
                          ? "bg-primaryHover"
                          : ""
                      }`}
                    >
                      {menu.icon}
                      <p>{menu.name}</p>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-1">
                  <Link
                    href="/gallery"
                    className="py-2 px-2 hover:bg-primaryHover rounded-[12px] flex items-end gap-2 cursor-pointer"
                  >
                    <ImageIcon className="w-5 h-5 fill-fill" />
                    <p> Gallery</p>
                  </Link>
                  <Link
                    href="/support"
                    className="py-2 px-2 hover:bg-primaryHover rounded-[12px] flex items-end gap-2 cursor-pointer"
                  >
                    <SupportIcon className="w-5 h-5 fill-fill" />
                    <p> Support</p>
                  </Link>
                  <Link
                    href="/notification"
                    className="py-2 px-2 hover:bg-primaryHover rounded-[12px] flex items-end gap-2 cursor-pointer"
                  >
                    <NotificationIcon className="w-5 h-5 fill-fill" />
                    <p> Notification</p>
                  </Link>
                  <Link
                    href="/profile"
                    className="py-2 px-2 hover:bg-primaryHover rounded-[12px] flex items-end gap-2 cursor-pointer"
                  >
                    <div className="size-6 rounded-full bg-radial-[at_50%_50%] from-purple-300 via-blue-400 to-indigo-900 to-90% cursor-pointer"></div>
                    <p>Profile</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

const navMenu = [
  {
    id: 1,
    href: "/",
    name: "Home",
    icon: <HouseIcon className="w-5 h-5 fill-fill" />,
  },
  {
    id: 2,
    href: "/image",
    name: "Image",
    icon: <ImageIcon className="w-5 h-5 fill-fill" />,
  },
  {
    id: 3,
    href: "/video",
    name: "Video",
    icon: <VideoIcon className="w-5 h-5 fill-fill" />,
  },
  {
    id: 4,
    href: "/enhancer",
    name: "Enhancer",
    icon: <EnhancerIcon className="w-5 h-5 fill-fill" />,
  },
  {
    id: 5,
    href: "/realtime",
    name: "Realtime",
    icon: <RealtimeIcon className="w-5 h-5 fill-fill" />,
  },
  {
    id: 6,
    href: "/edit",
    name: "Edit",
    icon: <EditIcon className="w-5 h-5 fill-fill" />,
  },

  {
    id: 7,
    href: "/folder",
    name: "Folder",
    icon: <FolderIcon className="w-5 h-5 fill-fill" />,
  },
];
