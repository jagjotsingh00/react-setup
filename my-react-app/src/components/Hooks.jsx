// useRef Complete Tutorial - All Concepts in One File
// This file teaches: DOM manipulation, input access, previous values,
// useRef vs useState, focus management, and includes a video player project

import { useState, useEffect, useRef } from "react";

/* ============================================
   📚 TABLE OF CONTENTS:
   
   1. What is useRef?
   2. Example 1: DOM Manipulation (Focus Input)
   3. Example 2: Accessing Input Values (Uncontrolled)
   4. Example 3: Previous Value Tracking
   5. Example 4: useRef vs useState (Critical Difference!)
   6. Example 5: Focus Management
   7. PROJECT: Custom Video Player with Controls
   
   ============================================ */

// ============================================
// 1️⃣ WHAT IS useRef?
// ============================================

/* 
useRef is a React Hook that lets you:

1. ✅ Access DOM elements directly (like document.getElementById)
2. ✅ Store mutable values that persist between renders
3. ✅ Keep values that DON'T trigger re-renders when changed

SYNTAX:
  const myRef = useRef(initialValue);
  
  myRef.current = newValue;  // Change the value
  console.log(myRef.current); // Access the value

KEY DIFFERENCE from useState:
  - useState → Changing triggers re-render
  - useRef → Changing does NOT trigger re-render
*/

// ============================================
// 2️⃣ EXAMPLE 1: DOM MANIPULATION (Focus Input)
// ============================================

function Example1_FocusInput() {
  // Create a ref to store the input element
  const inputRef = useRef(null);

  const handleFocus = () => {
    // Access the actual DOM element with .current
    console.log("Input element:", inputRef.current);

    // Call DOM methods directly
    inputRef.current.focus();
    inputRef.current.select(); // Also select all text
  };

  return (
    <div style={styles.example}>
      <h3>Example 1: Focus Input with useRef</h3>

      {/* Attach ref to the input */}
      <input
        ref={inputRef} // ← This connects the ref to this DOM element
        type="text"
        placeholder="Click button to focus me"
        style={styles.input}
      />

      <button onClick={handleFocus} style={styles.button}>
        Focus & Select Input
      </button>

      <div style={styles.explanation}>
        💡 <strong>Explanation:</strong> useRef gives us direct access to DOM
        elements. We can call methods like .focus(), .blur(), .select(), etc.
      </div>
    </div>
  );
}

// // ============================================
// // 3️⃣ EXAMPLE 2: Accessing Input Values (Uncontrolled)
// // ============================================

function Example2_UncontrolledInput() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get values directly from DOM (no state needed!)
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    console.log("Name:", name);
    console.log("Email:", email);

    setSubmittedData({ name, email });

    // Clear the inputs
    nameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <div style={styles.example}>
      <h3>Example 2: Uncontrolled Form (useRef)</h3>

      <form onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          type="text"
          placeholder="Name"
          style={styles.input}
        />

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      {submittedData && (
        <div style={styles.result}>
          <p>
            <strong>Submitted:</strong>
          </p>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
        </div>
      )}

      <div style={styles.explanation}>
        💡 <strong>Uncontrolled Component:</strong> We don't track input values
        in state. We only read them when needed (on submit). Good for simple
        forms!
      </div>
    </div>
  );
}

// ============================================
// 4️⃣ EXAMPLE 3: Previous Value Tracking
// ============================================

function Example3_PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    // After every render, save the current count as "previous"
    prevCountRef.current = count;
  }, [count]);

  return (
    <div style={styles.example}>
      <h3>Example 3: Track Previous Value</h3>

      <div style={styles.counterBox}>
        <div style={styles.statBox}>
          <div style={styles.bigNumber}>{count}</div>
          <div style={styles.label}>Current Count</div>
        </div>

        <div style={styles.statBox}>
          <div style={styles.bigNumber}>{prevCountRef.current}</div>
          <div style={styles.label}>Previous Count</div>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={() => setCount(count + 1)} style={styles.button}>
          Increment
        </button>

        <button onClick={() => setCount(count - 1)} style={styles.button}>
          Decrement
        </button>

        <button onClick={() => setCount(0)} style={styles.buttonSecondary}>
          Reset
        </button>
      </div>

      <div style={styles.explanation}>
        💡 <strong>How it works:</strong>
        <br />
        1. Count changes (state update)
        <br />
        2. Component re-renders
        <br />
        3. useEffect runs AFTER render
        <br />
        4. We save current count to ref (for next time)
        <br />
        <br />
        <strong>Note:</strong> Updating ref does NOT trigger re-render!
      </div>
    </div>
  );
}

