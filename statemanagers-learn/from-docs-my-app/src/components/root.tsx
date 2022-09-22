import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { hookStateElements, immerElements, RouterElementType } from '../router';
import classnames from 'classnames';

export default function Root() {
  const [docElClientWidth, setDocElClientWidth] = React.useState(
    document.documentElement.clientWidth
  );
  const phoneClientWidthPx = 800;

  const [hideSidePannel, setHideSidePannel] = React.useState(false);

  React.useEffect(() => {
    const resizeHandler = (e: any) => {
      setDocElClientWidth(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  React.useEffect(() => {
    if (docElClientWidth < phoneClientWidthPx) {
      setHideSidePannel(true);
    } else {
      setHideSidePannel(false);
    }
  }, [docElClientWidth]);

  let renderedSideBarContent;
  if (docElClientWidth < phoneClientWidthPx) {
    renderedSideBarContent = <div>≡</div>;
  } else {
    renderedSideBarContent = (
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
    );
  }

  const containerClassNames = classnames({
    'grid-page': true,
    'grid-page-small': hideSidePannel,
  });

  return (
    <div className={containerClassNames}>
      {renderedSideBarContent}
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
