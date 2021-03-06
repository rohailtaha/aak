import { float, numericString } from '../../../../utils/utility_functions';
import PaymentStatusBadge from '../../../common/payment status badge/PaymentStatusBadge';

function Purchase({
  invoice_id,
  date,
  supplier,
  purchaseStatus,
  grandTotal,
  amountPaid,
  paymentStatus,
}) {
  return (
    <tr>
      <td className='text-nowrap'>{date}</td>
      <td className='text-nowrap'>{invoice_id}</td>
      <td>{supplier}</td>
      <td>{purchaseStatus}</td>
      <td>{numericString(grandTotal)}</td>
      <td>{numericString(amountPaid)}</td>
      <td>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
    </tr>
  );
}

export default Purchase;
