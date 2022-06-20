import { Tour, listedTours } from "./model";

export function setTour(tour: Tour): void {
    let storedTour = listedTours.get(tour.id);
    if (storedTour !== null) {
        throw new Error(`a walking tour with ${tour.id} already exists`);
    }
    listedTours.set(tour.id, Tour.fromPayload(tour));
}

export function getTour(id: string): Tour | null {
    return listedTours.get(id);
}

export function getTours(): Tour[] {
    return listedTours.values();
}