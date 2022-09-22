import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { hookStateElements, immerElements, RouterElementType } from '../router';

export default function Root() {
  return (
    <div className="grid-page">
      <div className="sidebar">
        <NavElements
          routerElements={hookStateElements}
          name={'hook state elements'}
          expand={true}
        />
        <NavElements
          routerElements={immerElements}
          name={'immer elements'}
          expand={true}
        />
      </div>
      <div className="details">
        <Outlet />
      </div>
    </div>
  );
}

export function NavElements({
  name,
  routerElements,
  expand,
}: {
  name: string;
  expand: boolean;
  routerElements: RouterElementType[];
}) {
  const [show, toggleShow] = React.useState(expand);

  return (
    <nav
      onClick={(e) => {
        if (e.target.tagName === 'NAV') {
          toggleShow(!show);
        }
      }}
    >
      {name}
      <ul hidden={!show}>
        {routerElements.map((child, i) => (
          <ListItem child={child} key={i} />
        ))}
      </ul>
    </nav>
  );
}

export function ListItem({ child }: { child: RouterElementType }) {
  return (
    <li>
      <NavLink
        to={child.path}
        className={({ isActive, isPending }) =>
          isActive ? 'active' : isPending ? 'pending' : ''
        }
      >
        <i>{child.path.replaceAll('-', ' ')}</i>
      </NavLink>
    </li>
  );
}
