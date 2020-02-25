import React, { memo } from "react";
import styles from "./Pagination.module.scss";
import Classnames from "../../Helpers/Classnames";
const defaultProps = {
  totalItems: 0,
  Itemsperpage: 5,
  currentPage: 0,
  onPageChange: null
};
const customMap = (n, mapper) => {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(mapper(i));
  }
  return arr;
  // return new Array(n).fill(0).map((_,i)=>mapper(i+1))
};

const Pagination = props => {
  let { totalItems, itemsperpage, currentPage, onPageChange } = {
    ...defaultProps,
    ...props
  };
  totalItems = +totalItems;
  itemsperpage = +itemsperpage;
  currentPage = +currentPage;

  if (totalItems < 1 || totalItems < itemsperpage) return null;
  else {
    let totalPages = Math.ceil(totalItems / itemsperpage);
    let next = currentPage < totalPages;
    let last = currentPage < totalPages;
    let prev = currentPage > 1;
    let first = currentPage > 1;
    let goto = (p, condition) => () => condition && onPageChange(+p);

    if (currentPage > totalPages) {
      goto(1, true)();
    }
    return (
      <ul className={Classnames(styles.list)}>
        <li
          onClick={goto(1, first)}
          className={Classnames(!first && styles.disabled)}
        >
          {"<<"}
        </li>
        <li
          onClick={goto(currentPage - 1, prev)}
          className={Classnames(!prev && styles.disabled)}
        >
          {"<"}
        </li>
        {customMap(totalPages, i => (
          <li
            onClick={goto(i, currentPage !== i)}
            key={i}
            className={Classnames(currentPage === i && styles.active)}
          >
            {i}
          </li>
        ))}
        <li
          className={Classnames(!next && styles.disabled)}
          onClick={goto(currentPage + 1, next)}
        >
          {">"}
        </li>
        <li
          className={Classnames(!last && styles.disabled)}
          onClick={goto(totalPages, last)}
        >
          {">>"}
        </li>
      </ul>
    );
  }
};

export default memo(Pagination);
