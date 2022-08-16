import { logging } from "near-sdk-as";
import { Tour, listedTours, Step, listedSteps } from "./model";

export function setTour(tour: Tour): void {
    let storedTour = listedTours.get(tour.id);
    if (storedTour !== null) {
        throw new Error(`a walking tour with ${tour.id} already exists`);
    }
    listedTours.set(tour.id, Tour.fromPayload(tour));
}

export function setStep(step: Step): void {
    let storedTour = listedSteps.get(step.tour_id);
    if (storedTour === null) {
        listedSteps.set(step.tour_id, [Step.fromPayload(step)]);
    }
    else {
        storedTour.push(Step.fromPayload(step));
    }
}

export function getTour(id: string): Tour | null {
    return listedTours.get(id);
}

export function getSteps(id: string): Step[] {
    let steps = listedSteps.get(id);
    if (steps == null) {
        return [];
    }
    return steps;

}

export function getTours(): Tour[] {
    return listedTours.values();
}

export function deleteTour(id: string): void {
    listedTours.delete(id);
    listedSteps.delete(id);
}