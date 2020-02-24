import React from "react";
import styles from "./Modal.module.scss";
// import Classnames from "../../Helpers/Classnames";
export default function Modal({ handleClose, data }) {
  data = data || {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"
  };
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
