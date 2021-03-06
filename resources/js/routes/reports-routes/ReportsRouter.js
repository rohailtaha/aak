import { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import PurchasesReport from '../../components/reports-pages/purchases reports page/PurchasesReport';
import SalesReport from '../../components/reports-pages/sales reports page/SalesReport';

function ReportsRouter() {
  return (
    <Fragment>
      <Route path='/reports/purchases' exact>
        <PurchasesReport />
      </Route>
      <Route path='/reports/sales' exact>
        <SalesReport />
      </Route>
    </Fragment>
  );
}

export default ReportsRouter;
