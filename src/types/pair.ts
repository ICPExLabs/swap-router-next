import { CombinedPairPool } from './pool';
import { SwapDirection } from './swap';

export interface SingleSwapPath {
    pool: CombinedPairPool;
    direction: SwapDirection;
}

export interface PairSwapPath {
    from_token: string;
    to_token: string;

    path: SingleSwapPath[];

    from_amount: bigint; // pay
    to_amount: bigint; // got

    // price
    average_price: number;
    instant_price: number;
}
