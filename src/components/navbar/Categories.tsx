"use client";

import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

import CategoryBox from "./CategoryBox";

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property has Windmill!",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is Modern!",
    },
    {
        label: "Country",
        icon: TbMountain,
        description: "This property is in the Countryside!",
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This property has a TbPool!",
    },
    {
        label: "IsLands",
        icon: GiIsland,
        description: "This property on an isLand!",
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to a lake!",
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property has skiing activities!",
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property has Camping activities!",
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This property is in a castle!",
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This property camping Arctic!",
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property is in a cave!",
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the desert!",
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "This property is in barn!",
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "This property camping Arctic!",
    },
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="
            pt-4 
            pb-4 
            flex 
            flex-row
            items-center
            justify-between
            overflow-x-auto">
                {categories.map((items) => (
                    <CategoryBox
                        key={items.label}
                        label={items.label}
                        selected={category === items.label}
                        description={items.description}
                        icon={items.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
