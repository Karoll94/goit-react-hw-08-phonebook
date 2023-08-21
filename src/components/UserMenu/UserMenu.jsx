import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setToken, setUser } from 'store/reducer';


export default function UserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.store.user);
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    history.push('/register');
  };
  return (
    <div className="usermenu--body">
      <input className='usermenu--check' type="checkbox" id="active"></input>
      <label htmlFor="active" className="usermenu--menu-btn">
        <div className="usermenu--btn-bar"></div>
        <div className="usermenu--btn-bar"></div>
        <div className="usermenu--btn-bar"></div>
      </label>
      <div className="usermenu--wrapper">
        <ul>
          <li>
            <a>{user}</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
