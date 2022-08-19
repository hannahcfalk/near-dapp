import { ContractPromiseBatch, context } from "near-sdk-as";
import { Tour, listedTours, Step, listedSteps, owners } from "./model";

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

export function addTour(owner: string, id: string): void {
    let storedOwner = owners.get(owner);
    if (storedOwner === null) {
        owners.set(owner, [id]);
    }
    else {
        storedOwner.push(id);
    }
}

export function checkOwner(owner: string, id: string): boolean {
    let storedOwner = owners.get(owner);
    if (storedOwner !== null) {
        if (storedOwner.includes(id)) {
            return true;
        }
    }
    return false;
}

export function buyTour(id: string): void {
    const tour = getTour(id);
    if (tour == null) {
        throw new Error("tour not found");
    }
    if (tour.owner == context.sender || checkOwner(context.sender, id) ) {
        throw new Error("cannot buy tour as user already owns tour")
    }
    if (tour.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should equal to the product's price");
    }
    ContractPromiseBatch.create(tour.owner).transfer(context.attachedDeposit);
    addTour(context.sender, id);
}