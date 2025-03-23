import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {FaBed, FaBath, FaUsers, FaMapMarkerAlt} from "react-icons/fa";
import apiClient from "@/api/apiClient.js";
import {Card, CardContent} from "@/components/ui/card.jsx";

function Property() {
    const {id} = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await apiClient.get(`/properties/${id}`);
                setProperty(response.data);
            } catch (err) {
                setError("Erreur lors du chargement de l'annonce");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <p className="text-center text-lg">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-5">
            {/* 🔹 Carousel des images */}
            <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                    {property.images.map((img, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1 flex justify-center">
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="w-[600px] h-[400px] object-cover rounded-lg"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

            {/* 🔹 Informations principales */}
            <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
            <p className="text-gray-600 text-lg">{property.description}</p>

            {/* 🔹 Informations sur la propriété */}
            <div className="mt-4 flex flex-wrap gap-4">
                <p className="flex items-center gap-2 text-gray-700">
                    <FaMapMarkerAlt className="text-red-500"/>
                    {property.address.street}, {property.address.city}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                    <FaBed className="text-blue-500"/>
                    {property.bedrooms} Chambres
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                    <FaBath className="text-green-500"/>
                    {property.bathrooms} Salles de bain
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                    <FaUsers className="text-purple-500"/>
                    {property.guests} Personnes max
                </p>
            </div>

            {/* 🔹 Prix */}
            <p className="mt-4 text-xl font-semibold text-black">
                {property.pricePerNight}€ / nuit
            </p>

            {/* 🔹 Disponibilité */}
            <h2 className="mt-6 text-xl font-semibold">Disponibilité :</h2>
            <ul className="list-disc ml-5 text-gray-700">
                <li>
                    {new Date(property.availability.startDate).toLocaleDateString()} -{" "}
                    {new Date(property.availability.endDate).toLocaleDateString()}
                </li>
            </ul>

            {/* 🔹 Bouton Réserver */}
            <button className="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg font-semibold">
                Réserver cette annonce
            </button>
        </div>
    );
}

export default Property;