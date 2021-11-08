import PaymentStatusBadge from '../../../common/payment status badge/PaymentStatusBadge';

function Purchase({
  date,
  supplier,
  purchaseStatus,
  grandTotal,
  amountPaid,
  paymentStatus,
}) {
  return (
    <tr>
      <td>{date}</td>
      <td>{supplier}</td>
      <td>{purchaseStatus}</td>
      <td>{grandTotal}</td>
      <td>{amountPaid}</td>
      <td>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
    </tr>
  );
}

export default Purchase;
