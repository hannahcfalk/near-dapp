import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createTour(tour) {
    tour.id = uuid4();
    tour.price = parseNearAmount(tour.price + "");
    return window.contract.setTour({ tour });
}

export function getTours() {
    return window.contract.getTours();
}