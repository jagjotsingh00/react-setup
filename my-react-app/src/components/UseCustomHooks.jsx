import { useState, useEffect, useRef, useCallback } from 'react';

/* ============================================
   :books: TABLE OF CONTENTS:

   1. What are Custom Hooks?
   2. Rules of Hooks
   3. Example 1: Simple Custom Hook (useCounter)
   4. Example 2: useFetch Hook
   5. Example 3: useLocalStorage Hook
   6. Example 4: useDebounce Hook
   7. Hook Composition (Combining Hooks)
   8. PROJECT: 3 Custom Hooks Library
      - useToggle
      - useClickOutside
      - usePrevious

   ============================================ */


// ============================================
// :one: WHAT ARE CUSTOM HOOKS?
// ============================================

/*
Custom Hooks let you extract component logic into reusable functions.

WHY USE CUSTOM HOOKS?
:white_check_mark: Reuse logic across multiple components
:white_check_mark: Keep components clean and simple
:white_check_mark: Share stateful logic without render props or HOCs
:white_check_mark: Organize code better

NAMING CONVENTION:
- Must start with "use" (e.g., useCounter, useFetch)
- This tells React it's a hook and follows hook rules

EXAMPLE STRUCTURE:
function useMyHook() {
  const [state, setState] = useState(initialValue);

  // Your logic here

  return [state, setState]; // or { state, setState }
}
*/


// ============================================
// :two: RULES OF HOOKS
// ============================================

/*
:rotating_light: CRITICAL RULES - MUST FOLLOW!

RULE 1: Only call hooks at the TOP LEVEL
  :white_check_mark: DO:
    function Component() {
      const [count, setCount] = useState(0);
      const data = useFetch('/api/data');
    }

  :x: DON'T:
    function Component() {
      if (condition) {
        const [count, setCount] = useState(0); // :x: In condition
      }

      for (let i = 0; i < 10; i++) {
        const data = useFetch(`/api/${i}`); // :x: In loop
      }
    }

RULE 2: Only call hooks from REACT FUNCTIONS
  :white_check_mark: DO:
    - React function components
    - Custom hooks

  :x: DON'T:
    - Regular JavaScript functions
    - Class components
    - Event handlers

RULE 3: Custom hooks must start with "use"
  :white_check_mark: DO: useCounter, useFetch, useLocalStorage
  :x: DON'T: counter, fetchData, storage

WHY THESE RULES?
- React relies on the ORDER of hooks to track state
- Breaking these rules causes bugs and errors
*/


// ============================================
// :three: EXAMPLE 1: Simple Custom Hook (useCounter)
// ============================================

// Custom hook definition
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(initialValue);

  // Return what the component needs
  return { count, increment, decrement, reset };
}

// Using the custom hook
function Example1_UseCounter() {
  // Look how clean this is! All logic is in the hook
  const counter = useCounter(0, 1);
  const fastCounter = useCounter(0, 10);

  return (
    <div style={styles.example}>
      <h3>Example 1: useCounter (Simple Custom Hook)</h3>

      <div style={styles.twoColumns}>
        <div style={styles.counterBox}>
          <h4>Counter (step: 1)</h4>
          <div style={styles.bigNumber}>{counter.count}</div>
          <div style={styles.buttonGroup}>
            <button onClick={counter.increment} style={styles.button}>+1</button>
            <button onClick={counter.decrement} style={styles.button}>-1</button>
            <button onClick={counter.reset} style={styles.buttonSecondary}>Reset</button>
          </div>
        </div>

        <div style={styles.counterBox}>
          <h4>Fast Counter (step: 10)</h4>
          <div style={styles.bigNumber}>{fastCounter.count}</div>
          <div style={styles.buttonGroup}>
            <button onClick={fastCounter.increment} style={styles.button}>+10</button>
            <button onClick={fastCounter.decrement} style={styles.button}>-10</button>
            <button onClick={fastCounter.reset} style={styles.buttonSecondary}>Reset</button>
          </div>
        </div>
      </div>

      <div style={styles.explanation}>
        :bulb: <strong>How it works:</strong><br/>
        1. We extracted counter logic into useCounter hook<br/>
        2. Hook returns { '{count, increment, decrement, reset}'}<br/>
        3. Component just uses the hook - super clean!<br/>
        4. We can reuse this hook in ANY component<br/>
        5. We can create multiple counters with different steps
      </div>

      <div style={styles.codeBox}>
        <h4>The Custom Hook Code:</h4>
        <pre style={styles.code}>{`function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage:
const counter = useCounter(0, 1);
counter.increment(); // count goes up by 1`}</pre>
      </div>
    </div>
  );
}

// =============================================================================================
