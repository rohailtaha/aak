import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_products } from '../../actions/products/products-actions';
import { request_fetch_purchases } from '../../actions/purchases/purchases-actions';
import { request_fetch_sales } from '../../actions/sales/sales-actions';
import CashFlowStats from './cash flow stats/CashFlowStats';
import InventoryStats from './inventory stats/InventoryStats';
import HighestSellingProductsTable from './tables/highest selling products/HighestSellingProductsTable';

function Dashboard() {
  const [fetchedProducts, fetchedSales, fetchedPurchases] = useSelector(
    state => [
      state.products.fetched,
      state.sales.fetched,
      state.purchases.fetched,
    ]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetchedProducts) dispatch(fetch_products());
    if (!fetchedSales) dispatch(request_fetch_sales());
    if (!fetchedPurchases) dispatch(request_fetch_purchases());
  }, []);

  return (
    <div className='main__content main__content--dashboard'>
      <InventoryStats />
      <hr />
      <CashFlowStats />
      <hr />

      <section className='mt-5 border'>
        <div className='bg-light py-2 px-3 border-bottom'>
          <h4 className='fw-normal'> Highest Selling Products </h4>
        </div>
        <HighestSellingProductsTable />
      </section>
    </div>
  );
}

export default Dashboard;
