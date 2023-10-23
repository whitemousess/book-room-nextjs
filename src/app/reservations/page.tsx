import EmptyState from "~/components/EmptyState";
import ClientOnly from "~/components/ClientOnly";
import ReservationsClient from "./ReservationsClient"

import getCurrentUser from "~/app/actions/getCurrentUser";
import getReservations from "~/app/actions/getReservations";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const reservation = await getReservations({
        userId: currentUser.id
    })

    if (reservation.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservation found"
                    subtitle="Looks like you have no reservation on your properties"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient
                reservation={reservation}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ReservationsPage;
