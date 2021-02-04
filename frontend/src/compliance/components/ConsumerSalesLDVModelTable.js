import PropTypes from 'prop-types';
import React from 'react';
import ReactTable from '../../app/components/ReactTable';

const ConsumerSalesLDVModalTable = (props) => {
  const { data } = props;

  const columns = [
    {
      accessor: (item) => item.sales,
      className: 'text-center',
      Header: 'Sales',
      headerClassName: 'font-weight-bold ',
      id: 'sales',
      maxWidth: 200,
    },
    {
      accessor: (item) => item.modelYear,
      className: 'text-center',
      Header: 'Model Year',
      headerClassName: 'font-weight-bold',
      id: 'model-year',
      maxWidth: 200,
    },
    {
      accessor: (item) => item.make,
      className: 'text-center',
      Header: 'Make',
      headerClassName: 'font-weight-bold',
      id: 'make',
      maxWidth: 200,
    },
    {
      accessor: (item) => item.model,
      className: 'text-center',
      Header: 'Model',
      headerClassName: 'font-weight-bold',
      id: 'model',
      maxWidth: 200,
    },
    {
      accessor: (item) => item.type,
      className: 'text-center',
      Header: 'Type',
      headerClassName: 'font-weight-bold',
      id: 'type',
      maxWidth: 200,
    },
    {
      accessor: (item) => item.range,
      className: 'text-center',
      Header: 'Range(km)',
      headerClassName: 'font-weight-bold',
      id: 'range',
      maxWidth: 200,
    },
    {
      accessor: (item) => item.zevClass,
      className: 'text-center',
      Header: 'ZEV Class',
      headerClassName: 'font-weight-bold',
      id: 'zev-class',
      maxWidth: 200,
    },
  ];

  return (
    <ReactTable
      className="compliance-reports-table"
      columns={columns}
      data={data}
      filterable={false}
    />
  );
};

ConsumerSalesLDVModalTable.defaultProps = {};

ConsumerSalesLDVModalTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ConsumerSalesLDVModalTable;