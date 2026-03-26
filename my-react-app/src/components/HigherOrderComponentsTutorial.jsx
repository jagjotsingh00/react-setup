// Higher Order Components (HOC) Complete Tutorial - All in One File
// Topics: HOC pattern, withAuth, withLoading, Props forwarding
// Project: Authentication wrapper system

import { useState, useEffect } from 'react';

/* ============================================
   📚 TABLE OF CONTENTS:
   
   1. What are Higher Order Components (HOC)?
   2. Basic HOC Pattern
   3. Example 1: withLoading HOC
   4. Example 2: withLogger HOC
   5. Example 3: withToggle HOC
   6. Props Forwarding
   7. PROJECT: Authentication System (withAuth)
   
   ============================================ */


// ============================================
// 1️⃣ WHAT ARE HIGHER ORDER COMPONENTS (HOC)?
// ============================================

/* 
A Higher Order Component (HOC) is a function that takes a component 
and returns a new component with additional props or behavior.

FORMULA:
  HOC = (Component) => EnhancedComponent

THINK OF IT LIKE:
- A wrapper that adds superpowers to components
- Like a decorator in other programming languages
- Middleware for React components

WHY USE HOCs?
✅ Reuse component logic
✅ Add behavior to existing components
✅ Conditional rendering
✅ Props manipulation
✅ Abstract common patterns

NAMING CONVENTION:
- Start with "with" (e.g., withAuth, withLoading, withData)

NOTE: HOCs are an older pattern. Custom Hooks are now preferred,
but HOCs are still used in many codebases and libraries.
*/


// ============================================
// 2️⃣ BASIC HOC PATTERN
// ============================================

/* 
Basic structure of an HOC:

function withSomething(WrappedComponent) {
  return function EnhancedComponent(props) {
    // Add logic here
    
    return <WrappedComponent {...props} />;
  };
}
*/

// Simple example: Add a border to any component
function withBorder(Component) {
  return function WithBorder(props) {
    return (
      <div style={styles.borderedBox}>
        <Component {...props} />
      </div>
    );
  };
}

// Simple example: Add a title to any component
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

// Simple components to enhance
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

// Enhanced components using HOCs
const BorderedUserCard = withBorder(UserCard);
const TitledUserCard = withTitle(UserCard, "Team Member");
const BorderedStatsCard = withBorder(StatsCard);

