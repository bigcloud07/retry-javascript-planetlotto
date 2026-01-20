import { LottoStore } from "./model/LottoStroe.js";
import { inputErrorHandler } from "./utils/errorHandler.js";
import { validateBonusNumberRange, validateDuplicatedNumber, validateUnitAmount, validateLottoNumbersRange, validateLottoNumberLength, validateDuplicatedBonusNumber } from "./utils/validator.js";
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

    const winningLotto = await inputErrorHandler(async() => {
        const inputWinningLotto = await InputView.askWinningLotto();
        validateLottoNumbersRange(inputWinningLotto);
        validateLottoNumberLength(inputWinningLotto);
        validateDuplicatedNumber(inputWinningLotto);
        return inputWinningLotto;
    }, OutputView);

    const bonusNumber = await inputErrorHandler(async() => {
        const inputBounsNumber = await InputView.askBonusNumber();
        validateBonusNumberRange(inputBounsNumber);
        validateDuplicatedBonusNumber(winningLotto, inputBounsNumber);
    }, OutputView)
}