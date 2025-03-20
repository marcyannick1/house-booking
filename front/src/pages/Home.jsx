import React from 'react';
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {HomeSidebar} from "@/components/SideBar.jsx"
import PropertyCard from "@/components/home/PropertyCard.jsx";

function Home(props) {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
            }}
        >
            <HomeSidebar/>
            <SidebarTrigger/>
            <main className={"p-5"}>
                <h2 className={"font-semibold"}>100 annonces</h2>
                <PropertyCard/>
            </main>
        </SidebarProvider>
    );
}

export default Home;
