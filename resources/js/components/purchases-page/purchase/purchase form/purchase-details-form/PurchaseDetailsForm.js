import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import SupplierOption from '../../../../common/supplier option/SupplierOption';
import PurchaseStatusOption from './PurchaseStatusOption';
import PaymentMismatchModal from '../messages/PaymentMismatchModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  paymentStatus,
  purchaseStatus,
} from '../../../../../utils/util_structures';
import FormError from '../../../../common/form-error/FormError';
import {
  clear_products_from_purchase,
  request_create_purchase,
  request_update_purchase,
  set_products_to_purchase,
  show_error,
} from '../../../../../actions/purchases/purchases-actions';
import { isEmpty, numericString } from '../../../../../utils/utility_functions';

export default function PurchaseDetailsForm({ mode, grandTotal }) {
  const [purchases, productsToPurchase, suppliers, successMessage, error] =
    useSelector(state => [
      state.purchases.list,
      state.purchases.productsToPurchase,
      state.suppliers.list,
      state.successMessage,
      state.purchases.error,
    ]);

  const dispatch = useDispatch();

  const defaultForm = {
    supplier: suppliers[0].name,
    purchase_status: purchaseStatus[0].value,
    payment_status: paymentStatus[0].value,
    amount_paid: '',
  };

  const [form, setForm] = useState(defaultForm);

  const updateMode = () => mode === 'UPDATE';

  const { id } = useParams();

  const getPurchase = id =>
    purchases.find(purchase => purchase.id === parseInt(id));

  useEffect(() => {
    if (updateMode()) {
      const purchase = getPurchase(id);
      setForm({
        supplier: isEmpty(purchase.supplier)
          ? suppliers[0].name
          : purchase.supplier,
        purchase_status: purchase.purchase_status,
        payment_status: purchase.payment_status,
        amount_paid: numericString(purchase.amount_paid),
      });
      dispatch(set_products_to_purchase(purchase.products));
    }
  }, []);

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    const validator = validate();
    if (validator.error) {
      dispatch(show_error(validator.msg));
    } else {
      updateMode()
        ? dispatch(request_update_purchase(dataWithCorrectFormat(), id))
        : dispatch(request_create_purchase(dataWithCorrectFormat()));
    }
  };

  const validate = () => {
    const errorObj = {
      error: true,
      msg: '',
    };
    if (productsToPurchase.length === 0) {
      errorObj.msg = 'No products added for purchase.';
      return errorObj;
    }
    return {
      success: true,
    };
  };

  const dataWithCorrectFormat = () => ({
    products: productsToPurchase.map(product => ({
      id: product.id,
      per_item_cost: numericString(product.per_item_cost),
      quantity: product.quantity,
      total_cost: numericString(product.total_cost),
    })),
    supplier_id: suppliers.find(supplier => supplier.name === form.supplier).id,
    purchase_status: form.purchase_status,
    payment_status: form.payment_status,
    amount_paid: numericString(form.amount_paid),
    grand_total: numericString(grandTotal),
  });

  const resetForm = () => setForm(defaultForm);

  useEffect(() => {
    if (successMessage.show && !updateMode()) {
      resetForm();
      dispatch(clear_products_from_purchase());
    }
  }, [successMessage.show]);

  return (
    <form onSubmit={handleSubmit}>
      <hr className='my-4' />

      <div>
        <div className='mb-3'>
          <label htmlFor='supplier' className='form-label fw-bold'>
            Supplier
          </label>
          <select
            className='form-select form-select-sm'
            id='supplier'
            onChange={handleChange}
            name='supplier'
            value={form.supplier}
            required
          >
            {suppliers.map(supplier => (
              <SupplierOption key={supplier.id} supplier={supplier.name} />
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='purchase-status' className='form-label fw-bold'>
            Purchase Status
          </label>
          <select
            className='form-select form-select-sm'
            id='purchase-status'
            onChange={handleChange}
            name='purchase_status'
            value={form.purchase_status}
            required
          >
            {purchaseStatus.map(status => (
              <PurchaseStatusOption key={status.id} status={status.value} />
            ))}
          </select>
        </div>

        <div className='mb-3 d-sm-flex align-items-center'>
          <div className='flex-grow-1  mb-2 mb-sm-0 me-sm-2'>
            <label
              htmlFor='grand-total'
              className='form-label fw-bold text-nowrap'
            >
              Grand Total
            </label>
            <div className='input-group input-group-sm'>
              <span className='input-group-text'>RS</span>
              <input
                type='number'
                className='form-control'
                id='grand-total'
                name='grand_total'
                value={numericString(grandTotal)}
                min='0'
                step='0.01'
                required
                readOnly
              />
            </div>
          </div>

          <div className='flex-grow-1'>
            <label
              htmlFor='net-amount-paid'
              className='form-label fw-bold text-nowrap'
            >
              Net Amount Paid
            </label>
            <div className='input-group input-group-sm'>
              <span className='input-group-text'>RS</span>
              <input
                type='number'
                className='form-control'
                id='net-amount-paid'
                onChange={handleChange}
                name='amount_paid'
                value={form.amount_paid}
                min='0'
                step='0.01'
                required
              />
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='payment-status' className='form-label fw-bold'>
            Payment Status
          </label>
          <select
            className='form-select form-select-sm'
            id='payment-status'
            onChange={handleChange}
            name='payment_status'
            value={form.payment_status}
            required
          >
            {paymentStatus.map(status => (
              <option key={status.id} value={status.value}>
                {status.value}
              </option>
            ))}
          </select>
        </div>

        <div className='d-sm-flex mb-3'>
          <button
            type='submit'
            className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
          >
            {updateMode() ? 'Save Changes' : 'Confirm Purchase'}
          </button>
          <Link to='/purchases' className='btn btn-danger flex-grow-1 ms-sm-3'>
            Cancel
          </Link>
        </div>
        {error.show && <FormError msg={error.msg} />}
      </div>
      <hr className='my-4' />
      <PaymentMismatchModal grandTotal={16600} payment={15000} />
    </form>
  );
}
