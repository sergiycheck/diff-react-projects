import React from 'react';
import { useHookstate, State } from '@hookstate/core';
import styles from './nested-state.module.scss';

interface Task {
  name: string;
  priority?: number;
}

export default function NestedState() {
  const state: State<Task[]> = useHookstate([{ name: 'first task' }] as Task[]);
  const [newName, setNewName] = React.useState('');

  return (
    <>
      <div className={styles.input_and_btn}>
        <input
          type="text"
          name="newName"
          value={newName}
          onChange={(e) => setNewName(e.target.value.trim())}
        />
        <button
          onClick={() => {
            if (!newName) {
              state.merge([{ name: 'Untitled' }]);
            } else {
              state.merge([{ name: newName }]);
              setNewName('');
            }
          }}
        >
          add new task
        </button>
      </div>

      {state.map((taskState: State<Task>, i) => (
        <TaskEditor key={i} taskState={taskState} />
      ))}
    </>
  );
}

function TaskEditor(props: { taskState: State<Task> }) {
  const taskState = props.taskState;
  return (
    <p>
      <input
        value={taskState.name.get()}
        onChange={(e) => taskState.name.set(e.target.value)}
      />
    </p>
  );
}
