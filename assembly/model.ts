import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Tour {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    price: u128;
    owner: string;
    public static fromPayload(payload: Tour): Tour {
        const tour = new Tour();
        tour.id = payload.id;
        tour.title = payload.title;
        tour.description = payload.description;
        tour.image = payload.image;
        tour.location = payload.location;
        tour.price = payload.price;
        tour.owner = context.sender;
        return tour;
    }
}

export const listedTours = new PersistentUnorderedMap<string, Tour>("t");