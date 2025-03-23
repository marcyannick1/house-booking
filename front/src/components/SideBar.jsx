import {Sidebar, SidebarContent} from "@/components/ui/sidebar";
import {Slider} from "@/components/ui/slider.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {CalendarIcon} from "lucide-react";
import {addDays, format} from "date-fns";
import {cn} from "@/lib/utils.js";
import {Calendar} from "@/components/ui/calendar.jsx";
import Counter from "@/components/ui/counter.jsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Formik, Form, Field} from "formik";

export function HomeSidebar({setFilters}) {
    return (
        <Formik
            initialValues={{
                propertyType: "appartement",
                guests: 1,
                bedrooms: 1,
                bathrooms: 1,
                priceRange: [20, 400],
                date: {
                    from: new Date(),
                    to: addDays(new Date(), 20),
                },
            }}
            onSubmit={(values) => {
                const {priceRange, date, ...rest} = values;

                const filteredValues = {
                    ...rest,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    startDate: date.from,
                    endDate: date.to
                };

                setFilters(filteredValues);
            }}
        >
            {({values, setFieldValue}) => (
                <Form>
                    <Sidebar>
                        <SidebarContent className="mt-16 p-6 space-y-6">
                            {/* Type de logement */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Type de logement</h2>
                                <ToggleGroup
                                    type="single"
                                    value={values.propertyType}
                                    onValueChange={(value) => setFieldValue("propertyType", value)}
                                    className="flex flex-wrap gap-2"
                                >
                                    {["appartement", "maison", "villa", "studio"].map((type) => (
                                        <ToggleGroupItem
                                            key={type}
                                            value={type}
                                            className={cn(
                                                "px-4 bg-gray-100 py-2 rounded-md border border-gray-300 transition text-sm",
                                                values.propertyType === type
                                                    ? "border-2 border-black text-white"
                                                    : "text-gray-700 hover:bg-gray-200"
                                            )}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </div>

                            {/* Nombre de personnes */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Guests</h2>
                                <div className="w-full flex justify-between items-center mb-3">
                                    <span className="text-md font-medium">Nombre de personne</span>
                                    <Counter
                                        value={values.guests}
                                        onChange={(value) => setFieldValue("guests", value)}
                                    />
                                </div>
                            </div>

                            {/* Prix */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Prix</h2>
                                <Slider
                                    value={values.priceRange}
                                    onValueChange={(value) => setFieldValue("priceRange", value)}
                                    max={500}
                                    step={1}
                                    className="mb-4"
                                    min={0}
                                />
                                <div className="flex justify-between text-md font-medium">
                                    <span>{values.priceRange[0]}€</span>
                                    <span>{values.priceRange[1]}€</span>
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
                                            {values.date.from ? (
                                                values.date.to ? (
                                                    <>
                                                        {format(values.date.from, "LLL dd, y")} -{" "}
                                                        {format(values.date.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(values.date.from, "LLL dd, y")
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
                                            defaultMonth={values.date.from}
                                            selected={values.date}
                                            onSelect={(date) => setFieldValue("date", date)}
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
                                    <Counter
                                        value={values.bedrooms}
                                        onChange={(value) => setFieldValue("bedrooms", value)}
                                    />
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <span className="text-md font-medium">Salles de bain</span>
                                    <Counter
                                        value={values.bathrooms}
                                        onChange={(value) => setFieldValue("bathrooms", value)}
                                    />
                                </div>
                            </div>

                            {/* Bouton Appliquer */}
                            <div className="text-center">
                                <Button type="submit" className="w-full bg-black text-white mt-4">
                                    Appliquer les filtres
                                </Button>
                            </div>
                        </SidebarContent>
                    </Sidebar>
                </Form>
            )}
        </Formik>
    );
}