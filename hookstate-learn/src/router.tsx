import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/error-page';
import { ExampleComponentGlobalState } from './components/hookstate-docs/global-state';
import { LocalState } from './components/hookstate-docs/localstate';
import Root from './components/root';

export const rootChildren = [
  {
    path: 'intro-global-state',
    element: <ExampleComponentGlobalState />,
  },
  {
    path: 'other-element-123',
    element: <div>other element 123</div>,
  },
  {
    path: 'intro-local-state',
    element: <LocalState />,
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [...rootChildren],
  },
]);
