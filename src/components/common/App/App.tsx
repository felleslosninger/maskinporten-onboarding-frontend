import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Auth from '../../auth/Auth';
import Callback from '../../auth/Callback';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import './App.css';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<Link to={"/logginn"}>Logg inn</Link>} />
                    <Route path={"/logginn"} element={<Auth />} />
                    <Route path={"/authenticated"} element={<Callback />} />
                </Routes>
            </div>
        </QueryClientProvider>
  );
}

export default App;
