import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import PropTypes from 'prop-types';

import "./style.css";
import { Sort } from "@mui/icons-material";

const DataGridTable = ({
    columns,
    data,
    ...restOfProps
  }) => {
  const tableData = {
    columns,
    data
  };

  return (
    <DataTableExtensions {...tableData}>
        <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortField="_id"
            sortIcon={<Sort /> }
            defaultSortAsc={true}
            pagination
            highlightOnHover
            // dense
        />
    </DataTableExtensions>
  );
};
DataGridTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

export default DataGridTable;