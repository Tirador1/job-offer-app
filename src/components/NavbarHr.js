import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const NavbarHr = () => {
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  const handleLogout = () => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Jobs
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>
                <NavLink to="/add-company" className={linkClass}>
                  Add Company
                </NavLink>
                <button
                  style={{
                    color: 'white',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavbarHr;
