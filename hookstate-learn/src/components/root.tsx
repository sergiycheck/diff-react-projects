import { NavLink, Outlet } from 'react-router-dom';
import { rootChildren } from '../router';

export default function Root() {
  return (
    <div className="grid-page">
      <div className="sidebar">
        <nav>
          <ul>
            {rootChildren.map((child, i) => (
              <li id={`${i}`}>
                <NavLink
                  to={child.path}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  <i>{child.path.replaceAll('-', ' ')}</i>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="details">
        <Outlet />
      </div>
    </div>
  );
}
