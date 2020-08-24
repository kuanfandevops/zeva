/*
 * Container component
 * All data handling & manipulation should be handled here.
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import history from '../app/History';
import Loading from '../app/components/Loading';
import CreditTransactionTabs from '../app/components/CreditTransactionTabs';
import CustomPropTypes from '../app/utilities/props';
import CreditTransfersPage from './components/CreditTransfersPage';
import ROUTES_ORGANIZATIONS from '../app/routes/Organizations';
import ROUTES_CREDITS from '../app/routes/Credits';
import ROUTES_VEHICLES from '../app/routes/Vehicles';

const CreditTransfersContainer = (props) => {
  const emptyRow = {
    creditType: '', modelYear: '', quantity: 0, value: 0,
  };
  const emptyForm = {
    transferPartner: '',
    transferType: '',
  };
  const [rows, setRows] = useState([emptyRow]);
  const { user, keycloak } = props;
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const [fields, setFields] = useState(emptyForm);
  const [years, setYears] = useState([]);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    const input = value.trim();
    fields[name] = input;
    setFields({
      ...fields,
    });
  };
  const removeRow = (rowId) => {
    const filteredRows = rows.filter((item, index) => (index !== rowId));
    setRows(filteredRows);
  };

  const submitOrSave = (status) => {
    let toSupplier = '';
    let fromSupplier = '';
    if (fields.transferType === 'transfer to') {
      toSupplier = fields.transferPartner;
      fromSupplier = user.organization.id;
    } else {
      toSupplier = user.organization.id;
      fromSupplier = fields.transferPartner;
    }
    const data = rows.map((row) => ({
      numberOfCredits: row.quantity,
      valuePerCredit: row.value,
      creditClass: row.creditType,
      toSupplier,
      fromSupplier,
      modelYear: row.modelYear,
      status,
    }));
    setLoading(true);
    axios.post('/credit-transfers', { rows: data }).then((response) => {
      history.push(ROUTES_CREDITS.LIST);
      setLoading(false);
    });
  };
  const handleSave = () => {
    submitOrSave('DRAFT');
  };
  const handleSubmit = () => {
    submitOrSave('SUBMITTED');
  };
  const addRow = () => {
    setRows([...rows, emptyRow]);
  };
  const handleRowInputChange = (event, rowId) => {
    const { value, name } = event.target;
    const rowsCopy = JSON.parse(JSON.stringify(rows));
    rowsCopy[rowId][name] = value;
    setRows(rowsCopy);
  };

  const refreshDetails = () => {
    setLoading(true);
    axios.all([
      axios.get(ROUTES_ORGANIZATIONS.LIST),
      axios.get(ROUTES_VEHICLES.YEARS),
    ]).then(axios.spread((orgResponse, yearsResponse) => {
      setOrganizations(orgResponse.data);
      setYears(yearsResponse.data);
      setLoading(false);
    }));
  };

  useEffect(() => {
    refreshDetails();
  }, [keycloak.authenticated]);

  const total = rows.reduce((a, v) => a + v.quantity * v.value, 0);
  return ([
    <CreditTransactionTabs active="credit-transfers" key="tabs" user={user} />,
    <CreditTransfersPage
      key="page"
      user={user}
      organizations={organizations}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      years={years}
      handleSave={handleSave}
      removeRow={removeRow}
      addRow={addRow}
      handleRowInputChange={handleRowInputChange}
      total={total}
      rows={rows}
      fields={fields}
    />,
  ]);
};

CreditTransfersContainer.propTypes = {
  user: CustomPropTypes.user.isRequired,
};

export default CreditTransfersContainer;