// # React Component Lifecycle - Complete Guide with useEffect

// ## 🔄 What is Component Lifecycle?

// Every React component goes through **3 phases**:

// 1. **MOUNTING** - Component is created and added to the DOM (birth)
// 2. **UPDATING** - Component re-renders when state/props change (life)
// 3. **UNMOUNTING** - Component is removed from the DOM (death)

// ---

// ## 📊 Visual Lifecycle Diagram

// ```
// ┌─────────────────────────────────────────────────────────────┐
// │                    COMPONENT LIFECYCLE                      │
// └─────────────────────────────────────────────────────────────┘

//     ┌──────────┐
//     │  MOUNT   │  ← Component appears on screen
//     └────┬─────┘
//          │
//          ↓
//     ┌──────────┐
//     │  UPDATE  │  ← User interacts, state/props change
//     └────┬─────┘
//          │
//          ↓ (repeats as long as component exists)
//     ┌──────────┐
//     │  UPDATE  │
//     └────┬─────┘
//          │
//          ↓
//     ┌──────────┐
//     │ UNMOUNT  │  ← Component removed from screen
//     └──────────┘
// ```

// ---

// ## 🎯 Phase 1: MOUNTING (Birth)

// ### What Happens During Mount?

// 1. Component function runs for the **first time**
// 2. Initial state is set
// 3. JSX is rendered to the DOM
// 4. Component appears on screen
// 5. **useEffect with []** runs

// ### Code Example:

// ```jsx
// function UserProfile() {
//   const [user, setUser] = useState(null);
  
//   console.log('1️⃣ Component function executed');
  
//   // This runs AFTER component is mounted (appears on screen)
//   useEffect(() => {
//     console.log('3️⃣ Component MOUNTED - useEffect ran');
    
//     // Perfect for:
//     // - Fetching initial data
//     // - Setting up subscriptions
//     // - Adding event listeners
//     // - Focus input
//     // - Start timers
    
//     fetch('/api/user')
//       .then(res => res.json())
//       .then(data => setUser(data));
      
//   }, []); // ← Empty array = run ONLY on mount
  
//   console.log('2️⃣ About to render JSX');
  
//   return <div>Hello {user?.name}</div>;
// }
// ```

// ### Execution Order on Mount:

// ```
// 1️⃣ Component function executed
// 2️⃣ About to render JSX
//    → JSX rendered to DOM
//    → Component visible on screen
// 3️⃣ Component MOUNTED - useEffect ran
// ```

// ### Real-World Mount Examples:

// ```jsx
// // Example 1: Fetch data on mount
// useEffect(() => {
//   fetch('/api/products')
//     .then(res => res.json())
//     .then(setProducts);
// }, []); // Run once when component appears

// // Example 2: Auto-focus input on mount
// useEffect(() => {
//   inputRef.current.focus();
// }, []); // Focus when component appears

// // Example 3: Start timer on mount
// useEffect(() => {
//   const timer = setInterval(() => {
//     setCount(c => c + 1);
//   }, 1000);
  
//   return () => clearInterval(timer); // Cleanup on unmount
// }, []); // Start timer when component appears

// // Example 4: Subscribe to WebSocket on mount
// useEffect(() => {
//   const ws = new WebSocket('ws://localhost:8080');
  
//   ws.onmessage = (event) => {
//     setMessages(prev => [...prev, event.data]);
//   };
  
//   return () => ws.close(); // Cleanup on unmount
// }, []); // Connect when component appears
// ```

// ---

// ## 🔄 Phase 2: UPDATING (Life)

// ### What Happens During Update?

// 1. State or props change
// 2. Component function runs **again**
// 3. New JSX is calculated
// 4. React compares old vs new JSX (diffing)
// 5. Only changed parts update in DOM
// 6. **useEffect with dependencies** runs

// ### Code Example:

// ```jsx
// function SearchResults() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);
  
//   console.log('🔄 Component re-rendering');
  
//   // This runs AFTER every render where searchTerm changed
//   useEffect(() => {
//     console.log('✨ searchTerm UPDATED:', searchTerm);
    
//     // Perfect for:
//     // - Fetch new data based on changed value
//     // - Sync with external system
//     // - Update document title
//     // - Save to localStorage
    
