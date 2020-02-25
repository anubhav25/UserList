import React, { Component } from "react";
import Pagination from "../Pagination/Pagination";
import Table from "../Table/Table";
import Modal from "../Modal/Modal";
import styles from "./Main.module.scss";
import loadingImg from "../../assets/loading.gif";

// function to debounce the search query
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
  }, time);
}
//function to get the data using fetch api
async function getData(p, cache) {
  try {
    let page = "" + p;
    if (cache[page]) {
      // if data already exists in cache then return that data only
      return cache[page];
    }
    const url = `https://reqres.in/api/users?page=${page}&per_page=4`;
    let res = await fetch(url);
    let data = await res.json();
    cache[page] = data;
    return data;
  } catch {
    return null;
  }
}

class Main extends Component {
  //initial state
  state = {
    loading: false,
    itemsperpage: 0,
    totalItems: 0,
    data: [],
    filtereddata: [],
    query: [],
    modalData: null
  };
  //helper functions
  closeModal = () => this.setState({ modalData: null });
  changeFilteredData = filtereddata => this.setState({ filtereddata });
  updatequery = e => {
    let q = e.target.value;
    this.setState({ query: q });
    // debounce the search query to 500 milisecs in case user wants to enter more data
    debounce(q, this.state.data, this.changeFilteredData, 500);
  };
  // redirect to diffrent page
  updatePage = p => {
    this.setState({ query: "" });
    let { history } = this.props;
    history && history.push("/" + p);
  };
  // open modal when clicked on row
  onItemClick = modalData => {
    this.setState({ modalData });
  };

  componentDidUpdate(prevprops) {
    let page = this.props.page;
    // fetch new data only if the new page number is different from old page no
    if (prevprops.page !== page) {
      this.updateData(page);
    }
  }

  componentDidMount() {
    let page = this.props.page;
    // fetch data when page is loaded
    this.updateData(page);
  }
  updateData = page => {
    this.setState({ loading: true });
    getData(page, this.props.cache).then(res => {
      if (res) {
        let { per_page, total, data } = res;
        // update recieved data
        this.setState({
          itemsperpage: per_page,
          totalItems: total,
          data: data,
          filtereddata: data,
          loading: false
        });
      } else {
        this.setState({
          itemsperpage: 0,
          totalItems: 0,
          data: [],
          filtereddata: [],
          loading: false
        });
      }
    });
  };
  render() {
    let page = this.props?.page;
    let {
      loading,
      modalData,
      filtereddata,
      query,
      totalItems,
      itemsperpage
    } = this.state;
    if (loading) {
      // fallback when the data is being loaded
      return (
        <div className={styles.fallback}>
          <img src={loadingImg} alt="Loading" />
        </div>
      );
    }
    return (
      <div className={styles.container}>
        {/* load modal only when data is available  */}
        {modalData && (
          <Modal data={modalData} handleClose={this.closeModal}></Modal>
        )}
        <input
          className={styles.search}
          value={query}
          onChange={this.updatequery}
          placeholder="Search"
        />
        <Table data={filtereddata} onItemClick={this.onItemClick}></Table>
        <Pagination
          totalItems={totalItems}
          itemsperpage={itemsperpage}
          currentPage={page}
          onPageChange={this.updatePage}
        ></Pagination>
      </div>
    );
  }
}

export default Main;
