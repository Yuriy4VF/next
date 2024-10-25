import Links from "./Links";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.container}>
      <h1>Logo</h1>
      <Links />
    </div>
  );
};

export default Navbar;
