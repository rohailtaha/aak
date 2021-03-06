import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Fragment, useEffect } from 'react/cjs/react.development';
import { request_delete_category } from '../../actions/categories/categories-actions';
import { defaultCleanupFunctions } from '../../utils/util_structures';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import AddCategoryForm from './add category form/AddCategoryForm';
import EditCategoryModal from './edit category modal/EditCategoryModal';
import CategoriesTable from './table/CategoriesTable';
import withCleaner from '../hocs/withCleaner';

function Categories() {
  const [deleteConfirmation, categories] = useSelector(state => [
    state.deleteConfirmation,
    state.categories.list,
  ]);

  const dispatch = useDispatch();
  const { id } = useParams();
  const updateMode = () => id;

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_category(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  return (
    <Fragment>
      {updateMode() ? (
        <EditCategoryModal categoryID={id} />
      ) : (
        <div className='main__content main__content--categories'>
          <div className='d-xl-flex align-items-center'>
            <AddCategoryForm />
          </div>

          <div className='table-container'>
            <section className='mt-5 border'>
              <div className='d-flex justify-content-between bg-light py-2 px-3 border-bottom'>
                <h3 className='fw-normal'> Categories </h3> <RowsPerPage />
              </div>
              <CategoriesTable />
            </section>
            <Paginaton totalItems={categories.length} />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default withCleaner(Categories, defaultCleanupFunctions);
