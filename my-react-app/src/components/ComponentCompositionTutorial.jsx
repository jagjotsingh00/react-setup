
import { useState, createContext, useContext } from 'react';

/* ============================================
   📚 TABLE OF CONTENTS:
   
   1. What is Component Composition?
   2. Pattern 1: Children Prop
   3. Pattern 2: Compound Components
   4. Pattern 3: Render Props
   5. PROJECT 1: Reusable Modal
   6. PROJECT 2: Tabs Component
   7. PROJECT 3: Accordion Component
   
   ============================================ */


// ============================================
// 1️⃣ WHAT IS COMPONENT COMPOSITION?
// ============================================

/* 
Component Composition is the practice of building components by combining 
smaller, reusable components together - like building with LEGO blocks.

WHY USE COMPOSITION?
✅ Reusability - Build once, use everywhere
✅ Flexibility - Components adapt to different needs
✅ Clean Code - Separate concerns, easier to maintain
✅ Avoid Props Drilling - Better data flow

THREE MAIN PATTERNS:
1. Children Prop - Pass content as children
2. Compound Components - Components that work together
3. Render Props - Pass functions as props to control rendering
*/


// ============================================
// 2️⃣ PATTERN 1: CHILDREN PROP
// ============================================

/* 
The 'children' prop is a special prop that contains whatever you put 
BETWEEN the opening and closing tags of a component.

SYNTAX:
  <MyComponent>
    This content becomes the 'children' prop
  </MyComponent>
*/

// Basic Card component using children
function Card({ children, title, color = '#3b82f6' }) {
  return (
    <div style={{
      ...styles.card,
      borderTop: `4px solid ${color}`
    }}>
      {title && <h3 style={styles.cardTitle}>{title}</h3>}
      <div style={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}

// Button component using children
function Button({ children, onClick, variant = 'primary' }) {
  const buttonStyles = {
    primary: { backgroundColor: '#3b82f6', color: 'white' },
    secondary: { backgroundColor: '#6b7280', color: 'white' },
    danger: { backgroundColor: '#ef4444', color: 'white' },
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.button,
        ...buttonStyles[variant]
      }}
    >
      {children}
    </button>
  );
}

// Container component using children
function Container({ children, maxWidth = '800px' }) {
  return (
    <div style={{ ...styles.container, maxWidth }}>
      {children}
    </div>
  );
}

function Example1_ChildrenProp() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={styles.example}>
      <h3>Pattern 1: Children Prop</h3>
      
      <Container maxWidth="600px">
        <Card title="Counter Example" color="#10b981">
          <p>The content inside this card is passed as 'children' prop!</p>
          <div style={styles.counterDisplay}>
            <div style={styles.bigNumber}>{count}</div>
          </div>
          <div style={styles.buttonGroup}>
            <Button onClick={() => setCount(count + 1)}>
              Increment
            </Button>
            <Button onClick={() => setCount(count - 1)} variant="secondary">
              Decrement
            </Button>
            <Button onClick={() => setCount(0)} variant="danger">
              Reset
            </Button>
          </div>
        </Card>
        
        <Card title="User Profile" color="#8b5cf6">
          <div style={styles.profile}>
            <div style={styles.avatar}>👤</div>
            <h4>Inder Singh</h4>
            <p>Senior Full Stack Developer</p>
            <p>NetSquare Softwares</p>
          </div>
        </Card>
      </Container>
      
      <div style={styles.explanation}>
        💡 <strong>How Children Prop Works:</strong><br/>
        <br/>
        When you write: <code>&lt;Card&gt;Content here&lt;/Card&gt;</code><br/>
        The "Content here" becomes the <code>children</code> prop<br/>
        <br/>
        <strong>Benefits:</strong><br/>
        ✅ Extremely flexible - any content can go inside<br/>
        ✅ Clean, readable JSX<br/>
        ✅ Reusable wrapper components<br/>
        ✅ Natural composition
      </div>
      
      <div style={styles.codeBox}>
        <h4>The Code:</h4>
        <pre style={styles.code}>{`function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}  {/* ← Whatever you put between <Card></Card> */}
    </div>
  );
}

// Usage:
<Card title="My Card">
  <p>This becomes children!</p>
  <button>And this too!</button>
</Card>`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 3️⃣ PATTERN 2: COMPOUND COMPONENTS
// ============================================

/* 
Compound Components are a set of components that work together to form 
a complete UI component. They share implicit state.

Think of it like HTML: <select> and <option> work together
We create similar relationships with React components.

Example: <Tabs> works with <Tab> and <TabPanel>
*/

// Create context for Tabs to share state
const TabsContext = createContext();

// Main Tabs component (parent)
function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={styles.tabs}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// TabList component (holds the tab buttons)
function TabList({ children }) {
  return (
    <div style={styles.tabList}>
      {children}
    </div>
  );
}

// Individual Tab component
function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === index;
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      style={{
        ...styles.tab,
        ...(isActive ? styles.tabActive : {})
      }}
    >
      {children}
    </button>
  );
}

