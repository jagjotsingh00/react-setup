import { useEffect, useRef, useState } from "react";



const UsePracticeRef = () => {
    const inputRef = useRef(null);

    const inputHandle = () => {
        inputRef.current.focus();
        inputRef.current.style.color = "red";
    };

    return (
        <>
            {/* TASK 1 */}
            <div>
                <input ref={inputRef} type="text" placeholder="Enter Username" />
                <button onClick={inputHandle}>Focus On Input Field</button>
            </div>
        </>
    );
};

function UnControlledInput() {
    const nameRef = useRef(null);
    const mailRef = useRef(null);
    const [submitData, setSubmitData] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = mailRef.current.value;

        setSubmitData({ name, email });

        nameRef.current.value = "";
        mailRef.current.value = "";
    }

    return (
        <div>
            <h3>Example 2: Uncontrolled Form (useRef)</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    ref={nameRef}
                />

                <input
                    type="email"
                    placeholder="Email"
                    ref={mailRef}
                />

                <button type="submit">Submit</button>
            </form>

            {submitData && (
                <div>
                    <p><strong>Submitted:</strong></p>
                    <p>Name: {submitData.name}</p>
                    <p>Email: {submitData.email}</p>
                </div>
            )}
        </div>
    );
}

export default UsePracticeRef;
export { UnControlledInput }

const styles = {
    counterBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#f9fafb",
        borderRadius: "10px",
    },

    statBox: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        minWidth: "150px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },

    bigNumber: {
        fontSize: "40px",
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

        flexWrap: "wrap",
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
    },

    buttonSecondary: {
        padding: "10px 20px",
        backgroundColor: "#6b7280",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
    }
};

function PreviousValue() {
    const [count, setCount] = useState(0);
    const previousCountRef = useRef(0);

    useEffect(() => {
        previousCountRef.current = count;
    }, [count]);

    return (
        <>
            <h3>Example 3: Track Previous Value</h3>
            <div style={styles.counterBox}>
                <div style={styles.statBox}>
                    <div style={styles.bigNumber}>{count}</div>
                    <div style={styles.label}>Current Count</div>
                </div>

                <div style={styles.statBox}>
                    <div style={styles.bigNumber}>{previousCountRef.current}</div>
                    <div style={styles.label}>Previous Count</div>
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
            </div>

        </>
    )
}
export { PreviousValue }

function RefVsState() {
    const [count, setCount] = useState(0);
    const refCount = useRef(0);
    const renderCount = useRef(0);

    renderCount.current += 1;

    function incrementState() {
        setCount(count + 1);
    }

    function incrementRef() {
        refCount.current += 1;
        console.log(refCount.current);
    }
    return (
        <>
            <h3>Example 4: useRef vs useState</h3>
            <div>
                <div style={styles.bigNumber}>{count}</div>
                <button onClick={incrementState} style={styles.button}>
                    Increment State
                </button>
            </div>
            <div>
                <div style={styles.bigNumber}>{refCount.current}</div>
                <button onClick={incrementRef} style={styles.button}>
                    Increment Ref
                </button>
            </div>
        </>
    )
}
export { RefVsState }

function FocusManagement() {
    const [task, setTask] = useState([]);
    const [editId, setEditId] = useState(null);
    const inputRef = useRef(null);
    const editInputRef = useRef({})

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    useEffect(() => {
        if (editId !== null) {
            editInputRef.current[editId]?.focus();
        }
    }, [editId])

    const addTask = (e) => {
        e.preventDefault();
        const text = inputRef.current.value.trim();
        if (text) {
            setTask([...task, { id: Date.now(), text }]);
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }
    const startEdit = (id) => {
        setEditId(id);
    };

    const saveEdit = (id) => {
        const newText = editInputRef.current[id].value.trim();
        if (newText) {
            setTask(
                task.map((task) =>
                    task.id === id ? { ...task, text: newText } : task,
                ),
            );
        }
        setEditId(null);
    };
    const deleteTask = (id) => {
        setTask(task.filter((task) => task.id !== id))
    }
    return (
        <div style={{ padding: "20px" }}>
            <h3>Example 5: Focus Management</h3>

            {/* Add Task */}
            <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add a task..."
                    style={{ padding: "10px", marginRight: "10px" }}
                />
                <button type="submit">Add</button>
            </form>

            {/* Task List */}
            <div>
                {task.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        {editId === item.id ? (
                            <>
                                <input
                                    ref={(el) => (editInputRef.current[item.id] = el)}
                                    defaultValue={item.text}
                                />

                                <button onClick={() => saveEdit(item.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{item.text}</span>

                                <button onClick={() => startEdit(item.id)}>Edit</button>

                                <button onClick={() => deleteTask(item.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

}
export { FocusManagement }


function VideoPlayer() {

const styles = {
  videoPlayerContainer: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  video: {
    width: "100%",
    borderRadius: "12px",
    display: "block",
    backgroundColor: "#000",
    marginBottom: "10px",
  },

  controls: {
    backgroundColor: "#1f2937",
    padding: "15px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
    borderRadius: "10px",
  },

  controlButton: {
    padding: "8px 12px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
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
    padding: "5px 8px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  }
};

  const videoRef = useRef(null);

  // ✅ fixed naming
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ✅ fixed spelling
  const [volume, setVolume] = useState(1);

  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleSpeedChange = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const skip = (sec) => {
    videoRef.current.currentTime += sec;
  };

  const toggleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.videoPlayerContainer}>
      <h3>🎬 Custom Video Player Project</h3>

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
      </video>

      {/* ✅ controls wrapper */}
      <div style={styles.controls}>

        {/* ✅ FIXED PLAY BUTTON */}
        <button onClick={togglePlay} style={styles.controlButton}>
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>

        <button onClick={() => skip(-10)} style={styles.controlButton}>
          ⏪ -10s
        </button>

        <button onClick={() => skip(10)} style={styles.controlButton}>
          ⏩ +10s
        </button>

        <span style={styles.timeDisplay}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          style={styles.progressBar}
        />

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

        <button onClick={toggleFullscreen} style={styles.controlButton}>
          ⛶ Fullscreen
        </button>
      </div>
    </div>
  );
}
export { VideoPlayer }