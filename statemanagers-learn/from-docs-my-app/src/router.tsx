import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/error-page';
import { ExampleComponentGlobalState } from './components/hookstate-docs/global-state';
import { LocalState } from './components/hookstate-docs/localstate';
import NestedState from './components/hookstate-docs/nested-state';
import NestedStateExamples from './components/hookstate-docs/nested-state-examples';
import { BasicInstallation } from './components/immer-docs/basics-installation';
import { CurriedProducers } from './components/immer-docs/curried-producers';
import { ReactAndImmerTodo } from './components/immer-docs/reactAndImmer';
import { TodoListImmerFirst } from './components/immer-docs/simple-todo';
import { UsingProduceTodos } from './components/immer-docs/using-produce';
import Root from './components/root';

export type RouterElementType = {
  path: string;
  element: JSX.Element;
};

export const hookStateElements: RouterElementType[] = [
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
  {
    path: 'intro-nested-state',
    element: <NestedState />,
  },
  {
    path: 'intro-nested-state-examples',
    element: <NestedStateExamples />,
  },
];

export const immerElements: RouterElementType[] = [
  {
    path: 'immer-simple-todo',
    element: <TodoListImmerFirst />,
  },
  {
    path: 'basic-installation',
    element: <BasicInstallation />,
  },
  {
    path: 'using-produce-todos',
    element: <UsingProduceTodos />,
  },
  {
    path: 'using-curried-producers',
    element: <CurriedProducers />,
  },
  {
    path: 'react-and-immer-todo',
    element: <ReactAndImmerTodo />,
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [...hookStateElements, ...immerElements],
  },
]);
