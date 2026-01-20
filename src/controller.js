import { LottoStore } from "./model/LottoStroe.js";
import { inputErrorHandler } from "./utils/errorHandler.js";
import { validateUnitAmount } from "./utils/validator.js";
import { InputView, OutputView } from "./view.js";

export default async function controller() {
    const lottoStore = new LottoStore();

    const amount = await inputErrorHandler(async() => {
        const inputAmount = await InputView.askAmount();
        validateUnitAmount(inputAmount);
        return inputAmount;
    }, OutputView);

    const lottoCount = amount / 500;
    const issuedLottos = lottoStore.generateLotto(lottoCount);
    OutputView.printPurchasedLottos(issuedLottos);

    // const winningLotto = await inputErrorHandler(async() => {
    //     const inputWinningLotto = await InputView.askWinningLotto();
    //     return inputWinningLotto;
    // }, OutputView)
}