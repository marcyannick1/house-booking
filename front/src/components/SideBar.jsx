import {useState} from "react";
import {Sidebar, SidebarContent} from "@/components/ui/sidebar";
import {Slider} from "@/components/ui/slider.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {CalendarIcon} from "lucide-react";
import {addDays, format} from "date-fns";
import {cn} from "@/lib/utils.js";
import {Calendar} from "@/components/ui/calendar.jsx";
import Counter from "@/components/ui/counter.jsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"; // Utiliser ToggleGroup de ShadCN

export function HomeSidebar() {
    const [priceRange, setPriceRange] = useState([20, 80]);

    const [date, setDate] = useState({
        from: new Date(),
        to: addDays(new Date(), 20),
    });

    const [selectedType, setSelectedType] = useState("appartement");

    return (
        <Sidebar>
            <SidebarContent
                className="mt-16 p-6 space-y-6"> {/* Ajout de `space-y-6` pour mieux espacer les sections */}

                {/* Type de logement */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Type de logement</h2>
                    <ToggleGroup
                        type="single"
                        value={selectedType}
                        onValueChange={(value) => setSelectedType(value)}
                        className="flex flex-wrap gap-2"
                    >
                        {["appartement", "maison", "villa", "studio"].map((type) => (
                            <ToggleGroupItem
                                key={type}
                                value={type}
                                className={cn(
                                    "px-4 bg-gray-100 py-2 rounded-md border border-gray-300 transition text-sm",
                                    selectedType === type
                                        ? "border-2 border-black text-white"
                                        : "text-gray-700 hover:bg-gray-200"
                                )}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>

                {/* Chambres et salles de bain */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Guests</h2>
                    <div className="w-full flex justify-between items-center mb-3">
                        <span className="text-md font-medium">Nombre de personne</span>
                        <Counter/>
                    </div>
                </div>

                {/* Prix */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Prix</h2>
                    <Slider
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value)}
                        max={100}
                        step={1}
                        className="mb-4"
                        min={0}
                    />
                    <div className="flex justify-between text-md font-medium">
                        <span>{priceRange[0]}€</span>
                        <span>{priceRange[1]}€</span>
                    </div>
                </div>

                {/* Date */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Date</h2>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className="w-full justify-start text-left font-normal py-2 px-4 border-gray-300 rounded-md"
                            >
                                <CalendarIcon className="mr-2"/>
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Choisir une date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Chambres et salles de bain */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Chambres et salles de bain</h2>
                    <div className="w-full flex justify-between items-center mb-3">
                        <span className="text-md font-medium">Chambres</span>
                        <Counter/>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-md font-medium">Salles de bain</span>
                        <Counter/>
                    </div>
                </div>

            </SidebarContent>
        </Sidebar>
    );
}