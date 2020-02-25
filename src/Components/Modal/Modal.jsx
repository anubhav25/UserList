import React from "react";
import styles from "./Modal.module.scss";
export default function Modal({ handleClose, data }) {
  return (
    <div id="openModal" className={styles.modalDialog}>
      <a
        onClick={e => {
          e.preventDefault();
          handleClose();
        }}
        href="/#"
        title="Close"
        className={styles.close}
      >
        X
      </a>
      <div className={styles.card}>
        <img src={data.avatar} alt="Avatar" />
        <div className={styles.container}>
          <h4>
            <b>{`${data.first_name} ${data.last_name}`}</b>
          </h4>
          <p>{data.email}</p>
        </div>
      </div>
    </div>
  );
}
