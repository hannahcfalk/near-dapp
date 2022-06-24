import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Step {
    number: i32;
    tour_id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    public static fromPayload(payload: Step, number: i32): Step {
        const step = new Step();
        step.number = number;
        step.tour_id = payload.tour_id;
        step.name = payload.name;
        step.description = payload.description;
        step.image = payload.image;
        step.location = payload.location;
        return step;
    }
}

@nearBindgen
export class Tour {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    price: u128;
    steps: Step[];
    owner: string;
    public static fromPayload(payload: Tour): Tour {
        const tour = new Tour();
        tour.id = payload.id;
        tour.title = payload.title;
        tour.description = payload.description;
        tour.image = payload.image;
        tour.location = payload.location;
        tour.price = payload.price;
        tour.steps = [];
        tour.owner = context.sender;
        return tour;
    }
}

export const listedTours = new PersistentUnorderedMap<string, Tour>("t");