// ============================================
// 5️⃣ EXAMPLE 4: useRef vs useState (Critical!)
// ============================================

function Example4_RefVsState() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  const renderCount = useRef(0);

  // Track how many times component rendered
  renderCount.current = renderCount.current + 1;

  const incrementState = () => {
    setStateCount(stateCount + 1);
    console.log("State incremented → Component will RE-RENDER");
  };

  const incrementRef = () => {
    refCount.current = refCount.current + 1;
    console.log("Ref incremented → Component will NOT re-render");
    console.log("New ref value:", refCount.current);
  };

  return (
    <div style={styles.example}>
      <h3>Example 4: useRef vs useState</h3>

      <div style={styles.warning}>
        ⚠️ <strong>Open Console (F12) to see the difference!</strong>
      </div>

      <div style={styles.comparisonBox}>
        <div style={styles.column}>
          <h4>useState (Causes Re-render)</h4>
          <div style={styles.bigNumber}>{stateCount}</div>
          <button onClick={incrementState} style={styles.button}>
            Increment State
          </button>
          <p style={styles.small}>👆 Screen updates immediately</p>
        </div>

        <div style={styles.column}>
          <h4>useRef (No Re-render)</h4>
          <div style={styles.bigNumber}>{refCount.current}</div>
          <button onClick={incrementRef} style={styles.button}>
            Increment Ref
          </button>
          <p style={styles.small}>👆 Screen does NOT update!</p>
        </div>
      </div>

      <div style={styles.renderInfo}>
        Component rendered: <strong>{renderCount.current}</strong> times
      </div>

      <div style={styles.explanation}>
        💡 <strong>Key Difference:</strong>
        <br />• <strong>useState:</strong> Change triggers re-render, UI updates
        <br />• <strong>useRef:</strong> Change does NOT trigger re-render, UI
        doesn't update
        <br />
        <br />
        <strong>Use useRef when:</strong>
        <br />
        • You need to store a value between renders
        <br />
        • You DON'T want to trigger re-render when it changes
        <br />
        • Timers, intervals, previous values, DOM refs
        <br />
        <br />
        <strong>Use useState when:</strong>
        <br />
        • You want the UI to update when value changes
        <br />• Form inputs, counters, toggles, user data
      </div>
    </div>
  );
}

// ============================================
// 6️⃣ EXAMPLE 5: Focus Management (Advanced)
// ============================================

function Example5_FocusManagement() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);
  const editInputRefs = useRef({});

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus edit input when editing starts
  useEffect(() => {
    if (editingId !== null) {
      editInputRefs.current[editingId]?.focus();
    }
  }, [editingId]);

  const addTask = (e) => {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (text) {
      setTasks([...tasks, { id: Date.now(), text }]);
      inputRef.current.value = "";
      inputRef.current.focus(); // Keep focus on input
    }
  };

  const startEdit = (id) => {
    setEditingId(id);
  };

  const saveEdit = (id) => {
    const newText = editInputRefs.current[id].value.trim();
    if (newText) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task,
        ),
      );
    }
    setEditingId(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={styles.example}>
      <h3>Example 5: Focus Management</h3>

      <form onSubmit={addTask} style={styles.taskForm}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a task..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add
        </button>
      </form>

      <div style={styles.taskList}>
        {tasks.map((task) => (
          <div key={task.id} style={styles.taskItem}>
            {editingId === task.id ? (
              <>
                <input
                  ref={(el) => (editInputRefs.current[task.id] = el)}
                  defaultValue={task.text}
                  style={styles.editInput}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") saveEdit(task.id);
                  }}
                />
                <button
                  onClick={() => saveEdit(task.id)}
                  style={styles.buttonSmall}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={styles.taskText}>{task.text}</span>
                <button
                  onClick={() => startEdit(task.id)}
                  style={styles.buttonSmall}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={styles.buttonSmallDanger}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={styles.explanation}>
        💡 <strong>Focus Management:</strong>
        <br />
        • Input auto-focuses when page loads
        <br />
        • Edit input auto-focuses when clicking "Edit"
        <br />
        • Input stays focused after adding task
        <br />• Press Enter to save edited task
      </div>
    </div>
  );
}

// ============================================
// 7️⃣ PROJECT: Custom Video Player
// ============================================

function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current time while playing
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Set duration when video loads
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  // Seek to specific time
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Volume control
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Playback speed
  const handleSpeedChange = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  // Skip forward/backward
  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.videoPlayerContainer}>
      <h3>🎬 Custom Video Player Project</h3>

      <div style={styles.videoWrapper}>
        <video
          ref={videoRef}
          style={styles.video}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls */}
        <div style={styles.controls}>
          {/* Play/Pause Button */}
          <button onClick={togglePlay} style={styles.controlButton}>
            {isPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>

          {/* Skip Buttons */}
          <button onClick={() => skip(-10)} style={styles.controlButton}>
            ⏪ -10s
          </button>
          <button onClick={() => skip(10)} style={styles.controlButton}>
            ⏩ +10s
          </button>

          {/* Time Display */}
          <span style={styles.timeDisplay}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={styles.progressBar}
          />

          {/* Volume Control */}
          <div style={styles.volumeControl}>
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              style={styles.volumeSlider}
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>

          {/* Playback Speed */}
          <div style={styles.speedControl}>
            <span>Speed:</span>
            {[0.5, 1, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                style={{
                  ...styles.speedButton,
                  backgroundColor:
                    playbackRate === speed ? "#3b82f6" : "#6b7280",
                }}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} style={styles.controlButton}>
            ⛶ Fullscreen
          </button>
        </div>
      </div>

      <div style={styles.projectExplanation}>
        <h4>🎯 What This Project Demonstrates:</h4>
        <ul style={styles.list}>
          <li>
            <strong>DOM Access:</strong> videoRef.current gives us the video
            element
          </li>
          <li>
            <strong>Methods:</strong> .play(), .pause(), .requestFullscreen()
          </li>
          <li>
            <strong>Properties:</strong> .currentTime, .duration, .volume,
            .playbackRate
          </li>
          <li>
            <strong>Events:</strong> onTimeUpdate, onLoadedMetadata, onEnded
          </li>
          <li>
            <strong>No state for video element:</strong> We manipulate it
            directly with ref
          </li>
        </ul>

        <h4>🔧 Features Implemented:</h4>
        <ul style={styles.list}>
          <li>✅ Play/Pause toggle</li>
          <li>✅ Progress bar (seek)</li>
          <li>✅ Time display</li>
          <li>✅ Volume control</li>
          <li>✅ Playback speed (0.5x to 2x)</li>
          <li>✅ Skip forward/backward (10 seconds)</li>
          <li>✅ Fullscreen mode</li>
        </ul>

        <h4>💡 Key Takeaways:</h4>
        <div style={styles.keyPoint}>
          <strong>useRef is perfect for video/audio players because:</strong>
          <br />
          • We need direct access to media element methods
          <br />
          • We don't want to re-render when time updates every frame
          <br />
          • We can read/write properties without triggering renders
          <br />• We can call native DOM methods like .play(), .pause()
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP - All Examples Together
// ============================================

function UseRefTutorial() {
  const [activeExample, setActiveExample] = useState("intro");

  const examples = [
    { id: "intro", label: "Introduction", component: IntroSection },
    { id: "ex1", label: "1. Focus Input", component: Example1_FocusInput },
    {
      id: "ex2",
      label: "2. Uncontrolled Form",
      component: Example2_UncontrolledInput,
    },
    {
      id: "ex3",
      label: "3. Previous Value",
      component: Example3_PreviousValue,
    },
    { id: "ex4", label: "4. Ref vs State", component: Example4_RefVsState },
    {
      id: "ex5",
      label: "5. Focus Management",
      component: Example5_FocusManagement,
    },
    { id: "project", label: "🎬 Video Player", component: VideoPlayer },
  ];

  const ActiveComponent = examples.find(
    (ex) => ex.id === activeExample,
  )?.component;

  return (
    <div style={styles.app}>
      <h1 style={styles.mainTitle}>useRef Hook - Complete Tutorial</h1>

      <div style={styles.navigation}>
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setActiveExample(example.id)}
            style={{
              ...styles.navButton,
              backgroundColor:
                activeExample === example.id ? "#3b82f6" : "#e5e7eb",
              color: activeExample === example.id ? "white" : "#1f2937",
            }}
          >
            {example.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>{ActiveComponent && <ActiveComponent />}</div>
    </div>
  );
}

// Introduction Section
function IntroSection() {
  return (
    <div style={styles.intro}>
      <h2>Welcome to useRef Tutorial! 🎯</h2>

      <div style={styles.section}>
        <h3>What is useRef?</h3>
        <p>
          <strong>useRef</strong> is a React Hook that lets you reference a
          value that's not needed for rendering. It has two main uses:
        </p>
        <ol style={styles.list}>
          <li>
            <strong>Access DOM elements directly</strong> (like
            document.getElementById)
          </li>
          <li>
            <strong>Store mutable values</strong> that persist between renders
            without causing re-renders
          </li>
        </ol>
      </div>

      <div style={styles.section}>
        <h3>Basic Syntax:</h3>
        <pre style={styles.code}>
          {`const myRef = useRef(initialValue);

// Access/modify the value:
myRef.current = newValue;
console.log(myRef.current);

// Attach to DOM element:
<input ref={myRef} />`}
        </pre>
      </div>

      <div style={styles.section}>
        <h3>When to Use useRef:</h3>
        <ul style={styles.list}>
          <li>✅ Focus an input field</li>
          <li>✅ Scroll to an element</li>
          <li>✅ Store timer/interval IDs</li>
          <li>✅ Track previous values</li>
          <li>✅ Access video/audio player controls</li>
          <li>✅ Store values that don't need to trigger re-renders</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h3>useRef vs useState:</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Feature</th>
              <th style={styles.th}>useRef</th>
              <th style={styles.th}>useState</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Triggers re-render?</td>
              <td style={styles.td}>❌ No</td>
              <td style={styles.td}>✅ Yes</td>
            </tr>
            <tr>
              <td style={styles.td}>Persists between renders?</td>
              <td style={styles.td}>✅ Yes</td>
              <td style={styles.td}>✅ Yes</td>
            </tr>
            <tr>
              <td style={styles.td}>Access value</td>
              <td style={styles.td}>.current</td>
              <td style={styles.td}>directly</td>
            </tr>
            <tr>
              <td style={styles.td}>Update value</td>
              <td style={styles.td}>ref.current = x</td>
              <td style={styles.td}>setState(x)</td>
            </tr>
            <tr>
              <td style={styles.td}>Use case</td>
              <td style={styles.td}>DOM, timers, previous values</td>
              <td style={styles.td}>UI state, form inputs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.callout}>
        <h3>🚀 Ready to Learn?</h3>
        <p>
          Click through the examples in order to understand each concept step by
          step!
        </p>
      </div>
    </div>
  );
}

// Styles
const styles = {
  app: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "black",
  },
  mainTitle: {
    textAlign: "center",
    color: "#1f2937",
    marginBottom: "30px",
  },
  navigation: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  navButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s",
  },
  content: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  intro: {
    lineHeight: "1.6",
  },
  section: {
    marginBottom: "30px",
  },
  code: {
    backgroundColor: "#1f2937",
    color: "#10b981",
    padding: "15px",
    borderRadius: "8px",
    overflow: "auto",
    fontSize: "14px",
  },
  list: {
    lineHeight: "2",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#f3f4f6",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #e5e7eb",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
  },
  callout: {
    backgroundColor: "#dbeafe",
    padding: "20px",
    borderRadius: "8px",
    borderLeft: "4px solid #3b82f6",
  },
  example: {
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "2px solid #e5e7eb",
    marginRight: "10px",
    marginBottom: "10px",
    minWidth: "200px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "10px",
    marginBottom: "10px",
  },
  buttonSecondary: {
    padding: "10px 20px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  explanation: {
    backgroundColor: "#fef3c7",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "15px",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  result: {
    backgroundColor: "#d1fae5",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "15px",
  },
  counterBox: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  statBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    minWidth: "150px",
  },
  bigNumber: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#3b82f6",
  },
  label: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "5px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  warning: {
    backgroundColor: "#fee2e2",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    textAlign: "center",
  },
  comparisonBox: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  column: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  small: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "5px",
  },
  renderInfo: {
    backgroundColor: "#e0e7ff",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "16px",
  },
  taskForm: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  taskList: {
    marginBottom: "20px",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "6px",
    marginBottom: "8px",
  },
  taskText: {
    flex: 1,
  },
  editInput: {
    flex: 1,
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "2px solid #3b82f6",
  },
  buttonSmall: {
    padding: "6px 12px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  buttonSmallDanger: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  videoPlayerContainer: {
    padding: "20px",
  },
  videoWrapper: {
    backgroundColor: "#000",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  video: {
    width: "100%",
    display: "block",
  },
  controls: {
    backgroundColor: "#1f2937",
    padding: "15px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  controlButton: {
    padding: "8px 12px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  timeDisplay: {
    color: "white",
    fontSize: "14px",
    minWidth: "100px",
  },
  progressBar: {
    flex: 1,
    minWidth: "100px",
  },
  volumeControl: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "white",
    fontSize: "14px",
  },
  volumeSlider: {
    width: "80px",
  },
  speedControl: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "white",
    fontSize: "14px",
  },
  speedButton: {
    padding: "4px 8px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  projectExplanation: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "8px",
  },
  keyPoint: {
    backgroundColor: "#dbeafe",
    padding: "15px",
    borderRadius: "6px",
    marginTop: "10px",
  },
};

export default UseRefTutorial;
