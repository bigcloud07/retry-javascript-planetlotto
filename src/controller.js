import { inputErrorHandler } from "./utils/errorHandler.js";
import { validateUnitAmount } from "./utils/validator.js";
import { InputView, OutputView } from "./view.js";

export default async function controller() {
    const amount = await inputErrorHandler(async() => {
        const inputAmount = await InputView.askAmount();
        validateUnitAmount(inputAmount);
        return inputAmount;
    }, OutputView);
}