import EmptyState from "~/components/EmptyState";
import ClientOnly from "~/components/ClientOnly";

import getCurrentUser from "~/app/actions/getCurrentUser";
import getFavorites from "~/app/actions/getFavorites";
import FavoritesClient from "./FavoritesClient";

const favoritesPage = async () => {
    const currentUser = await getCurrentUser();
    const favorites = await getFavorites();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login" />
            </ClientOnly>
        )
    }

    if (favorites.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorites listing" />
            </ClientOnly>
        )
    }

    console.log(favorites)

    return (
        <ClientOnly>
            <FavoritesClient
                listings={favorites}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default favoritesPage;