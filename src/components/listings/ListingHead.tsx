'use client'

import useCountries from "@/src/hooks/useCountries";
import { SafeUser } from "@/src/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string,
    imageUrl: string,
    locationValue: string,
    id: string,
    currentUser?: SafeUser | null,
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageUrl,
    locationValue,
    id,
    currentUser }) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <div>
            <Heading title={title} subtitle={`${location?.region} ,${location?.label}`} />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image src={imageUrl} alt="imageUrl" fill className="object-cover w-full" />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListingHead;