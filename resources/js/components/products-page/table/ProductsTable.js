import { useDispatch, useSelector } from 'react-redux';
import {
  resort_products,
  sort_products,
} from '../../../actions/products/products-actions';
import useItemsForCurrentPage from '../../../hooks/useItemsForCurrentPage';
import { userRoles } from '../../../utils/util_structures';
import SortArrows from '../../common/sort-arrows/SortArrows';
import withCleaner from '../../hocs/withCleaner';
import Product from './Product';

function ProductsTable({ products }) {
  const [userRole] = useSelector(state => [state.users.user.role]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = useItemsForCurrentPage(products);

  const sort = (key, order) => dispatch(sort_products(key, order));

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>
              Barcode
              <SortArrows aKey='barcode' sort={sort} />
            </th>
            <th scope='col'>
              Name
              <SortArrows aKey='name' sort={sort} />
            </th>
            <th scope='col'>
              Category
              <SortArrows aKey='category' sort={sort} />
            </th>
            <th scope='col'>
              Quantity
              <SortArrows aKey='quantity' sort={sort} />
            </th>
            <th scope='col'>
              Purchase Price (RS)
              <SortArrows aKey='purchase_price' sort={sort} />
            </th>
            <th scope='col'>
              Final Sale Price (RS)
              <SortArrows aKey='final_sale_price' sort={sort} />
            </th>
            {userRole === userRoles.ADMIN && <th scope='col'>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage.map(product => (
            <Product
              key={product.id}
              id={product.id}
              barcode={product.barcode}
              name={product.name}
              category={product.category}
              quantity={product.quantity}
              purchasePrice={product.purchase_price}
              finalSalePrice={product.final_sale_price}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withCleaner(ProductsTable, [resort_products]);
