import { useDispatch } from 'react-redux';
import { delete_product_from_sale } from '../../../../actions/sales/sales-actions';
import { numericString } from '../../../../utils/utility_functions';

export default function AddedProduct({
  id,
  name,
  perItemPrice,
  discount,
  finalSalePrice,
  quantity,
  totalPrice,
}) {
  const dispatch = useDispatch();

  const remove = () => dispatch(delete_product_from_sale(id));

  return (
    <tr>
      <td>{name}</td>
      <td>{numericString(perItemPrice)}</td>
      <td>{numericString(discount)}</td>
      <td>{numericString(finalSalePrice)}</td>
      <td>{quantity}</td>
      <td>{numericString(totalPrice)}</td>
      <td>
        <button
          className='btn text-danger p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
          onClick={remove}
        >
          <span className='material-icons'>remove_circle</span>
        </button>
      </td>
    </tr>
  );
}
