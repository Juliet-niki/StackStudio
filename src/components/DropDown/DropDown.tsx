import { useRef, useState, useEffect } from "react";

export function useDropdown<T extends HTMLElement>() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<T | null>(null);
  const dropdownRef = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { open, setOpen, toggleRef, dropdownRef };
}
