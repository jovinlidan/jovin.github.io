import React from "react";
import _ from "lodash";
const TableBody = (props) => {
  const { data, columns } = props;

  const renderCeil = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={item._id + (column.path || column.key)}>
              {renderCeil(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
