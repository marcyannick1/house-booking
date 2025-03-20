import {useState} from "react";
import {Button} from "@/components/ui/button.jsx"; // Assure-toi d'importer le bon composant Button
import {cn} from "@/lib/utils.js"; // Utilisation des utilitaires ShadCN pour les classes CSS

export default function Counter() {
    const [count, setCount] = useState(0); // État pour stocker la valeur du compteur

    const increment = () => setCount(count + 1); // Incrémente le compteur
    const decrement = () => setCount(count - 1); // Décrémente le compteur

    return (
        <div className="flex items-center space-x-4">
            <Button
                variant="outline"
                size="sm"
                className={cn("p-2")}
                onClick={decrement}
            >
                -
            </Button>
            <span className="text-md font-semibold">{count}</span> {/* Affichage du compteur */}
            <Button
                size="sm"
                variant="outline"
                className={cn("p-2")}
                onClick={increment}
            >
                +
            </Button>
        </div>
    );
}