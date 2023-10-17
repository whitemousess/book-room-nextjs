'use client'

import Image from "next/image";
import { format } from "date-fns"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeListings, SafeUser } from "~/types";
import HeartButton from "~/components/HeartButton";
import useCountries from "~/hooks/useCountries";
import { Listing, Reservation } from "@prisma/client";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListings;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);
    const handleCancel = useCallback((
        e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) { return; }
        else { onAction?.(actionId) }
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data])

    const reservationDate = useMemo(() => {
        if (!reservation) { return null; }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image fill src={data.imageSrc} alt="listing" className="object-cover h-full w-full group-hover:scale-110 transition" />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser} />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.label}
                </div>
                <div className="text-lg">
                    {data.title}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gao1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">
                          / night
                        </div>
                    )}
                    {onAction && actionLabel && (
                        <Button
                            disabled
                            small
                            label={actionLabel}
                            onClick={handleCancel} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