//     if (searchTerm) {
//       fetch(`/api/search?q=${searchTerm}`)
//         .then(res => res.json())
//         .then(setResults);
//     }
    
//   }, [searchTerm]); // ← Runs when searchTerm changes
  
//   return (
//     <div>
//       <input 
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {/* Results displayed here */}
//     </div>
//   );
// }
// ```

// ### Execution Order on Update:

// ```
// User types "React" in input
//   ↓
// 1. setSearchTerm('React') called
// 2. State changes from '' to 'React'
// 3. Component function runs again
// 4. 🔄 Component re-rendering (console log)
// 5. New JSX calculated
// 6. React updates DOM
// 7. ✨ searchTerm UPDATED: React (useEffect runs)
// 8. Fetch new search results
// ```

// ### Real-World Update Examples:

// ```jsx
// // Example 1: Update document title when count changes
// const [count, setCount] = useState(0);

// useEffect(() => {
//   document.title = `Count: ${count}`;
// }, [count]); // Runs every time count changes

// // Example 2: Save to localStorage when data changes
// const [todos, setTodos] = useState([]);

// useEffect(() => {
//   localStorage.setItem('todos', JSON.stringify(todos));
// }, [todos]); // Save every time todos array changes

// // Example 3: Fetch user details when userId changes
// const [userId, setUserId] = useState(1);
// const [userDetails, setUserDetails] = useState(null);

// useEffect(() => {
//   fetch(`/api/users/${userId}`)
//     .then(res => res.json())
//     .then(setUserDetails);
// }, [userId]); // Re-fetch when userId changes

// // Example 4: Sync with external API when multiple values change
// const [filters, setFilters] = useState({ category: '', price: 0 });

// useEffect(() => {
//   fetch(`/api/products?category=${filters.category}&price=${filters.price}`)
//     .then(res => res.json())
//     .then(setProducts);
// }, [filters.category, filters.price]); // Re-fetch when either changes
// ```

// ---

// ## 💀 Phase 3: UNMOUNTING (Death)

// ### What Happens During Unmount?

// 1. Component is about to be removed
// 2. **Cleanup function** from useEffect runs
// 3. Component removed from DOM
// 4. Component disappears from screen

// ### Code Example:

// ```jsx
// function Timer() {
//   const [seconds, setSeconds] = useState(0);
  
//   useEffect(() => {
//     console.log('⏰ Timer started (MOUNT)');
    
//     const intervalId = setInterval(() => {
//       setSeconds(s => s + 1);
//     }, 1000);
    
//     // This cleanup function runs when component UNMOUNTS
//     return () => {
//       console.log('🧹 Cleaning up timer (UNMOUNT)');
//       clearInterval(intervalId);
//     };
    
//   }, []);
  
//   return <div>Seconds: {seconds}</div>;
// }

// // When Timer component is removed from the DOM:
// // 1. 🧹 Cleaning up timer (UNMOUNT) - runs first
// // 2. Timer stops
// // 3. Component removed from screen
// ```

// ### Why Cleanup is Important:

// **Without cleanup:**
// ```jsx
// useEffect(() => {
//   const timer = setInterval(() => {
//     console.log('Running...');
//   }, 1000);
//   // ❌ No cleanup!
// }, []);

// // Problem: When component unmounts, timer keeps running!
// // Memory leak! Timer runs forever even though component is gone.
// ```

// **With cleanup:**
// ```jsx
// useEffect(() => {
//   const timer = setInterval(() => {
//     console.log('Running...');
//   }, 1000);
  
//   return () => {
//     clearInterval(timer); // ✅ Timer stopped
//   };
// }, []);

// // Component unmounts → cleanup runs → timer stopped ✅
// ```

// ### Real-World Cleanup Examples:

// ```jsx
// // Example 1: Event listeners
// useEffect(() => {
//   const handleResize = () => {
//     setWindowWidth(window.innerWidth);
//   };
  
//   window.addEventListener('resize', handleResize);
  
//   // Cleanup: Remove listener on unmount
//   return () => {
//     window.removeEventListener('resize', handleResize);
//   };
// }, []);

