import React, {useEffect, useState} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {HomeSidebar} from "@/components/SideBar.jsx";
import PropertyCard from "@/components/home/PropertyCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProperties} from "@/redux/actions/propertyActions.js";

function Home() {
    const dispatch = useDispatch();
    const {properties, loading, error} = useSelector(state => state.property);

    const [filters, setFilters] = useState({
        propertyType: "",
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathrooms: "",
        guests: "",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        dispatch(fetchProperties(filters));
    }, [dispatch, filters]);

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    // if (loading) return <p>Chargement...</p>;
    // if (error) return <p>Erreur: {error}</p>;

    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
            }}
        >
            <HomeSidebar setFilters={setFilters}/>
            <SidebarTrigger/>

            <main className="p-5 flex flex-col ">
                <h2 className="font-semibold">{properties?.properties?.length || 0} annonces</h2>

                {/* 🔹 Ajout de `max-w-4/5` pour max-width 80% et `mx-auto` pour centrer */}
                <div className="flex flex-wrap gap-6 justify-center mx-auto">
                    {properties?.properties?.length > 0 ? (
                        properties.properties.map(property => (
                            <PropertyCard key={property._id} property={property}/>
                        ))
                    ) : (
                        <p>Aucune annonce disponible.</p>
                    )}
                </div>
            </main>
        </SidebarProvider>
    );
}

export default Home;