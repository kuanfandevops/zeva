import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import history from '../app/History';

import CustomPropTypes from '../app/utilities/props';
import AssessmentEditPage from './components/AssessmentEditPage';
import ComplianceReportTabs from './components/ComplianceReportTabs';
import ROUTES_COMPLIANCE from '../app/routes/Compliance';
import Loading from '../app/components/Loading';
import CONFIG from '../app/config';

const AssessmentEditContainer = (props) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [makes, setMakes] = useState([]);
  const [supplierMakesList, setSupplierMakesList] = useState([]);
  const [make, setMake] = useState('');
  const [modelYear, setModelYear] = useState(
    CONFIG.FEATURES.MODEL_YEAR_REPORT.DEFAULT_YEAR,
  );
  const { user, keycloak } = props;
  const [statuses, setStatuses] = useState({
    assessment: {
      status: 'UNSAVED',
      confirmedBy: null,
    },
  });
  const [sales, setSales] = useState({});
  const [ratios, setRatios] = useState({});

  const handleChangeMake = (event) => {
    const { value } = event.target;
    setMake(value.toUpperCase());
  };

  const handleChangeSale = (year, value) => {
    setSales({
      ...sales,
      [year]: value,
    });
  };

  const handleDeleteMake = (index) => {
    makes.splice(index, 1);
    setMakes([...makes]);
  };

  const handleSubmitMake = (event) => {
    event.preventDefault();

    setMake('');
    setMakes([...makes, make]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      makes,
      sales,
    };

    axios.patch(
      ROUTES_COMPLIANCE.REPORT_ASSESSMENT_SAVE.replace(/:id/g, id), data,
    ).then(() => {
      history.push(ROUTES_COMPLIANCE.REPORT_ASSESSMENT.replace(/:id/g, id));
    });
  };

  const refreshDetails = () => {
    const detailsPromise = axios.get(
      ROUTES_COMPLIANCE.REPORT_DETAILS.replace(/:id/g, id),
    );

    const ratiosPromise = axios.get(ROUTES_COMPLIANCE.RATIOS);

    const makesPromise = axios.get(ROUTES_COMPLIANCE.MAKES.replace(/:id/g, id));

    Promise.all([detailsPromise, ratiosPromise, makesPromise]).then(
      ([response, ratiosResponse, makesResponse]) => {
        const {
          makes: modelYearReportMakes,
          modelYear: reportModelYear,
          statuses: reportStatuses,
          modelYearReportHistory,
          modelYearReportAddresses,
          organizationName,
          validationStatus,
          ldvSales,
          supplierClass,
        } = response.data;
        const year = parseInt(reportModelYear.name, 10);

        const { supplierMakes, govMakes } = makesResponse.data;

        setModelYear(year);
        setStatuses(reportStatuses);

        if (modelYearReportMakes) {
          const supplierCurrentMakes = supplierMakes.map((each) => each.make);
          const analystMakes = govMakes.map((each) => each.make);
          setMakes(analystMakes);
          setSupplierMakesList(supplierCurrentMakes);
        }

        setDetails({
          assessment: {
            history: modelYearReportHistory,
            validationStatus,
          },
          ldvSales,

          organization: {
            name: organizationName,
            organizationAddress: modelYearReportAddresses,
          },
          supplierInformation: {
            history: modelYearReportHistory,
            validationStatus,
          },
          supplierClass,
        });

        setSales({
          [year]: ldvSales,
        });

        const filteredRatio = ratiosResponse.data.filter(
          (data) => data.modelYear === year.toString(),
        )[0];
        setRatios(filteredRatio);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    refreshDetails();
  }, [keycloak.authenticated]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <ComplianceReportTabs
        active="assessment"
        reportStatuses={statuses}
        id={id}
        user={user}
      />
      <AssessmentEditPage
        modelYear={modelYear}
        statuses={statuses}
        id={id}
        loading={loading}
        user={user}
        makes={makes}
        details={details}
        handleChangeMake={handleChangeMake}
        handleChangeSale={handleChangeSale}
        handleDeleteMake={handleDeleteMake}
        handleSubmitMake={handleSubmitMake}
        make={make}
        handleSubmit={handleSubmit}
        ratios={ratios}
        sales={sales}
        supplierMakes={supplierMakesList}
      />
    </>
  );
};
AssessmentEditContainer.propTypes = {
  user: CustomPropTypes.user.isRequired,
  keycloak: CustomPropTypes.keycloak.isRequired,
};
export default withRouter(AssessmentEditContainer);