function Example1_BasicHOC() {
  return (
    <div style={styles.example}>
      <h3>Basic HOC Pattern</h3>
      
      <div style={styles.grid}>
        <div>
          <h4>Original Component:</h4>
          <UserCard name="Inder Singh" role="Senior Developer" />
        </div>
        
        <div>
          <h4>With Border HOC:</h4>
          <BorderedUserCard name="Inder Singh" role="Senior Developer" />
        </div>
        
        <div>
          <h4>With Title HOC:</h4>
          <TitledUserCard name="Inder Singh" role="Senior Developer" />
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
      
      <div style={styles.explanation}>
        💡 <strong>How HOCs Work:</strong><br/>
        <br/>
        1. HOC is a function that takes a component<br/>
        2. Returns a new component with added functionality<br/>
        3. Original component is wrapped, not modified<br/>
        4. Props are passed through to original component<br/>
        <br/>
        <strong>Formula:</strong> EnhancedComponent = withFeature(OriginalComponent)
      </div>
      
      <div style={styles.codeBox}>
        <h4>Basic HOC Structure:</h4>
        <pre style={styles.code}>{`function withBorder(Component) {
  return function WithBorder(props) {
    return (
      <div style={{ border: '2px solid blue' }}>
        <Component {...props} />
      </div>
    );
  };
}

// Usage:
const BorderedCard = withBorder(UserCard);
<BorderedCard name="John" role="Developer" />`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 3️⃣ EXAMPLE 2: withLoading HOC
// ============================================

// HOC that shows loading state
function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
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
  );
}

// Enhanced component with loading
const UserListWithLoading = withLoading(UserList);

function Example2_WithLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Inder Singh', role: 'Senior Dev' },
    { id: 2, name: 'Rahul Kumar', role: 'Developer' },
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
      
      <div style={styles.explanation}>
        💡 <strong>withLoading Benefits:</strong><br/>
        ✅ Reusable loading logic<br/>
        ✅ Any component can use it<br/>
        ✅ Consistent loading UI across app<br/>
        ✅ Component doesn't need to handle loading state<br/>
        <br/>
        <strong>Try it:</strong> Click "Refresh Data" to see loading state!
      </div>
      
      <div style={styles.codeBox}>
        <h4>withLoading HOC:</h4>
        <pre style={styles.code}>{`function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage:
const UserListWithLoading = withLoading(UserList);
<UserListWithLoading isLoading={true} users={[]} />`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 4️⃣ EXAMPLE 3: withLogger HOC
// ============================================

// HOC that logs component lifecycle
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
  };
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
      
      <div style={styles.consoleWarning}>
        🔍 <strong>Open Console (F12) to see logs!</strong>
      </div>
      
      <button 
        onClick={() => setShowCounter(!showCounter)} 
        style={styles.button}
      >
        {showCounter ? 'Unmount' : 'Mount'} Counter
      </button>
      
      {showCounter && <CounterWithLogger initialCount={10} />}
      
      <div style={styles.explanation}>
        💡 <strong>withLogger Benefits:</strong><br/>
        ✅ Debug component lifecycle easily<br/>
        ✅ Track when components mount/unmount<br/>
        ✅ See props being passed<br/>
        ✅ Useful for development<br/>
        <br/>
        <strong>Console Logs:</strong><br/>
        • "Mounted" when component appears<br/>
        • "Props" showing what was passed<br/>
        • "Unmounted" when component is removed
      </div>
      
      <div style={styles.codeBox}>
        <h4>withLogger HOC:</h4>
        <pre style={styles.code}>{`function withLogger(Component, componentName) {
  return function WithLogger(props) {
    useEffect(() => {
      console.log(\`[\${componentName}] Mounted\`);
      console.log(\`[\${componentName}] Props:\`, props);
      
      return () => {
        console.log(\`[\${componentName}] Unmounted\`);
      };
    }, [props]);
    
    return <Component {...props} />;
  };
}`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 5️⃣ EXAMPLE 4: withToggle HOC
// ============================================

// HOC that adds toggle functionality
function withToggle(Component) {
  return function WithToggle(props) {
    const [isVisible, setIsVisible] = useState(true);
    
    return (
      <div>
        <button 
          onClick={() => setIsVisible(!isVisible)} 
          style={styles.toggleButton}
        >
          {isVisible ? '👁️ Hide' : '👁️‍🗨️ Show'}
        </button>
        {isVisible && <Component {...props} />}
      </div>
    );
  };
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
      
      <div style={styles.explanation}>
        💡 <strong>withToggle Benefits:</strong><br/>
        ✅ Any component becomes toggleable<br/>
        ✅ Consistent toggle UI<br/>
        ✅ No need to manage visibility state in each component<br/>
        ✅ Perfect for collapsible sections
      </div>
      
      <div style={styles.codeBox}>
        <h4>withToggle HOC:</h4>
        <pre style={styles.code}>{`function withToggle(Component) {
  return function WithToggle(props) {
    const [isVisible, setIsVisible] = useState(true);
    
    return (
      <div>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </button>
        {isVisible && <Component {...props} />}
      </div>
    );
  };
}`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 6️⃣ PROPS FORWARDING
// ============================================

/* 
Props forwarding means passing all props from the HOC to the wrapped component.
This is crucial! Without it, the wrapped component won't receive props.

WRONG:
  function withSomething(Component) {
    return function(props) {
      return <Component />;  // ❌ Props not passed!
    };
  }

CORRECT:
  function withSomething(Component) {
    return function(props) {
      return <Component {...props} />;  // ✅ Props forwarded!
    };
  }
*/

// HOC that adds extra prop
function withUserInfo(Component) {
  return function WithUserInfo(props) {
    const userInfo = {
      name: 'Inder Singh',
      company: 'NetSquare Softwares',
      role: 'Senior Developer'
    };
    
    // Forward all original props + add new prop
    // return <Component {...props} userInfo={userInfo} />;
  };
}

// Component that uses both original props and new prop
function Dashboard({ title, userInfo }) {
  return (
    <div style={styles.dashboard}>
      <h3>{}</h3>
      <div style={styles.userInfoBox}>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Company:</strong> {userInfo.company}</p>
        <p><strong>Role:</strong> {userInfo.role}</p>
      </div>
    </div>
  );
}

const DashboardWithUserInfo = withUserInfo(Dashboard);

function Example5_PropsForwarding() {
  return (
    <div style={styles.example}>
      {/* <h3>Props Forwarding</h3> */}
      
      <DashboardWithUserInfo title="Admin Dashboard" />
      
      <div style={styles.explanation}>
        💡 <strong>Props Forwarding Rules:</strong><br/>
        <br/>
        1. <strong>Always use {...props}</strong> to forward all props<br/>
        2. You can add new props after spreading<br/>
        3. New props can override original props if needed<br/>
        4. Use destructuring to extract specific props<br/>
        <br/>
        <strong>Pattern:</strong><br/>
        <code>{'<Component {...props} newProp={value} />'}</code>
      </div>
      
      <div style={styles.codeBox}>
        <h4>Props Forwarding Examples:</h4>
        <pre style={styles.code}>{`// ✅ CORRECT: Forward all props
function withSomething(Component) {
  return function(props) {
    return <Component {...props} />;
  };
}

// ✅ CORRECT: Forward props + add new ones
function withUserInfo(Component) {
  return function(props) {
    const userInfo = getUserInfo();
    return <Component {...props} userInfo={userInfo} />;
  };
}

// ✅ CORRECT: Extract specific props, forward rest
function withLogger(Component) {
  return function({ logLevel, ...rest }) {
    console.log('Log level:', logLevel);
    return <Component {...rest} />;
  };
}`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 7️⃣ PROJECT: AUTHENTICATION SYSTEM
// ============================================

// Mock authentication service
const authService = {
  currentUser: null,
  
  login: (username, password) => {
    // Simulate login (accept any credentials for demo)
    authService.currentUser = {
      id: 1,
      username: username,
      name: 'Inder Singh',
      role: 'admin',
      email: `${username}@netsquare.com`
    };
    return Promise.resolve(authService.currentUser);
  },
  
  logout: () => {
    authService.currentUser = null;
  },
  
  isAuthenticated: () => {
    return authService.currentUser !== null;
  },
  
  getUser: () => {
    return authService.currentUser;
  }
};

// withAuth HOC - Protects routes/components
function withAuth(Component) {
  return function WithAuth(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [user, setUser] = useState(authService.getUser());
    
    useEffect(() => {
      // Check auth status on mount
      setIsAuthenticated(authService.isAuthenticated());
      setUser(authService.getUser());
    }, []);
    
    if (!isAuthenticated) {
      return (
        <div style={styles.authRequired}>
          <h3>🔒 Authentication Required</h3>
          <p>You must be logged in to view this content.</p>
          <p>Please log in from the main page.</p>
        </div>
      );
    }
    
    // User is authenticated, show component with user info
    return <Component {...props} user={user} />;
  };
}

// withRole HOC - Role-based access control
function withRole(Component, allowedRoles) {
  return function WithRole(props) {
    const user = authService.getUser();
    
    if (!user) {
      return (
        <div style={styles.authRequired}>
          <h3>🔒 Authentication Required</h3>
        </div>
      );
    }
    
    if (!allowedRoles.includes(user.role)) {
      return (
        <div style={styles.authRequired}>
          <h3>⛔ Access Denied</h3>
          <p>You don't have permission to view this content.</p>
          <p>Required role: {allowedRoles.join(' or ')}</p>
          <p>Your role: {user.role}</p>
        </div>
      );
    }
    
    return <Component {...props} user={user} />;
  };
}

// Protected components
function UserDashboard({ user }) {
  return (
    <div style={styles.protectedContent}>
      <h3>👤 User Dashboard</h3>
      <p>Welcome back, <strong>{user.name}</strong>!</p>
      <div style={styles.userStats}>
        <div style={styles.stat}>
          <div style={styles.statValue}>24</div>
          <div style={styles.statLabel}>Tasks</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statValue}>12</div>
          <div style={styles.statLabel}>Projects</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statValue}>8</div>
          <div style={styles.statLabel}>Messages</div>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ user }) {
  return (
    <div style={styles.protectedContent}>
      <h3>⚙️ Admin Panel</h3>
      <p>Admin: <strong>{user.name}</strong></p>
      <div style={styles.adminActions}>
        <button style={styles.adminButton}>Manage Users</button>
        <button style={styles.adminButton}>System Settings</button>
        <button style={styles.adminButton}>View Logs</button>
        <button style={styles.adminButton}>Reports</button>
      </div>
    </div>
  );
}

function Settings({ user }) {
  return (
    <div style={styles.protectedContent}>
      <h3>⚙️ Settings</h3>
      <p>Account: <strong>{user.email}</strong></p>
      <div style={styles.settingsList}>
        <label style={styles.settingItem}>
          <input type="checkbox" /> Email notifications
        </label>
        <label style={styles.settingItem}>
          <input type="checkbox" defaultChecked /> Dark mode
        </label>
        <label style={styles.settingItem}>
          <input type="checkbox" defaultChecked /> Auto-save
        </label>
      </div>
    </div>
  );
}

// Apply HOCs
const ProtectedDashboard = withAuth(UserDashboard);
const ProtectedSettings = withAuth(Settings);
const AdminOnly = withRole(AdminPanel, ['admin']);

function Project_AuthenticationWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleLogin = (e) => {
    e.preventDefault();
    authService.login(username, password).then(() => {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    });
  };
  
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };
  
  return (
    <div style={styles.example}>
      <h3>🎯 PROJECT: Authentication System</h3>
      
      <div style={styles.projectInfo}>
        <strong>Features:</strong> withAuth HOC + withRole HOC + Protected Routes
      </div>
      
      {!isLoggedIn ? (
        <div style={styles.loginContainer}>
          <h4>🔐 Login</h4>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <input
              type="text"
              placeholder="Username (any)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password (any)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
          <p style={styles.hint}>💡 Enter any username and password to login</p>
        </div>
      ) : (
        <div>
          <div style={styles.navBar}>
            <div style={styles.navTabs}>
              <button
                onClick={() => setActiveTab('dashboard')}
                style={{
                  ...styles.navTab,
                  ...(activeTab === 'dashboard' ? styles.navTabActive : {})
                }}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                style={{
                  ...styles.navTab,
                  ...(activeTab === 'admin' ? styles.navTabActive : {})
                }}
              >
                Admin Panel
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                style={{
                  ...styles.navTab,
                  ...(activeTab === 'settings' ? styles.navTabActive : {})
                }}
              >
                Settings
              </button>
            </div>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
          
          <div style={styles.contentArea}>
            {activeTab === 'dashboard' && <ProtectedDashboard />}
            {activeTab === 'admin' && <AdminOnly />}
            {activeTab === 'settings' && <ProtectedSettings />}
          </div>
        </div>
      )}
      
      <div style={styles.explanation}>
        💡 <strong>How Authentication HOCs Work:</strong><br/>
        <br/>
        <strong>withAuth HOC:</strong><br/>
        • Checks if user is logged in<br/>
        • Shows login prompt if not authenticated<br/>
        • Passes user data to protected component<br/>
        <br/>
        <strong>withRole HOC:</strong><br/>
        • Checks user's role<br/>
        • Only allows specific roles to access<br/>
        • Shows "Access Denied" for unauthorized users<br/>
        <br/>
        <strong>Try it:</strong><br/>
        1. Login with any credentials<br/>
        2. Access Dashboard and Settings (allowed for all)<br/>
        3. Try Admin Panel (requires admin role)
      </div>
      
      <div style={styles.codeBox}>
        <h4>withAuth HOC Implementation:</h4>
        <pre style={styles.code}>{`function withAuth(Component) {
  return function WithAuth(props) {
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated) {
      return <div>Please log in</div>;
    }
    
    const user = getUser();
    return <Component {...props} user={user} />;
  };
}

// Usage:
const ProtectedDashboard = withAuth(Dashboard);
<ProtectedDashboard />  {/* ← Auto-checks auth */}

// With Role:
const AdminPanel = withRole(Panel, ['admin']);
<AdminPanel />  {/* ← Checks auth + role */}`}</pre>
      </div>
    </div>
  );
}


// ============================================
// MAIN APP - All Examples Together
// ============================================

function HigherOrderComponentsTutorial() {
  const [activeExample, setActiveExample] = useState('intro');
  
  const examples = [
    { id: 'intro', label: 'Introduction', component: IntroSection },
    { id: 'ex1', label: '1. Basic HOC', component: Example1_BasicHOC },
    { id: 'ex2', label: '2. withLoading', component: Example2_WithLoading },
    { id: 'ex3', label: '3. withLogger', component: Example3_WithLogger },
    { id: 'ex4', label: '4. withToggle', component: Example4_WithToggle },
    // { id: 'ex5', label: '5. Props Forwarding', component: Example5_PropsForwarding },
    { id: 'project', label: '🎯 Auth System', component: Project_AuthenticationWrapper },
  ];
  
  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component;
  
  return (
    <div style={styles.app}>
      <h1 style={styles.mainTitle}>Higher Order Components (HOC) - Complete Tutorial</h1>
      
      <div style={styles.navigation}>
        {examples.map(example => (
          <button
            key={example.id}
            onClick={() => setActiveExample(example.id)}
            style={{
              ...styles.navButton,
              backgroundColor: activeExample === example.id ? '#3b82f6' : '#e5e7eb',
              color: activeExample === example.id ? 'white' : '#1f2937',
            }}
          >
            {example.label}
          </button>
        ))}
      </div>
      
      <div style={styles.content}>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}

// Introduction Section
function IntroSection() {
  return (
    <div style={styles.intro}>
      <h2>Higher Order Components (HOC) 🎁</h2>
      
      <div style={styles.section}>
        <h3>What is an HOC?</h3>
        <p>
          A Higher Order Component is a <strong>function</strong> that takes a component 
          and returns a new, enhanced component.
        </p>
        <div style={styles.formula}>
          <strong>Formula:</strong> HOC = (Component) → EnhancedComponent
        </div>
      </div>
      
      <div style={styles.section}>
        <h3>Real-World Analogy:</h3>
        <div style={styles.analogyBox}>
          <p>🎁 <strong>Think of HOCs like gift wrapping:</strong></p>
          <ul>
            <li>You have a gift (component)</li>
            <li>You wrap it with paper (HOC)</li>
            <li>The gift is still there, just enhanced with wrapping</li>
            <li>You can wrap multiple gifts with the same paper (reusability)</li>
          </ul>
        </div>
      </div>
      
      <div style={styles.section}>
        <h3>Common Use Cases:</h3>
        <div style={styles.useCaseGrid}>
          <div style={styles.useCase}>
            <h4>🔐 Authentication</h4>
            <p>Protect routes and components</p>
          </div>
          <div style={styles.useCase}>
            <h4>⏳ Loading States</h4>
            <p>Show loaders while fetching</p>
          </div>
          <div style={styles.useCase}>
            <h4>📊 Analytics</h4>
            <p>Track component usage</p>
          </div>
          <div style={styles.useCase}>
            <h4>🎨 Theming</h4>
            <p>Add theme props</p>
          </div>
        </div>
      </div>
      
      <div style={styles.section}>
        <h3>Naming Convention:</h3>
        <p>HOCs should start with <code>with</code>:</p>
        <ul style={styles.list}>
          <li>✅ withAuth, withLoading, withLogger</li>
          <li>❌ auth, loading, logger</li>
        </ul>
      </div>
      
      <div style={styles.warningBox}>
        <h4>⚠️ Important Note:</h4>
        <p>
          HOCs are an <strong>older pattern</strong>. Modern React prefers 
          <strong> Custom Hooks</strong> for most cases. However, HOCs are 
          still widely used in existing codebases and libraries (like Redux's connect).
        </p>
      </div>
      
      <div style={styles.callout}>
        <h3>🎯 What You'll Learn</h3>
        <ul>
          <li>✅ Create basic HOCs</li>
          <li>✅ Add loading states (withLoading)</li>
          <li>✅ Add logging (withLogger)</li>
          <li>✅ Add toggle functionality (withToggle)</li>
          <li>✅ Forward props correctly</li>
          <li>✅ Build authentication system (withAuth)</li>
        </ul>
      </div>
    </div>
  );
}

// Styles
const styles = {
  app: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    color: "black"
  },
  mainTitle: {
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '30px',
  },
  navigation: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  intro: {
    lineHeight: '1.8',
  },
  section: {
    marginBottom: '30px',
  },
  formula: {
    backgroundColor: '#dbeafe',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '18px',
    margin: '15px 0',
  },
  analogyBox: {
    backgroundColor: '#fef3c7',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #f59e0b',
  },
  useCaseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  },
  useCase: {
    backgroundColor: '#f0f9ff',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  list: {
    lineHeight: '2',
  },
  warningBox: {
    backgroundColor: '#fee2e2',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #ef4444',
  },
  callout: {
    backgroundColor: '#d1fae5',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #10b981',
  },
  example: {
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  borderedBox: {
    border: '3px solid #3b82f6',
    borderRadius: '8px',
    padding: '15px',
  },
  hocTitle: {
    color: '#3b82f6',
    marginTop: 0,
  },
  userCard: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  avatar: {
    fontSize: '48px',
    marginBottom: '10px',
  },
  statsCard: {
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statsValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statsLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '5px',
  },
  explanation: {
    backgroundColor: '#fef3c7',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    lineHeight: '1.8',
  },
  codeBox: {
    marginTop: '20px',
  },
  code: {
    backgroundColor: '#1f2937',
    color: '#10b981',
    padding: '15px',
    borderRadius: '8px',
    overflow: 'auto',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '40px',
  },
  spinner: {
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  userList: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #e5e7eb',
  },
  badge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  consoleWarning: {
    backgroundColor: '#fee2e2',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    textAlign: 'center',
  },
  counterBox: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'center',
    marginTop: '20px',
  },
  bigNumber: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  toggleButton: {
    padding: '8px 16px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  contentBox: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '10px',
  },
  dashboard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
  },
  userInfoBox: {
    backgroundColor: '#f0f9ff',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '15px',
  },
  projectInfo: {
    backgroundColor: '#d1fae5',
    padding: '10px 15px',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  loginContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '2px solid #e5e7eb',
  },
  hint: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
    marginTop: '15px',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  navTabs: {
    display: 'flex',
    gap: '10px',
  },
  navTab: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  navTabActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  contentArea: {
    minHeight: '300px',
  },
  authRequired: {
    backgroundColor: '#fee2e2',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '2px solid #fecaca',
  },
  protectedContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  userStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginTop: '20px',
  },
  stat: {
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '5px',
  },
  adminActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginTop: '20px',
  },
  adminButton: {
    padding: '15px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  settingsList: {
    marginTop: '20px',
  },
  settingItem: {
    display: 'block',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#f9fafb',
    marginBottom: '10px',
    borderRadius: '6px',
  },
};

export default HigherOrderComponentsTutorial;
