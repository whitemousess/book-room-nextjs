"use client"

import axios from "axios";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import useRentModal from "@/src/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }, reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: '',
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        } else {
            setIsLoading(true);
            axios.post("/api/listings", data)
                .then(() => {
                    toast.success("Listings created!")
                    router.refresh();
                    reset();
                    setStep(STEPS.CATEGORY);
                    rentModal.onClose();
                }).catch(() => {
                    toast.error("Listings not created!")
                }).finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const handleCloseModal = () => {
        setStep(0);
        rentModal.onClose();
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create"
        }
        else {
            return "Next";
        }
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        else {
            return 'Back'
        }
    }, [step])

    let bodyContent = (
        <div className="
        flex
        flex-col
        gap-8">
            <Heading title="Which of these best describes your place" subtitle="Pick a category" />
            <div className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-3 
            max-h-[50vh] 
            overflow-y-auto">
                {categories.map((item) => (
                    <div className="col-span-1" key={item.label}>
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located" subtitle="Help guests find you!" />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your place"
                    subtitle="What amenities do you have!" />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Room"
                    subtitle="How many room do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
                <hr />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a photo to your place"
                    subtitle="Show guests what your place looks like!" />
                <ImageUpload
                    value={imageSrc}
                    onChange={value => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place"
                    subtitle="Short and sweet works best" />
                <Input
                    id="title"
                    label="title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?" />
                <Input
                    id='price'
                    label="price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            title="Airbnb your homepage"
            isOpen={rentModal.isOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            body={bodyContent}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    );
}

export default RentModal;