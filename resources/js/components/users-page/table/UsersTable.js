import { useDispatch, useSelector } from 'react-redux';
import { resort_users, sort_users } from '../../../actions/users/users-actions';
import useItemsForCurrentPage from '../../../hooks/useItemsForCurrentPage';
import SortArrows from '../../common/sort-arrows/SortArrows';
import withCleaner from '../../hocs/withCleaner';
import User from './User';

function UsersTable() {
  const [users] = useSelector(state => [state.users.list]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = useItemsForCurrentPage(users);

  const sort = (key, order) => dispatch(sort_users(key, order));

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>
              Role
              <SortArrows aKey='role' sort={sort} />
            </th>
            <th scope='col'>
              Name <SortArrows aKey='name' sort={sort} />
            </th>
            <th scope='col'>
              Email <SortArrows aKey='email' sort={sort} />
            </th>
            <th scope='col'>
              Phone <SortArrows aKey='phone' sort={sort} />
            </th>
            <th scope='col'>
              Status <SortArrows aKey='status' sort={sort} />
            </th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage.map(user => (
            <User
              id={user.id}
              role={user.role}
              name={user.name}
              email={user.email}
              phone={user.phone}
              status={user.status}
              key={user.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withCleaner(UsersTable, [resort_users]);
