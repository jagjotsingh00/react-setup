import { useState, useEffect, createContext, useContext } from "react";

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },

    card: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "#f9fafb",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },

    title: {
        marginBottom: "10px",
        color: "#333",
    },

    button: {
        padding: "8px 12px",
        margin: "5px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#3b82f6",
        color: "white",
        cursor: "pointer",
    },

    tabContainer: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
    },

    tabButton: {
        padding: "10px",
        marginRight: "5px",
        border: "none",
        backgroundColor: "#e5e7eb",
        cursor: "pointer",
        borderRadius: "5px",
    },

    activeTab: {
        backgroundColor: "#3b82f6",
        color: "white",
    },

    panel: {
        marginTop: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },

    toggleBox: {
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f3f4f6",
    }
};



function Card({ children, title }) {
    return (
        <div style={styles.card}>
            {title && <h3 style={styles.title}>{title}</h3>}
            <div>{children}</div>
        </div>
    );
}
function Button({ children, onClick }) {
    return (
        <button onClick={onClick} style={styles.button}>
            {children}
        </button>
    )
}

function Container({ children }) {
    return (<div style={styles.container} > {children}</div>)
}

function Example11_childrenprop() {
    const [count, setCount] = useState(0);

    return (
        <Container>
            <h3>Children Prop</h3>

            <Card title="Counter">
                <h2>{count}</h2>

                <Button onClick={() => setCount(count + 1)}>Addition 1</Button>
                <Button onClick={() => setCount(count - 1)}>Subtraction 1</Button>
                <Button onClick={() => setCount(0)}>Reset</Button>
            </Card>


             
            <Card title="User">
                <p>👤 Jagjot Singh</p>
                <p>Developer</p>
            </Card>
           
            <Card title="User">
                <p>👤 Harshdeep Singh</p>
                <p>Developer</p>
            </Card>
        </Container>
    )
}
export{Example11_childrenprop }

/* =========================
   2️⃣ COMPOUND COMPONENTS
========================= */
const TabContext = createContext();


function Tabs({ children, defaultTab = 0 }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            <div style={styles.tabContainer}>{children}</div>
        </TabContext.Provider>
    );
}


function Tab({ children, index }) {
    const { activeTab, setActiveTab } = useContext(TabContext);

    return (
        <button
            style={{
                ...styles.tabButton,
                ...(activeTab === index ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(index)}
        >
            {children}
        </button>
    );
}


function TabPanel({ children, index }) {
    const { activeTab } = useContext(TabContext);

    if (activeTab !== index) return null;

    return <div style={styles.panel}>{children}</div>;
}

function Example22_CompoundComponents() {
    return (
        <Container>
            <h3>Compound Components</h3>

            <Tabs defaultTab={0}>
                <div>
                    <Tab index={0}>Home</Tab>
                    <Tab index={1}>Profile</Tab>
                    <Tab index={2}>Settings</Tab>
                </div>

                <TabPanel index={0}>🏠 Home Content</TabPanel>
                <TabPanel index={1}>👤 Profile Content</TabPanel>
                <TabPanel index={2}>⚙️ Settings Content</TabPanel>
            </Tabs>
        </Container>
    );
}

export { Example22_CompoundComponents };


function Toggle({render}) {
    const [on ,setOn] = useState(false);

    return render ({
        on ,
        toggle : () => setOn(!on)
    });

}
function Example33_RenderProps() {
    return(
        <Container>
         <h3>Render Props</h3>

           <div style={styles.toggleBox}>
                <Toggle
                    render={({ on, toggle }) => (
                        <>
                            <p>Status: {on ? "ON" : "OFF"}</p>
                            <button onClick={toggle} style={styles.button}>
                                Toggle
                            </button>
                        </>
                    )}
                />
            </div>
        </Container>
    )
}
export {Example33_RenderProps}

