import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Table from "../Table/Table";
import Modal from "../Modal/Modal";
import styles from "./Main.module.scss";

let timeout;
function debounce(query, data, changeFilteredData, time) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    timeout = null;
    let temp = data;
    if (query) {
      temp =
        data &&
        data.filter(item => {
          let name = `${item.first_name} ${item.last_name}`.toLowerCase();
          let email = item.email.toLowerCase();
          query = query.toLowerCase();
          return name.includes(query) || email.includes(query);
        });
    }
    changeFilteredData(temp);
  }, time || 500);
}

function Main(props) {
  let { getData, page, history } = props;
  // let [page, changePage] = useState(props?.page || 1);
  let [loading, changeLoading] = useState(true);
  let [itemsperpage, changeItemsperpage] = useState(0);
  let [totalItems, changeTotalItems] = useState(0);
  let [data, changeData] = useState([]);
  let [filtereddata, changeFilteredData] = useState([]);
  let [query, changeQuery] = useState("");
  let [modalData, changeModalData] = useState();
  let closeModal = () => changeModalData();
  let updatequery = e => {
    let q = e.target.value;
    changeQuery(q);
    debounce(q, data, changeFilteredData);
  };
  let updatePage = p => {
    changeQuery("");
    history.push("/" + p);
  };

  useEffect(() => {
    changeLoading(true);
    getData(page).then(({ per_page, total, data }) => {
      per_page !== itemsperpage && changeItemsperpage(per_page);
      total !== totalItems && changeTotalItems(total);
      changeData(data);
      changeFilteredData(data);
      changeLoading(false);
    });
  }, [itemsperpage, totalItems, getData, page]);
  let onItemClick = item => {
    if (item) changeModalData(item);
  };
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div className={styles.container}>
      {modalData && <Modal data={modalData} handleClose={closeModal}></Modal>}{" "}
      <input
        className={styles.search}
        value={query}
        onChange={updatequery}
        placeholder="Search"
      />
      <Table data={filtereddata} onItemClick={onItemClick}></Table>
      <Pagination
        totalItems={totalItems}
        itemsperpage={itemsperpage}
        currentPage={page}
        onPageChange={updatePage}
      ></Pagination>
    </div>
  );
}

export default Main;
