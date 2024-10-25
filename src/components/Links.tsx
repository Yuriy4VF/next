import styles from "./Links.module.css";

import NavLink from "./NavLink";

const links = [
  { title: "Home", path: "/" },
  { title: "Chat", path: "/chat" },
  { title: "Photos", path: "/photos" },
  { title: "Register", path: "/register" },
];

const Links = () => {
  const session = true;
  const isAdmin = true;
  return (
    <div className={styles.links}>
      {links.map((item) => (
        <NavLink key={item.title} item={item} />
      ))}
      {session ? (
        <>
          {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
          <button className={styles.logout}>Logout</button>
        </>
      ) : (
        <NavLink item={{ title: "Login", path: "/login" }} />
      )}
    </div>
  );
};
export default Links;
