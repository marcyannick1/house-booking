import {useState} from "react";
import {UsersRound, Star, Heart} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

export default function PropertyCard({property}) {
    const [isFavorite, setIsFavorite] = useState(false);
    console.log(property);
    return (
        <div className="w-72 max-w-md mx-auto">
            <div className="bg-white overflow-hidden relative">
                <div className="relative">
                    <Link to={`property/${property._id}`}>
                        <img
                            // src={"https://a0.muscache.com/im/pictures/miso/Hosting-36476586/original/9c243ce8-029d-4457-a115-2885788692f5.jpeg?im_w=720"}
                            src={property.images[0]}
                            alt="Product Image"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </Link>
                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="absolute top-3 right-3 rounded-full"
                    >
                        <Heart size={20} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}/>
                    </Button>
                </div>

                <div>
                    <h3 className="text-md font-semibold">{property.title}</h3>
                    <p className="text-gray-500 text-sm">{`${property.address.street}, ${property.address.city} ${property.address.postalCode}`}</p>
                    <span className="text-md font-bold">{property.pricePerNight}€ <span
                        className="text-sm">par nuit</span></span>

                    <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                        <UsersRound size={18} className="text-gray-500"/>
                        <span>{property.guests} personnes</span>
                        <Star size={18} className="text-yellow-500"/>
                        <span>4,8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}