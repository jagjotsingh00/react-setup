import { useState, useEffect } from "react";

const styles = {
    borderedBox: {
        border: "2px solid #3b82f6",
        borderRadius: "8px",
        padding: "10px",
    },

    hocTitle: {
        color: "#3b82f6",
        marginBottom: "10px",
    },

    avatar: {
        fontSize: "40px",
        marginBottom: "10px",
    },

    example: {
        padding: "20px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
    },

    userCard: {
        background: "#f0f9ff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
    },

    statsCard: {
        background: "#f9fafb",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
    },

    statsValue: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#3b82f6",
    },

    statsLabel: {
        fontSize: "14px",
        color: "#6b7280",
    },
};


//  HOC: withBorder
function withBorder(Component) {
    return function WithBorder(props) {
        return (
            <div style={styles.borderedBox}>
                <Component {...props} />
            </div>
        );
    };
}

//  HOC: withTitle
function withTitle(Component, title) {
    return function WithTitle(props) {
        return (
            <div>
                <h3 style={styles.hocTitle}>{title}</h3>
                <Component {...props} />
            </div>
        );
    };
}


//  Base Components

function UserCard({ name, role }) {
    return (
        <div style={styles.userCard}>
            <div style={styles.avatar}>👤</div>
            <h4>{name}</h4>
            <p>{role}</p>
        </div>
    );
}

function StatsCard({ label, value }) {
    return (
        <div style={styles.statsCard}>
            <div style={styles.statsValue}>{value}</div>
            <div style={styles.statsLabel}>{label}</div>
        </div>
    );
}



const BorderedUserCard = withBorder(UserCard);
const TitleUserCard = withTitle(UserCard, "Team Member");
const BorderedStatsCard = withBorder(StatsCard);



function Example1_basicsHOC() {
    return (
        <div style={styles.example}>
            <h3>Basic HOC Pattern</h3>

            <div style={styles.grid}>
                <div>
                    <h4>Original Component:</h4>
                    <UserCard name="Jagjot Singh" role="Frontend Developer" />
                </div>

                <div>
                    <h4>With Border HOC:</h4>
                    <BorderedUserCard name="Jagjot Singh" role="Frontend Developer" />
                </div>

                <div>
                    <h4>With Title HOC:</h4>
                    <TitleUserCard name="Jagjot Singh" role="Frontend Developer" />
                </div>
            </div>

            <div style={styles.grid}>
                <div>
                    <h4>Stats - Original:</h4>
                    <StatsCard label="Total Users" value="1,234" />
                </div>

                <div>
                    <h4>Stats - With Border:</h4>
                    <BorderedStatsCard label="Total Users" value="1,234" />
                </div>
            </div>
        </div>
    );
}

export default Example1_basicsHOC;



// ==================================================================================

// EXAMPLE 2: withLoading HOC

function withLoading(Component) {
    return function withLoading({ isLoading, ...props }) {
        if (isLoading) {
            return (
                <div style={styles.loadingContainer}>
                    <div styl></div>
                    <p>Loading...</p>
                </div>)
        }

        return <Component {...props} />
    }
}

// Sample component

function UserList({ users }) {
    return (
        <div style={styles.userList}>
            <h4>User List</h4>
            {users.map(user => (
                <div key={user.id} style={styles.userItem}>
                    <span>{user.name}</span>
                    <span style={styles.badge}>{user.role}</span>
                </div>
            ))}
        </div>
    )
}

// Enhanced component with loading
const UserListWithLoading = withLoading(UserList);

function Example2_WithLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([
        { id: 1, name: 'Jagjot Singh', role: 'Frontend Dev' },
        { id: 2, name: 'Harshdeep Singh', role: 'Developer' },
        { id: 3, name: 'Priya Sharma', role: 'Designer' },
    ]);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div style={styles.example}>
            <h3>Example: withLoading HOC</h3>

            <button onClick={handleRefresh} style={styles.button}>
                Refresh Data (Shows Loading)
            </button>

            <UserListWithLoading isLoading={isLoading} users={users} />
        </div>
    )
}

export { Example2_WithLoading }



// ===================================================================================

//  EXAMPLE 3: withLogger HOC

function withLogger(Component, componentName) {
    return function WithLogger(props) {
        useEffect(() => {
            console.log(`[${componentName}] Mounted`);
            console.log(`[${componentName}] Props:`, props);

            return () => {
                console.log(`[${componentName}] Unmounted`);
            };
        }, [props]);

        return <Component {...props} />;
    }
}

// Sample counter component

function Counter({ initialCount = 0 }) {
    const [count, setCount] = useState(initialCount);

    return (
        <div style={styles.counterBox}>
            <div style={styles.bigNumber}>{count}</div>
            <div style={styles.buttonGroup}>
                <button onClick={() => setCount(count + 1)} style={styles.button}>
                    +1
                </button>
                <button onClick={() => setCount(count - 1)} style={styles.button}>
                    -1
                </button>
            </div>
        </div>
    );
}

// Enhanced with logger

const CounterWithLogger = withLogger(Counter, 'Counter');

function Example3_WithLogger() {
    const [showCounter, setShowCounter] = useState(true);

    return (
        <div style={styles.example}>
            <h3>Example: withLogger HOC</h3>

            <button
                onClick={() => setShowCounter(!showCounter)}
                style={styles.button}
            >
                {showCounter ? 'Unmount' : 'Mount'} Counter
            </button>

            {showCounter && <CounterWithLogger initialCount={0} />}
        </div>
    )
}
export { Example3_WithLogger }


// ================================================================================

//  EXAMPLE 4: withToggle HOC

function withToggle(Component) {
    return function WithToggle(props) {
        const [isVisible, setIsVisible] = useState(true);
      return (
          <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ?'Hide':'Show'}
            </button>
             {isVisible && <Component {...props} />}
        </div>
      )
    }
}


// Sample content component

function ContentBox({ title, content }) {
  return (
    <div style={styles.contentBox}>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
}

const ToggleableContent = withToggle(ContentBox);

function Example4_WithToggle() {
  return (
    <div style={styles.example}>
      <h3>Example: withToggle HOC</h3>

      <ToggleableContent
        title="React Best Practices"
        content="Always use keys in lists, avoid unnecessary re-renders, keep components small and focused, use custom hooks for reusable logic."
      />

      <ToggleableContent
        title="JavaScript Tips"
        content="Use const and let instead of var, leverage destructuring, master async/await, understand closures and scope."
      />
      </div>
  )
}
export {Example4_WithToggle};
