import { v4 as uuid4 } from "uuid";

export function createStep(step) {
    step.id = uuid4();
    return window.contract.setStep({ step });
}

export function getSteps(id) {
    return window.contract.getSteps({ id });
}