// TabPanels component (holds the content panels)
function TabPanels({ children }) {
  return (
    <div style={styles.tabPanels}>
      {children}
    </div>
  );
}

// Individual TabPanel component
function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== index) return null;
  
  return (
    <div style={styles.tabPanel}>
      {children}
    </div>
  );
}

function Example2_CompoundComponents() {
  return (
    <div style={styles.example}>
      <h3>Pattern 2: Compound Components</h3>
      
      <Tabs defaultTab={0}>
        <TabList>
          <Tab index={0}>🏠 Home</Tab>
          <Tab index={1}>👤 Profile</Tab>
          <Tab index={2}>⚙️ Settings</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel index={0}>
            <h4>Welcome Home!</h4>
            <p>This is the home tab content. Notice how clean the usage is!</p>
            <p>The Tab and TabPanel components work together automatically.</p>
          </TabPanel>
          
          <TabPanel index={1}>
            <h4>User Profile</h4>
            <div style={styles.profile}>
              <div style={styles.avatar}>👤</div>
              <p><strong>Name:</strong> Inder Singh</p>
              <p><strong>Role:</strong> Senior Developer</p>
              <p><strong>Company:</strong> NetSquare Softwares</p>
            </div>
          </TabPanel>
          
          <TabPanel index={2}>
            <h4>Settings</h4>
            <p>Configure your application settings here.</p>
            <label style={styles.settingItem}>
              <input type="checkbox" /> Enable notifications
            </label>
            <label style={styles.settingItem}>
              <input type="checkbox" /> Dark mode
            </label>
            <label style={styles.settingItem}>
              <input type="checkbox" /> Auto-save
            </label>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      <div style={styles.explanation}>
        💡 <strong>How Compound Components Work:</strong><br/>
        <br/>
        1. Parent component (Tabs) creates a Context<br/>
        2. Child components (Tab, TabPanel) use that Context<br/>
        3. They share state automatically - no prop drilling!<br/>
        <br/>
        <strong>Benefits:</strong><br/>
        ✅ Clean, intuitive API<br/>
        ✅ Flexible - arrange components however you want<br/>
        ✅ Shared implicit state<br/>
        ✅ Great for component libraries
      </div>
      
      <div style={styles.codeBox}>
        <h4>The Pattern:</h4>
        <pre style={styles.code}>{`// 1. Create Context
const TabsContext = createContext();

// 2. Parent provides state
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

// 3. Children consume state
function Tab({ index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  // Use the shared state!
}

// 4. Clean usage
<Tabs>
  <Tab index={0}>Home</Tab>
  <Tab index={1}>Profile</Tab>
</Tabs>`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 4️⃣ PATTERN 3: RENDER PROPS
// ============================================

/* 
Render Props is a pattern where you pass a FUNCTION as a prop, 
and that function returns JSX (what to render).

It's a way to share code between components using a prop whose value is a function.
*/

// DataFetcher component using render props
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useState(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);
  
  // Call the render function with state
  return render({ data, loading, error });
}

// MouseTracker component using render props
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  return (
    <div
      onMouseMove={handleMouseMove}
      style={styles.mouseArea}
    >
      {render(position)}
    </div>
  );
}

// Toggle component using render props
function Toggle({ render }) {
  const [on, setOn] = useState(false);
  
  const toggle = () => setOn(!on);
  const setTrue = () => setOn(true);
  const setFalse = () => setOn(false);
  
  return render({ on, toggle, setTrue, setFalse });
}

function Example3_RenderProps() {
  return (
    <div style={styles.example}>
      <h3>Pattern 3: Render Props</h3>
      
      <Card title="Mouse Tracker Example" color="#f59e0b">
        <MouseTracker
          render={({ x, y }) => (
            <div>
              <p>Move your mouse in this area!</p>
              <div style={styles.mouseInfo}>
                <div>X: <strong>{x}</strong></div>
                <div>Y: <strong>{y}</strong></div>
              </div>
              <div 
                style={{
                  ...styles.cursor,
                  left: x - 250,
                  top: y - 200
                }}
              >
                🎯
              </div>
            </div>
          )}
        />
      </Card>
      
      <Card title="Toggle Example" color="#8b5cf6">
        <Toggle
          render={({ on, toggle, setTrue, setFalse }) => (
            <div>
              <div style={styles.toggleDisplay}>
                Status: <strong>{on ? '✅ ON' : '❌ OFF'}</strong>
              </div>
              <div style={styles.buttonGroup}>
                <Button onClick={toggle}>Toggle</Button>
                <Button onClick={setTrue} variant="secondary">Turn On</Button>
                <Button onClick={setFalse} variant="danger">Turn Off</Button>
              </div>
            </div>
          )}
        />
      </Card>
      
      <div style={styles.explanation}>
        💡 <strong>How Render Props Work:</strong><br/>
        <br/>
        1. Component accepts a <code>render</code> prop (a function)<br/>
        2. Component manages state/logic internally<br/>
        3. Component calls <code>render(data)</code> to get JSX<br/>
        4. Parent controls what to render with that data<br/>
        <br/>
        <strong>Benefits:</strong><br/>
        ✅ Share logic without sharing UI<br/>
        ✅ Maximum flexibility - parent controls rendering<br/>
        ✅ Reusable behavior<br/>
        ✅ Great for logic-heavy components
      </div>
      
      <div style={styles.codeBox}>
        <h4>The Pattern:</h4>
        <pre style={styles.code}>{`// Component with logic
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}  {/* ← Call the function */}
    </div>
  );
}

// Usage - YOU control what to render
<MouseTracker
  render={({ x, y }) => (
    <p>Mouse at: {x}, {y}</p>
  )}
/>`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 5️⃣ PROJECT 1: REUSABLE MODAL
// ============================================

// Modal component combining all patterns
const ModalContext = createContext();

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <ModalContext.Provider value={{ onClose }}>
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

function ModalHeader({ children }) {
  const { onClose } = useContext(ModalContext);
  
  return (
    <div style={styles.modalHeader}>
      <h3 style={styles.modalTitle}>{children}</h3>
      <button onClick={onClose} style={styles.modalClose}>
        ✕
      </button>
    </div>
  );
}

function ModalBody({ children }) {
  return (
    <div style={styles.modalBody}>
      {children}
    </div>
  );
}

function ModalFooter({ children }) {
  return (
    <div style={styles.modalFooter}>
      {children}
    </div>
  );
}

function Project1_ReusableModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  return (
    <div style={styles.example}>
      <h3>🎯 PROJECT 1: Reusable Modal Component</h3>
      
      <div style={styles.projectInfo}>
        <strong>Uses:</strong> Children prop + Compound components pattern
      </div>
      
      <div style={styles.buttonGroup}>
        <Button onClick={() => setIsOpen(true)}>
          Open Simple Modal
        </Button>
        <Button onClick={() => setConfirmOpen(true)} variant="danger">
          Open Confirm Modal
        </Button>
      </div>
      
      {/* Simple Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Welcome! 👋</ModalHeader>
        <ModalBody>
          <p>This is a reusable modal component built with compound components!</p>
          <p>Notice how clean and flexible the API is:</p>
          <ul>
            <li>Modal - Main container</li>
            <li>ModalHeader - Title with close button</li>
            <li>ModalBody - Main content</li>
            <li>ModalFooter - Action buttons</li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      
      {/* Confirmation Modal */}
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this item?</p>
          <p style={{ color: '#ef4444' }}>This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setConfirmOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => setConfirmOpen(false)} variant="danger">
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      
      <div style={styles.explanation}>
        💡 <strong>Modal Features:</strong><br/>
        ✅ Click outside to close<br/>
        ✅ Compound components (Header, Body, Footer)<br/>
        ✅ Shared context (onClose function)<br/>
        ✅ Flexible layout<br/>
        ✅ Reusable across entire app
      </div>
      
      <div style={styles.codeBox}>
        <h4>Usage:</h4>
        <pre style={styles.code}>{`<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>My Modal Title</ModalHeader>
  <ModalBody>
    <p>Any content here!</p>
  </ModalBody>
  <ModalFooter>
    <Button onClick={handleSave}>Save</Button>
    <Button onClick={handleClose}>Cancel</Button>
  </ModalFooter>
</Modal>`}</pre>
      </div>
    </div>
  );
}


// ============================================
// 6️⃣ PROJECT 2: TABS COMPONENT (Enhanced)
// ============================================

function Project2_TabsComponent() {
  return (
    <div style={styles.example}>
      <h3>🎯 PROJECT 2: Tabs Component</h3>
      
      <div style={styles.projectInfo}>
        <strong>Uses:</strong> Compound components + Context API
      </div>
      
      <Tabs defaultTab={0}>
        <TabList>
          <Tab index={0}>📝 Posts</Tab>
          <Tab index={1}>💬 Comments</Tab>
          <Tab index={2}>👥 Users</Tab>
          <Tab index={3}>📸 Photos</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel index={0}>
            <h4>Blog Posts</h4>
            <div style={styles.postList}>
              <div style={styles.postItem}>
                <h5>Getting Started with React</h5>
                <p>Learn the basics of React in this comprehensive guide...</p>
                <span style={styles.badge}>React</span>
              </div>
              <div style={styles.postItem}>
                <h5>Advanced Hooks Patterns</h5>
                <p>Deep dive into custom hooks and advanced patterns...</p>
                <span style={styles.badge}>Hooks</span>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel index={1}>
            <h4>Recent Comments</h4>
            <div style={styles.commentList}>
              <div style={styles.comment}>
                <div style={styles.avatar}>👤</div>
                <div>
                  <strong>John Doe</strong>
                  <p>Great article! Very helpful.</p>
                </div>
              </div>
              <div style={styles.comment}>
                <div style={styles.avatar}>👤</div>
                <div>
                  <strong>Jane Smith</strong>
                  <p>Thanks for sharing this!</p>
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel index={2}>
            <h4>User Directory</h4>
            <div style={styles.userGrid}>
              {['Alice', 'Bob', 'Charlie', 'Diana'].map(name => (
                <div key={name} style={styles.userCard}>
                  <div style={styles.avatar}>👤</div>
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </TabPanel>
          
          <TabPanel index={3}>
            <h4>Photo Gallery</h4>
            <div style={styles.photoGrid}>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div key={num} style={styles.photoPlaceholder}>
                  📷 {num}
                </div>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      <div style={styles.explanation}>
        💡 <strong>Tabs Features:</strong><br/>
        ✅ Multiple tabs with different content<br/>
        ✅ Active state management<br/>
        ✅ Compound components pattern<br/>
        ✅ Shared context between Tab and TabPanel<br/>
        ✅ Easy to add new tabs
      </div>
    </div>
  );
}


// ============================================
// 7️⃣ PROJECT 3: ACCORDION COMPONENT
// ============================================

const AccordionContext = createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);
  
  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div style={styles.accordion}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ children, index, title }) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.includes(index);
  
  return (
    <div style={styles.accordionItem}>
      <button
        onClick={() => toggleItem(index)}
        style={styles.accordionHeader}
      >
        <span>{title}</span>
        <span style={{
          ...styles.accordionIcon,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div style={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
}

function Project3_AccordionComponent() {
  return (
    <div style={styles.example}>
      <h3>🎯 PROJECT 3: Accordion Component</h3>
      
      <div style={styles.projectInfo}>
        <strong>Uses:</strong> Compound components + Toggle logic
      </div>
      
      <h4>Single Open (Default):</h4>
      <Accordion>
        <AccordionItem index={0} title="❓ What is React?">
          <p>React is a JavaScript library for building user interfaces, 
          particularly single-page applications where you need a fast, 
          interactive user experience.</p>
        </AccordionItem>
        
        <AccordionItem index={1} title="❓ What are Components?">
          <p>Components are independent, reusable pieces of code. 
          They serve the same purpose as JavaScript functions, but work 
          in isolation and return HTML.</p>
        </AccordionItem>
        
        <AccordionItem index={2} title="❓ What is JSX?">
          <p>JSX stands for JavaScript XML. It allows you to write HTML 
          elements in JavaScript and place them in the DOM without using 
          createElement() or appendChild().</p>
        </AccordionItem>
        
        <AccordionItem index={3} title="❓ What are Hooks?">
          <p>Hooks are functions that let you "hook into" React state and 
          lifecycle features from function components. useState and useEffect 
          are the most commonly used hooks.</p>
        </AccordionItem>
      </Accordion>
      
      <h4 style={{ marginTop: '30px' }}>Multiple Open Allowed:</h4>
      <Accordion allowMultiple={true}>
        <AccordionItem index={0} title="🚀 Getting Started">
          <p>To get started with React, you'll need Node.js installed on 
          your machine. Then you can use create-react-app to bootstrap 
          a new project.</p>
          <code style={styles.inlineCode}>npx create-react-app my-app</code>
        </AccordionItem>
        
        <AccordionItem index={1} title="📦 Installation">
          <p>React can be installed via npm or yarn:</p>
          <code style={styles.inlineCode}>npm install react react-dom</code>
        </AccordionItem>
        
        <AccordionItem index={2} title="📚 Documentation">
          <p>The official React documentation is the best place to learn. 
          Visit react.dev for comprehensive guides and API references.</p>
        </AccordionItem>
      </Accordion>
      
      <div style={styles.explanation}>
        💡 <strong>Accordion Features:</strong><br/>
        ✅ Single or multiple items can be open<br/>
        ✅ Smooth open/close animation (CSS)<br/>
        ✅ Compound components pattern<br/>
        ✅ Shared context for state<br/>
        ✅ Flexible and reusable
      </div>
      
      <div style={styles.codeBox}>
        <h4>Usage:</h4>
        <pre style={styles.code}>{`<Accordion allowMultiple={false}>
  <AccordionItem index={0} title="Question 1">
    <p>Answer 1</p>
  </AccordionItem>
  
  <AccordionItem index={1} title="Question 2">
    <p>Answer 2</p>
  </AccordionItem>
</Accordion>`}</pre>
      </div>
    </div>
  );
}


// ============================================
// MAIN APP - All Examples Together
// ============================================

function ComponentCompositionTutorial() {
  const [activeExample, setActiveExample] = useState('intro');
  
  const examples = [
    { id: 'intro', label: 'Introduction', component: IntroSection },
    { id: 'ex1', label: '1. Children Prop', component: Example1_ChildrenProp },
    { id: 'ex2', label: '2. Compound Components', component: Example2_CompoundComponents },
    { id: 'ex3', label: '3. Render Props', component: Example3_RenderProps },
    { id: 'p1', label: '🎯 Modal', component: Project1_ReusableModal },
    { id: 'p2', label: '🎯 Tabs', component: Project2_TabsComponent },
    { id: 'p3', label: '🎯 Accordion', component: Project3_AccordionComponent },
  ];
  
  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component;
  
  return (
    <div style={styles.app}>
      <h1 style={styles.mainTitle}>Component Composition - Complete Tutorial</h1>
      
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
      <h2>Component Composition 🧩</h2>
      
      <div style={styles.section}>
        <h3>What is Component Composition?</h3>
        <p>
          Component composition is the practice of combining simple components 
          to build complex UIs. Think of it like building with LEGO blocks - 
          small pieces combine to create something bigger.
        </p>
      </div>
      
      <div style={styles.section}>
        <h3>Three Main Patterns:</h3>
        
        <div style={styles.patternCard}>
          <h4>1. Children Prop 👶</h4>
          <p><strong>What:</strong> Pass content between component tags</p>
          <p><strong>When:</strong> Wrapper components, layouts, containers</p>
          <p><strong>Example:</strong> Card, Button, Container</p>
        </div>
        
        <div style={styles.patternCard}>
          <h4>2. Compound Components 🤝</h4>
          <p><strong>What:</strong> Components that work together as a group</p>
          <p><strong>When:</strong> Complex UI with multiple related parts</p>
          <p><strong>Example:</strong> Tabs, Accordion, Select/Option</p>
        </div>
        
        <div style={styles.patternCard}>
          <h4>3. Render Props 🎨</h4>
          <p><strong>What:</strong> Pass a function that returns JSX</p>
          <p><strong>When:</strong> Share logic, flexible rendering</p>
          <p><strong>Example:</strong> DataFetcher, MouseTracker, Toggle</p>
        </div>
      </div>
      
      <div style={styles.section}>
        <h3>Why Use Composition?</h3>
        <ul style={styles.benefitsList}>
          <li>✅ <strong>Reusability:</strong> Build once, use everywhere</li>
          <li>✅ <strong>Flexibility:</strong> Adapt to different needs</li>
          <li>✅ <strong>Maintainability:</strong> Easy to update and extend</li>
          <li>✅ <strong>Separation of Concerns:</strong> Each component does one thing</li>
          <li>✅ <strong>Clean Code:</strong> Readable and understandable</li>
        </ul>
      </div>
      
      <div style={styles.callout}>
        <h3>🎯 What You'll Build</h3>
        <p>By the end of this tutorial, you'll build three reusable components:</p>
        <ul>
          <li>📦 <strong>Modal:</strong> Reusable dialog component</li>
          <li>📑 <strong>Tabs:</strong> Multi-tab interface</li>
          <li>📋 <strong>Accordion:</strong> Expandable FAQ sections</li>
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
  patternCard: {
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '15px',
    borderLeft: '4px solid #3b82f6',
  },
  benefitsList: {
    lineHeight: '2',
    fontSize: '16px',
  },
  callout: {
    backgroundColor: '#dbeafe',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #3b82f6',
  },
  example: {
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    margin: '0 0 15px 0',
    color: '#1f2937',
  },
  cardContent: {
    color: '#4b5563',
  },
  container: {
    margin: '0 auto',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  counterDisplay: {
    textAlign: 'center',
    margin: '20px 0',
  },
  bigNumber: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  profile: {
    textAlign: 'center',
    padding: '20px',
  },
  avatar: {
    fontSize: '48px',
    marginBottom: '10px',
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
  tabs: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tabList: {
    display: 'flex',
    borderBottom: '2px solid #e5e7eb',
  },
  tab: {
    flex: 1,
    padding: '15px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    color: '#6b7280',
    transition: 'all 0.3s',
    borderBottom: '3px solid transparent',
  },
  tabActive: {
    color: '#3b82f6',
    borderBottomColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
  },
  tabPanels: {
    padding: '20px',
  },
  tabPanel: {
    animation: 'fadeIn 0.3s',
  },
  settingItem: {
    display: 'block',
    padding: '10px 0',
    fontSize: '16px',
  },
  mouseArea: {
    height: '200px',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    position: 'relative',
    cursor: 'crosshair',
  },
  mouseInfo: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    fontSize: '18px',
    marginTop: '10px',
  },
  cursor: {
    position: 'absolute',
    fontSize: '24px',
    pointerEvents: 'none',
  },
  toggleDisplay: {
    fontSize: '24px',
    textAlign: 'center',
    margin: '20px 0',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
  },
  modalTitle: {
    margin: 0,
    fontSize: '20px',
    color: '#1f2937',
  },
  modalClose: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '0 5px',
  },
  modalBody: {
    padding: '20px',
    lineHeight: '1.8',
  },
  modalFooter: {
    padding: '20px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  projectInfo: {
    backgroundColor: '#d1fae5',
    padding: '10px 15px',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  postItem: {
    backgroundColor: '#f9fafb',
    padding: '15px',
    borderRadius: '8px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    marginTop: '10px',
  },
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  comment: {
    display: 'flex',
    gap: '15px',
    backgroundColor: '#f9fafb',
    padding: '15px',
    borderRadius: '8px',
  },
  userGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '15px',
  },
  userCard: {
    backgroundColor: '#f9fafb',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
  },
  photoPlaceholder: {
    backgroundColor: '#e5e7eb',
    padding: '40px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '24px',
  },
  accordion: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  accordionItem: {
    borderBottom: '1px solid #e5e7eb',
  },
  accordionHeader: {
    width: '100%',
    padding: '15px 20px',
    backgroundColor: 'white',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'left',
    transition: 'background-color 0.3s',
  },
  accordionIcon: {
    transition: 'transform 0.3s',
    fontSize: '12px',
  },
  accordionContent: {
    padding: '15px 20px',
    backgroundColor: '#f9fafb',
    lineHeight: '1.8',
  },
  inlineCode: {
    backgroundColor: '#1f2937',
    color: '#10b981',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '14px',
  },
};

export default ComponentCompositionTutorial;