import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/error-page';
import { ExampleComponentGlobalState } from './components/hookstate-docs/global-state';
import { LocalState } from './components/hookstate-docs/localstate';
import NestedState from './components/hookstate-docs/nested-state';
import NestedStateExamples from './components/hookstate-docs/nested-state-examples';
import AdvancedImmerPatches from './components/immer-docs/advanced-features/patches/patches';
import { BasicInstallation } from './components/immer-docs/basics/basics-installation';
import { CurriedProducers } from './components/immer-docs/basics/curried-producers';
import { ReactAndImmerTodo } from './components/immer-docs/basics/reactAndImmer';
import { TodoListImmerFirst } from './components/immer-docs/basics/simple-todo';
import { ArrayMutationsTodos } from './components/immer-docs/basics/update-patters/array-mutations';
import { NestedDataStructures } from './components/immer-docs/basics/update-patters/nested-data-structures';
import { UpdatePatternsTodos } from './components/immer-docs/basics/update-patters/update-pattern';
import { UsingProduceTodos } from './components/immer-docs/basics/using-produce';
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
  {
    path: 'update-patterns-todos',
    element: <UpdatePatternsTodos />,
  },
  {
    path: 'array-mutations-todos',
    element: <ArrayMutationsTodos />,
  },
  {
    path: 'nested-data-structures',
    element: <NestedDataStructures />,
  },
  {
    path: 'advanced-immer-patches',
    element: <AdvancedImmerPatches />,
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