// // Example 2: WebSocket connection
// useEffect(() => {
//   const ws = new WebSocket('ws://localhost:8080');
  
//   ws.onmessage = (event) => {
//     setMessages(prev => [...prev, event.data]);
//   };
  
//   // Cleanup: Close connection on unmount
//   return () => {
//     ws.close();
//   };
// }, []);

// // Example 3: Abort API request
// useEffect(() => {
//   const controller = new AbortController();
  
//   fetch('/api/data', { signal: controller.signal })
//     .then(res => res.json())
//     .then(setData)
//     .catch(err => {
//       if (err.name !== 'AbortError') {
//         console.error(err);
//       }
//     });
  
//   // Cleanup: Cancel request if component unmounts before fetch completes
//   return () => {
//     controller.abort();
//   };
// }, []);

// // Example 4: Animation frame
// useEffect(() => {
//   let animationId;
  
//   const animate = () => {
//     setPosition(p => p + 1);
//     animationId = requestAnimationFrame(animate);
//   };
  
//   animationId = requestAnimationFrame(animate);
  
//   // Cleanup: Cancel animation on unmount
//   return () => {
//     cancelAnimationFrame(animationId);
//   };
// }, []);
// ```

// ---

// ## 🔍 Cleanup with Dependencies

// Cleanup also runs **before the next effect** when dependencies change!

// ```jsx
// function ChatRoom({ roomId }) {
//   useEffect(() => {
//     console.log(`🔌 Connecting to room: ${roomId}`);
//     const connection = connectToChat(roomId);
    
//     return () => {
//       console.log(`🔌 Disconnecting from room: ${roomId}`);
//       connection.disconnect();
//     };
//   }, [roomId]);
  
//   return <div>Chat Room: {roomId}</div>;
// }

// // Sequence when roomId changes from 'general' to 'tech':
// // 1. 🔌 Connecting to room: general (MOUNT)
// // 2. User changes room to 'tech'
// // 3. 🔌 Disconnecting from room: general (CLEANUP before new effect)
// // 4. 🔌 Connecting to room: tech (NEW EFFECT runs)
// ```

// ---

// ## 📋 Complete useEffect Patterns

// ### Pattern 1: Run Once on Mount
// ```jsx
// useEffect(() => {
//   console.log('Component mounted');
//   // Initial data fetch, setup, etc.
// }, []); // Empty array = mount only
// ```

// ### Pattern 2: Run on Every Render
// ```jsx
// useEffect(() => {
//   console.log('Component rendered');
//   // Rarely needed!
// }); // No array = every render
// ```

// ### Pattern 3: Run When Dependencies Change
// ```jsx
// useEffect(() => {
//   console.log('Count changed:', count);
//   // React to specific changes
// }, [count]); // Runs when count changes
// ```

// ### Pattern 4: Run on Mount + Cleanup on Unmount
// ```jsx
// useEffect(() => {
//   console.log('Setup');
  
//   return () => {
//     console.log('Cleanup');
//   };
// }, []); // Setup on mount, cleanup on unmount
// ```

// ### Pattern 5: Run on Dependency Change + Cleanup Before Next Run
// ```jsx
// useEffect(() => {
//   console.log('Effect for:', value);
  
//   return () => {
//     console.log('Cleanup for:', value);
//   };
// }, [value]); // Cleanup old, run new when value changes
// ```

// ---

// ## 🎭 Complete Lifecycle Example

// ```jsx
// function CompleteLifecycleDemo({ userId }) {
//   const [data, setData] = useState(null);
//   const [count, setCount] = useState(0);
  
//   console.log('🏃 Component function running');
  
//   // 1. MOUNT - Run once when component appears
//   useEffect(() => {
//     console.log('🎂 MOUNTED - Component appeared on screen');
    
//     // Initial setup
//     document.title = 'Lifecycle Demo';
    
//     return () => {
//       console.log('💀 UNMOUNTED - Component removed from screen');
//       // Final cleanup
//     };
//   }, []);
  
//   // 2. UPDATE - Run when userId changes
//   useEffect(() => {
//     console.log('🔄 UPDATE - userId changed to:', userId);
    
//     fetch(`/api/users/${userId}`)
//       .then(res => res.json())
//       .then(setData);
    
