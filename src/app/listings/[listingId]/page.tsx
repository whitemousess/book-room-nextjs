import EmptyState from "@/src/components/EmptyState";
import ClientOnly from "@/src/components/ClientOnly";
import getListingById from "@/src/app/actions/GetListingById";
import getCurrentUser from "@/src/app/actions/getCurrentUser";
import ListingClient from "./ListingClient"

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ListingPage;