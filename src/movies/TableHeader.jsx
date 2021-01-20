import React, { useEffect } from "react";

import _ from "lodash";
const TableHeader = ({
  sortColumn,
  allData,
  setSortColumn,
  columns,
  onSort,
}) => {
  useEffect(() => {
    raiseSort(sortColumn.path, "asc");
  }, []);
  const raiseSort = (path, alternateOrder) => {
    const sortColumnCopy = { ...sortColumn };
    if (sortColumnCopy.path === path)
      sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
    else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    if (alternateOrder) sortColumnCopy.order = alternateOrder;
    setSortColumn(sortColumnCopy);
    const sorted = _.orderBy(
      allData,
      [sortColumnCopy.path],
      [sortColumnCopy.order]
    );

    onSort(sorted);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-caret-up"></i>;
    return <i className="fa fa-caret-down"></i>;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
