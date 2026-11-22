import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns `false` during server rendering and hydration, and `true` once the
 * component is running on the client.
 *
 * Replaces the `useEffect(() => setMounted(true), [])` pattern without the
 * extra state update inside an effect: React uses the server snapshot while
 * hydrating and switches to the client snapshot right after.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
