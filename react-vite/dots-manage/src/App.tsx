import React from 'react';
import './App.scss';

type DotType = { num: number; x: number; y: number };

type DotsContextType = {
  dotsLookUpTable: { [key: number]: DotType } | undefined;
  setDots: React.Dispatch<
    React.SetStateAction<{ [key: number]: DotType } | undefined>
  >;
};

type DotsLookUpTableType = DotsContextType['dotsLookUpTable'];

const initiaState: DotsContextType = {
  dotsLookUpTable: undefined,
  setDots: (value: React.SetStateAction<DotsLookUpTableType | undefined>) => {},
};

const DotsContext = React.createContext<DotsContextType>(initiaState);

export function DotsContextProvider({ children }: { children?: JSX.Element }) {
  const [dotsLookUpTable, setDots] = React.useState<
    DotsLookUpTableType | undefined
  >();

  return (
    <DotsContext.Provider value={{ dotsLookUpTable, setDots }}>
      {children}
    </DotsContext.Provider>
  );
}

export default function App() {
  return (
    <div className="App">
      <DotsContextProvider>
        <AppContainer />
      </DotsContextProvider>
    </div>
  );
}

function AppContainer() {
  const dotsContext = React.useContext(DotsContext);

  const [prevStateOfDots, setPrevStateOfDots] =
    React.useState<DotsLookUpTableType[]>();

  const [nextStateOfDots, setNextStateOfDots] =
    React.useState<DotsLookUpTableType[]>();

  return (
    <div className="container mx-auto min-h-screen">
      <h2 className="text-3xl font-bold underline">Dots manage</h2>
      <p>Click anywhere on the screen and then click undo or redo</p>
      <p>
        Count:{' '}
        {dotsContext.dotsLookUpTable
          ? Object.keys(dotsContext.dotsLookUpTable).length
          : 0}
      </p>
      <button
        disabled={!dotsContext.dotsLookUpTable}
        onClick={() => {
          setNextStateOfDots((prev) => {
            return prev
              ? [...prev, dotsContext.dotsLookUpTable]
              : [dotsContext.dotsLookUpTable];
          });

          if (prevStateOfDots) {
            const prevStateToSet = prevStateOfDots[prevStateOfDots?.length - 1];
            dotsContext.setDots(prevStateToSet);
          } else {
            dotsContext.setDots(undefined);
          }

          setPrevStateOfDots((prev) => {
            if (prev) {
              const lastElement = prev[prev.length - 1];
              const nextState = prev?.filter((el) => el !== lastElement);
              return nextState;
            } else {
              return undefined;
            }
          });
        }}
      >
        undo
      </button>
      <button
        disabled={!nextStateOfDots?.length}
        onClick={() => {
          if (nextStateOfDots) {
            dotsContext.setDots(nextStateOfDots[nextStateOfDots?.length - 1]);
          }

          setPrevStateOfDots((prev) => {
            return prev
              ? [...prev, dotsContext.dotsLookUpTable]
              : [dotsContext.dotsLookUpTable];
          });

          setNextStateOfDots((prev) => {
            if (prev) {
              const lastElement = prev[prev.length - 1];
              const nextState = prev?.filter((el) => el !== lastElement);
              return nextState;
            } else {
              return undefined;
            }
          });
        }}
      >
        redo
      </button>
      <button
        onClick={(e) => {
          dotsContext.setDots(undefined);
          setPrevStateOfDots(undefined);
          setNextStateOfDots(undefined);
        }}
      >
        reset
      </button>

      <DrawindContainer
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          const rect = target.getBoundingClientRect();

          setPrevStateOfDots((prev) => {
            return prev
              ? [...prev, dotsContext.dotsLookUpTable]
              : [dotsContext.dotsLookUpTable];
          });

          dotsContext.setDots((prev) => {
            let num = 0;
            if (prev) {
              const nextNum = Object.keys(prev).length;
              num = nextNum;
            }
            const x = e.clientX - rect.left + window.scrollX;

            let y = e.clientY;
            if (Math.round(rect.top)) {
              y = e.clientY - rect.top + window.scrollY;
            }

            const nextState = {
              ...prev,
              [num]: { num, x, y },
            };

            return nextState;
          });
        }}
      >
        {dotsContext.dotsLookUpTable ? (
          <>
            {Object.entries(dotsContext.dotsLookUpTable).map(([key, value]) => {
              return <DotElement key={key} dot={value} />;
            })}
          </>
        ) : (
          <></>
        )}
      </DrawindContainer>
    </div>
  );
}

type DotElementProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  dot: DotType;
};

function DotElement(props: DotElementProps) {
  const { dot } = props;
  return (
    <div
      style={{ top: dot.y, left: dot.x }}
      className="rounded-full bg-violet-700 inline-block w-10 h-10 absolute"
    ></div>
  );
}

type DrawindContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: JSX.Element;
};
function DrawindContainer(props: DrawindContainerProps) {
  const { children, ...propsToPass } = props;
  return (
    <div
      {...propsToPass}
      className="container  mx-auto min-h-screen rounded-lg border-solid border-2 border-indigo-600 relative"
    >
      {children}
    </div>
  );
}
