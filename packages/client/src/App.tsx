import { Outlet } from 'react-router';
import './App.css';

function App() {
    return (
        <>
            <main className="min-w-screen min-h-[1000px] bg-red font-primary">
                <Outlet /> {/* Outlet render all children of App*/}
            </main>
        </>
    );
}

export default App;
