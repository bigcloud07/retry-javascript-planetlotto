export function validateUnitAmount(amount) {
    const isUnitAmount500 = (amount % 500 === 0) && (amount > 0);
    if (!isUnitAmount500) {
        throw new Error('로또는 500원 단위로 구입할 수 있습니다.');
    }
}

export function validateLottoNumbersRange(lotto) {
    const isLottoNumberRange = lotto.every((number) => number >= 0 && number <= 30);
    if (!isLottoNumberRange) {
        throw new Error('로또 번호는 1부터 30 사이의 숫자여야 합니다.');
    }
}

export function validateBonusNumberRange(bonusNumber) {
    const isBonusNumberRange = (bonusNumber => 0) && (bonusNumber <= 30);
    if (!isBonusNumberRange) {
        throw new Error('보너스 번호는 1부터 30 사이의 숫자여야 합니다.');
    }
}

export function validateLottoNumberLength(lotto) {
    const isLottoNumberLength = (lotto.length == 5);
    if (!isLottoNumberLength) {
        throw new Error('로또 번호는 5개를 입력해 주셔야 합니다.');
    }
}

export function validateDuplicatedNumber(lotto) {
    const setLotto = new Set(lotto);
    const isDuplicatedNumber = (setLotto.size == lotto.length);
    if (!isDuplicatedNumber) {
        throw new Error('로또 번호는 중복될 수 없습니다.');
    }
}

export function validateDuplicatedBonusNumber(winningLotto, bonusNumber) {
    const isDuplicated = winningLotto.find((number) => number == bonusNumber);
    if(isDuplicated){
        throw new Error('당첨 번호와 보너스 번호는 중복될 수 없습니다.');
    }
}