import { useState } from "react";
import { UsersRound, Star, Heart } from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

export default function PropertyCard() {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="w-80 max-w-md mx-auto">
            <div className="bg-white overflow-hidden relative">
                <div className="relative">
                    <img
                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/328403315.jpg?k=c640e1e41d4255ad88773de52be8397280aa7c1fafab5c63bab7181fdf07a754&o=&hp=1"
                        alt="Product Image"
                        className="w-full h-64 object-cover rounded-lg"
                    />

                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="absolute top-3 right-3 rounded-full"
                    >
                        <Heart size={20} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} />
                    </Button>
                </div>

                <div>
                    <h3 className="text-md font-semibold">Product Title</h3>
                    <p className="text-gray-500 text-sm">Adresse, 77370</p>
                    <span className="text-md font-bold">49.99€ <span className="text-sm">par nuit</span></span>

                    <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                        <UsersRound size={18} className="text-gray-500" />
                        <span>4 personnes</span>
                        <Star size={18} className="text-yellow-500" />
                        <span>4,8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}