import { useNestedStateExamples } from './examples/nested-state/examples';

export default function NestedStateExamples() {
  const state = useNestedStateExamples();

  return (
    <div>
      {' '}
      <p> terminal to see the results</p> {JSON.stringify(state.value)}
    </div>
  );
}
