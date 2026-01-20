// 발행된 로또의 당첨 내역을 관리하는 클래스
export class LottoResult {

    constructor() {
        // index, count
        this.result = new Map([
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
        ]);

        this.PRIZE_MONEY = {
            0: 0,
            1: 100000000,
            2: 10000000,
            3: 1500000,
            4: 500000,
            5: 5000,
        }
    }

    // 당첨 번호와 발행 로또 번호를 비교
    getMatchCount(issuedLottos, winningLotto, bonusNumber) {
        issuedLottos.forEach(lotto => {
            const hasBonusNumber = lotto.includes(bonusNumber);
            const matchCount = lotto.filter(number => winningLotto.includes(number)).length;

            if (matchCount == 5) {
                this.result.set(1, this.result.get(1) + 1);
            }
            if (matchCount == 4 && hasBonusNumber) {
                this.result.set(2, this.result.get(2) + 1);
            }
            if (matchCount == 4) {
                this.result.set(3, this.result.get(3) + 1);
            }
            if (matchCount == 3 && hasBonusNumber) {
                this.result.set(4, this.result.get(4) + 1);
            }
            if (matchCount == 2 && hasBonusNumber) {
                this.result.set(5, this.result.get(5) + 1);
            }
            if (matchCount == 0) {
                this.result.set(0, this.result.get(0) + 1);
            }
        });

        return this.result;
    }

    // 수익 계산
    getProfit() {
        let profit = 0;

        this.result.forEach((count, index) => {
            let prize = this.PRIZE_MONEY[index] || 0;
            profit += prize * count;
        });

        return profit;
    }

    // 수익률 계산
    getProfitRate(amount) {
        const profit = this.getProfit();
        const profitRate = profit / amount * 100;

        return profitRate.toFixed(1);
    }
}