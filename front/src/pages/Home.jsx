import React from 'react';
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {HomeSidebar} from "@/components/SideBar.jsx"

function Home(props) {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
            }}
        >
            <HomeSidebar/>
            <main>
                <SidebarTrigger/>
                <h1>Hello</h1>
            </main>
        </SidebarProvider>
    );
}

export default Home;
