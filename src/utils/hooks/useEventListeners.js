import { useEffect } from "react";
const useEventListeners = (element, events) => {
  useEffect(() => {
    // Attach all event listeners
    events.forEach(({ name, handler }) =>
      element.addEventListener(name, handler)
    );

    return () => {
      // Cleanup: Remove all event listeners
      events.forEach(({ name, handler }) =>
        element.removeEventListener(name, handler)
      );
    };
  }, [element, events]);
};

export default useEventListeners;
