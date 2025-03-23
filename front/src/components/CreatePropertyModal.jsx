import {useRef, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {addDays, format} from "date-fns";
import {CalendarIcon, Loader2} from "lucide-react";
import {cn} from "@/lib/utils";
import Counter from "@/components/ui/counter.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createProperty} from "@/redux/actions/propertyActions.js";

export default function CreatePropertyModal({isOpen, setIsOpen}) {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.property);
    const {userInfo} = useSelector(state => state.auth);
    const formikRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleClose = () => {
        setIsOpen(false);
        formikRef.current?.resetForm();
        setSelectedFiles([]);
    };

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (typeof values[key] === "object") {
                    formData.append(key, JSON.stringify(values[key])); // Convertit objets en JSON
                } else {
                    formData.append(key, values[key]);
                }
            });

            selectedFiles.forEach((file) => {
                formData.append("files", file);
            });

            formData.append("address", JSON.stringify({
                street: "yfrhezd",
                city: "dgfhdn",
                postalCode: "020202",
                country: "France"
            }));
            formData.append("owner", userInfo._id);

            const response = await dispatch(createProperty(formData)).unwrap();

            console.log("Propriété créée avec succès :", response);

            resetForm();
            setSelectedFiles([]);
            handleClose();

        } catch (error) {
            console.error("Erreur lors de la création :", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Créer une annonce</DialogTitle>
                </DialogHeader>

                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        title: "",
                        description: "",
                        guests: 1,
                        pricePerNight: "",
                        // address: "",
                        propertyType: "",
                        bedrooms: 1,
                        bathrooms: 1,
                        availability: {
                            startDate: new Date(),
                            endDate: addDays(new Date(), 20),
                        },
                    }}
                    // validationSchema={createPropertySchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, setFieldValue, values}) => (
                        <Form className="space-y-4">
                            {/* Titre */}
                            <div>
                                <label className="block text-sm font-medium">Titre</label>
                                <Field as={Input} name="title" placeholder="Titre de l'annonce"/>
                                {/*<ErrorMessage name="title" component="p" className="text-red-500 text-sm" />*/}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <Field as={Textarea} name="description" placeholder="Décris ton annonce..."/>
                                {/*<ErrorMessage name="description" component="p" className="text-red-500 text-sm" />*/}
                            </div>

                            {/* Nombres de personnes */}
                            <div>
                                <label className="block text-sm font-medium">Nombre de personnes</label>
                                <Field name="guests">
                                    {({field, form}) => (
                                        <Counter
                                            value={field.value}
                                            onChange={(val) => form.setFieldValue("guests", val)}
                                        />
                                    )}
                                </Field>
                                {/*<ErrorMessage name="rooms" component="p" className="text-red-500 text-sm"/>*/}
                            </div>

                            {/* Prix */}
                            <div>
                                <label className="block text-sm font-medium">Prix (€)</label>
                                <Field as={Input} name="pricePerNight" type="number" placeholder="Prix par nuit"/>
                                {/*<ErrorMessage name="pricePerNight" component="p" className="text-red-500 text-sm" />*/}
                            </div>

                            {/* Localisation */}
                            <div>
                                <label className="block text-sm font-medium">Localisation</label>
                                <Field as={Input} placeholder="Ex: Paris, France"/>
                                {/*<ErrorMessage name="address" component="p" className="text-red-500 text-sm" />*/}
                            </div>

                            {/* Type de logement */}
                            <div>
                                <label className="block text-sm font-medium">Type de logement</label>
                                <ToggleGroup
                                    type="single"
                                    value={values.propertyType}
                                    onValueChange={(value) => setFieldValue("propertyType", value)}
                                    className="flex flex-wrap gap-2"
                                >
                                    {["appartement", "maison", "villa", "studio"].map((propertyType) => (
                                        <ToggleGroupItem
                                            key={propertyType}
                                            value={propertyType}
                                            className={cn(
                                                "px-4 bg-gray-100 py-2 rounded-md border border-gray-300 transition text-sm",
                                                values.propertyType === propertyType
                                                    ? "border-2 border-black text-white"
                                                    : "text-gray-700 hover:bg-gray-200"
                                            )}
                                        >
                                            {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                                {/*<ErrorMessage name="type" component="p" className="text-red-500 text-sm" />*/}
                            </div>

                            {/* Chambres et salles de bain */}
                            <div>
                                <label className="block text-sm font-medium">Nombre de chambres</label>
                                <Field name="bedrooms">
                                    {({field, form}) => (
                                        <Counter
                                            value={field.value}
                                            onChange={(val) => form.setFieldValue("bedrooms", val)}
                                        />
                                    )}
                                </Field>
                                {/*<ErrorMessage name="rooms" component="p" className="text-red-500 text-sm"/>*/}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Nombre de salles de bain</label>
                                <Field name="bathrooms">
                                    {({field, form}) => (
                                        <Counter
                                            value={field.value}
                                            onChange={(val) => form.setFieldValue("bathrooms", val)}
                                        />
                                    )}
                                </Field>
                                {/*<ErrorMessage name="bathrooms" component="p" className="text-red-500 text-sm"/>*/}
                            </div>

                            {/* Sélection d'images */}
                            <div>
                                <label className="block text-sm font-medium">Photos</label>
                                <input type="file" multiple onChange={handleFileChange}/>
                                {selectedFiles.length > 0 && (
                                    <p className="text-gray-600 text-sm">{selectedFiles.length} image(s)
                                        sélectionnée(s)</p>
                                )}
                            </div>

                            {/* Disponibilité */}
                            <div>
                                <label className="block text-sm font-medium">Date de disponibilité</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal py-2 px-4 border-gray-300 rounded-md"
                                        >
                                            <CalendarIcon className="mr-2"/>
                                            {values.availability.startDate ? (
                                                values.availability.endDate ? (
                                                    <>
                                                        {format(values.availability.startDate, "LLL dd, y")} -{" "}
                                                        {format(values.availability.endDate, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(values.availability.startDate, "LLL dd, y")
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
                                            defaultMonth={values.availability.startDate}
                                            selected={values.availability}
                                            onSelect={(range) => setFieldValue("availability", range)}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={handleClose}>
                                    Annuler
                                </Button>
                                <Button disabled={isSubmitting} type="submit">
                                    {loading &&
                                        <Loader2 className="animate-spin"/>}
                                    Publier l'annonce
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}