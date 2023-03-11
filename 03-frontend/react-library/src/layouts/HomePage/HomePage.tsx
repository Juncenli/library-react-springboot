import { Carousel } from "./components/Carousel";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";
import React from "react";

export const HomePage = () => {
    return (
        <div>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </div>
    );
}