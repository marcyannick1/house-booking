import { Button } from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils.js";

export default function Counter({ value, onChange }) {
    const increment = () => onChange(value + 1); // 🔥 Augmente la valeur
    const decrement = () => onChange(value > 1 ? value - 1 : 0); // 🔥 Empêche d'aller sous 1

    return (
        <div className="flex items-center space-x-4">
            <Button
                variant="outline"
                size="sm"
                className={cn("p-2")}
                onClick={decrement}
                type="button"
            >
                -
            </Button>
            <span className="text-md font-semibold">{value}</span> {/* 🔥 Affichage de la valeur de `Formik` */}
            <Button
                size="sm"
                variant="outline"
                className={cn("p-2")}
                onClick={increment}
                type="button"
            >
                +
            </Button>
        </div>
    );
}