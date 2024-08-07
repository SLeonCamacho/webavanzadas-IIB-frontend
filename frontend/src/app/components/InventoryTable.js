import React from 'react';
import DataTable from 'react-data-table-component';

const InventoryTable = ({ data }) => {
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Product Name',
      selector: row => row.product_name,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },
  ];

  return <DataTable columns={columns} data={data} pagination />;
};

export default InventoryTable;
