import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
const Table = (props) => {
  const { columns, sortColumn, setSortColumn, allData, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        allData={allData}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
