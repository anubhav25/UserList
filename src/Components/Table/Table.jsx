import React from "react";
import styles from "./Table.module.scss";
import Classnames from "../../Helpers/Classnames";
const defaultProps = {
  data: [],
  onItemClick: null
};
const Table = props => {
  let { data, onItemClick } = {
    ...defaultProps,
    ...props
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map(item => (
              <tr key={item.id} onClick={() => onItemClick(item)}>
                <td>
                  <div className={styles.flex}>
                    <img
                      src={item.avatar}
                      className={styles.round}
                      alt="avatar"
                    />
                  </div>
                </td>
                <td>
                  <div className={styles.flex}>
                    <p
                      className={styles.name}
                    >{`${item.first_name} ${item.last_name}`}</p>
                  </div>
                </td>
                <td>
                  <div className={styles.flex}>
                    <p className={styles.email}>{item.email}</p>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Sorry!! No data exists</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
