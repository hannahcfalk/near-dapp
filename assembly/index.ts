import { Tour, listedTours, Step } from "./model";

export function setTour(tour: Tour): void {
    let storedTour = listedTours.get(tour.id);
    if (storedTour !== null) {
        throw new Error(`a walking tour with ${tour.id} already exists`);
    }
    listedTours.set(tour.id, Tour.fromPayload(tour));
}

export function setStep(step: Step): void {
    let storedTour = listedTours.get(step.tour_id);
    if (storedTour == null) {
        throw new Error(`a walking tour with ${step.tour_id} doesn't exist`);
    }
    let newStep = Step.fromPayload(step, storedTour.steps.length + 1);
    storedTour.steps.push(newStep);
}

export function getTour(id: string): Tour | null {
    return listedTours.get(id);
}

export function getTours(): Tour[] {
    return listedTours.values();
}

export function deleteTour(id: string): void {
    listedTours.delete(id);
}