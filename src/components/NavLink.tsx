"use client";
import { usePathname } from "next/navigation";

import styles from "./NavLink.module.css";

import Link from "next/link";

const NavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      className={`${styles.link} ${pathName === item.path && styles.active}`}
      href={item.path}
    >
      {item.title}{" "}
    </Link>
  );
};

export default NavLink;
