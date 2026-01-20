export function validateUnitAmount(amount) {
    const isUnitAmount500 = (amount % 500 === 0) && (amount > 0);
    if(!isUnitAmount500){
        throw new Error('로또는 500원 단위로 구입할 수 있습니다.');
    }
}

