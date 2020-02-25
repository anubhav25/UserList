import React from "react";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header id="header" className={styles.header}>
      <h1 className={styles.title}>User List</h1>
      {/* Link to github repo */}
      <a
        className={styles.link}
        href="https://github.com/anubhav25/UserList"
        title="View source code on GitHub"
      >
        View source code on GitHub
      </a>
    </header>
  );
}
