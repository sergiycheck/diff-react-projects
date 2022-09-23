// In your application's entrypoint
import { enableMapSet } from 'immer';

enableMapSet();

// ...later
import produce from 'immer';

function useProducerUser() {
  const usersById_v1 = new Map([
    ['michel', { name: 'Michel Weststrate', country: 'NL' }],
  ]);

  const usersById_v2 = produce(usersById_v1, (draft) => {
    const michael = draft.get('michel')!;
    michael.country = 'UK';
  });

  const obj = { usersById_v1, usersById_v2 };
  return obj;
}

export function BasicInstallation() {
  const state = useProducerUser();
  console.log(state);

  return (
    <div>
      <p> examples from immer docs</p>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
}
