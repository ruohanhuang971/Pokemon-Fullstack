import { Outlet } from 'react-router';
import './App.css';

function App() {
    return (
        <>
            <main className="min-w-screen min-h-screen bg-red font-primary">
                <Outlet /> {/* Outlet render all children of App*/}
            </main>
        </>
    );
}

export default App;
