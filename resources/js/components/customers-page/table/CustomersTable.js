import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resort_customers,
  sort_customers,
} from '../../../actions/customers/customers-actions';
import useItemsForCurrentPage from '../../../hooks/useItemsForCurrentPage';
import SortArrows from '../../common/sort-arrows/SortArrows';
import withCleaner from '../../hocs/withCleaner';
import Customer from './Customer';

function CustomersTable() {
  const [customers] = useSelector(state => [state.customers.list]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = useItemsForCurrentPage(customers);

  const sort = (key, order) => dispatch(sort_customers(key, order));

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>
              Name
              <SortArrows aKey='name' sort={sort} />{' '}
            </th>
            <th scope='col'>
              Email
              <SortArrows aKey='email' sort={sort} />{' '}
            </th>
            <th scope='col'>
              Phone
              <SortArrows aKey='phone' sort={sort} />{' '}
            </th>
            <th scope='col'>
              Address
              <SortArrows aKey='address' sort={sort} />{' '}
            </th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage.map(customer => (
            <Customer
              id={customer.id}
              name={customer.name}
              email={customer.email}
              phone={customer.phone}
              address={customer.address}
              key={customer.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withCleaner(CustomersTable, [resort_customers]);
