import { ERROR_MESSAGES } from "../constants/messages.js";

export function validateUnitAmount(amount) {
    const isUnitAmount500 = (amount % 500 === 0) && (amount > 0);
    if (!isUnitAmount500) {
        throw new Error(ERROR_MESSAGES.UNIT_AMOUNT);
    }
}

export function validateLottoNumbersRange(lotto) {
    const isLottoNumberRange = lotto.every((number) => number >= 0 && number <= 30);
    if (!isLottoNumberRange) {
        throw new Error(ERROR_MESSAGES.LOTTO_NUMBERS_RANGE);
    }
}

export function validateBonusNumberRange(bonusNumber) {
    const isBonusNumberRange = (bonusNumber => 0) && (bonusNumber <= 30);
    if (!isBonusNumberRange) {
        throw new Error(ERROR_MESSAGES.BONUS_NUMBER_RANGE);
    }
}

export function validateLottoNumberLength(lotto) {
    const isLottoNumberLength = (lotto.length == 5);
    if (!isLottoNumberLength) {
        throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_LENGTH);
    }
}

export function validateDuplicatedNumber(lotto) {
    const setLotto = new Set(lotto);
    const isDuplicatedNumber = (setLotto.size == lotto.length);
    if (!isDuplicatedNumber) {
        throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
    }
}

export function validateDuplicatedBonusNumber(winningLotto, bonusNumber) {
    const isDuplicated = winningLotto.find((number) => number == bonusNumber);
    if(isDuplicated){
        throw new Error(ERROR_MESSAGES.DUPLICATED_BONUS_NUMBER);
    }
}