//     return () => {
//       console.log('🧹 Cleanup - userId effect cleanup before next userId');
//     };
//   }, [userId]);
  
//   // 3. UPDATE - Run when count changes
//   useEffect(() => {
//     console.log('🔄 UPDATE - count changed to:', count);
    
//     document.title = `Count: ${count}`;
    
//     // No cleanup needed for this one
//   }, [count]);
  
//   // 4. UPDATE - Run on every render (rarely needed!)
//   useEffect(() => {
//     console.log('🔄 RENDER - Component rendered');
//   }); // No dependency array!
  
//   return (
//     <div>
//       <h1>User: {data?.name}</h1>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }
// ```

// ### Full Execution Log:

// ```
// // === MOUNT ===
// 🏃 Component function running
// 🎂 MOUNTED - Component appeared on screen
// 🔄 UPDATE - userId changed to: 1
// 🔄 UPDATE - count changed to: 0
// 🔄 RENDER - Component rendered

// // === User clicks button (count: 0 → 1) ===
// 🏃 Component function running
// 🔄 UPDATE - count changed to: 1
// 🔄 RENDER - Component rendered

// // === Parent changes userId prop (1 → 2) ===
// 🏃 Component function running
// 🧹 Cleanup - userId effect cleanup before next userId
// 🔄 UPDATE - userId changed to: 2
// 🔄 RENDER - Component rendered

// // === Component removed from DOM ===
// 🧹 Cleanup - userId effect cleanup before next userId
// 💀 UNMOUNTED - Component removed from screen
// ```

// ---

// ## ⚙️ Class Components vs Hooks (For Reference)

// ### Old Way (Class Components):

// ```jsx
// class OldComponent extends React.Component {
//   componentDidMount() {
//     // Runs on MOUNT
//     console.log('Mounted');
//   }
  
//   componentDidUpdate(prevProps, prevState) {
//     // Runs on UPDATE
//     if (prevProps.userId !== this.props.userId) {
//       console.log('userId changed');
//     }
//   }
  
//   componentWillUnmount() {
//     // Runs on UNMOUNT
//     console.log('Unmounted');
//   }
  
//   render() {
//     return <div>Old way</div>;
//   }
// }
// ```

// ### New Way (Hooks):

// ```jsx
// function NewComponent({ userId }) {
//   // MOUNT
//   useEffect(() => {
//     console.log('Mounted');
    
//     // UNMOUNT
//     return () => {
//       console.log('Unmounted');
//     };
//   }, []);
  
//   // UPDATE (when userId changes)
//   useEffect(() => {
//     console.log('userId changed');
//   }, [userId]);
  
//   return <div>New way</div>;
// }
// ```

// **Hooks are simpler, cleaner, and more powerful!**

// ---

// ## 🎓 Key Takeaways

// 1. **Mount** = Component appears → useEffect with `[]` runs
// 2. **Update** = State/props change → Component re-renders → useEffect with `[deps]` runs
// 3. **Unmount** = Component disappears → Cleanup function runs

// 4. **Empty array `[]`** = Run once on mount only
// 5. **With dependencies `[a, b]`** = Run when a or b changes
// 6. **No array** = Run after every render (usually wrong!)

// 7. **Cleanup function** = Runs on unmount OR before next effect
// 8. Always cleanup: timers, listeners, subscriptions, requests

// 9. **Think in terms of synchronization**, not lifecycle methods
// 10. Each effect is independent and manages its own lifecycle

// ---

// ## 🧪 Practice Exercise

// Create a component that demonstrates all 3 phases:

// ```jsx
// function LifecyclePractice({ productId }) {
//   // TODO:
//   // 1. On MOUNT: console.log "Component mounted"
//   // 2. On MOUNT: fetch product data
//   // 3. On MOUNT: start a timer
//   // 4. On UPDATE (productId change): fetch new product data
//   // 5. On UPDATE (productId change): log "Product ID changed to: X"
//   // 6. On UNMOUNT: clear the timer
//   // 7. On UNMOUNT: log "Component unmounted"
  
//   return <div>Product Details</div>;
// }
// ```

// // Time: 20-30 minutes
