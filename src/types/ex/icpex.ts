import { BigNumber } from 'bignumber.js';

export type SwapRatioView = string;

export interface InnerLPView {
    dummy_canister_id: string;
    total_supply: string;
    decimals: number;
    fee: string;
    minimum_liquidity: string;
}
export interface OuterLPView {
    token_canister_id: string;
    total_supply: string;
    decimals: number;
    fee: string;
    minimum_liquidity: string;
}

export type PoolLpView = { inner: InnerLPView } | { outer: OuterLPView };

export interface SwapV2MarketMakerView {
    subaccount: string;
    fee_rate: SwapRatioView; // 3/1000

    token0: string;
    token1: string;
    reserve0: string;
    reserve1: string;
    block_timestamp_last: string; // bigint

    price_cumulative_exponent: number;
    price0_cumulative_last: string;
    price1_cumulative_last: string;
    k_last: string;

    lp: PoolLpView;
    protocol_fee?: SwapRatioView;
}

const swap_v2_market_maker_view_amount_out = (
    self: SwapV2MarketMakerView,
    amount_in: bigint,
    token_in: string,
): bigint => {
    if (self.reserve0 === '0' || self.reserve1 === '0') return 0n;

    const [reserve_in, reserve_out] =
        token_in === self.token0
            ? [BigInt(self.reserve0), BigInt(self.reserve1)]
            : [BigInt(self.reserve1), BigInt(self.reserve0)];
    const [n, d] = (() => {
        const rate = self.fee_rate.split('/');
        return [BigInt(rate[0]), BigInt(rate[1])];
    })();
    console.log('n', n);
    console.log('d', d);
    const amount_in_with_fee = amount_in * (d - n);
    const numerator = reserve_out * amount_in_with_fee;
    const denominator = reserve_in * d + amount_in_with_fee;
    return numerator / denominator;
};

const swap_v2_market_maker_view_instant_price = (self: SwapV2MarketMakerView, token_in: string): number => {
    const [reserve_in, reserve_out] =
        token_in === self.token0 ? [self.reserve0, self.reserve1] : [self.reserve1, self.reserve0];
    return BigNumber(reserve_out).toNumber() / BigNumber(reserve_in).toNumber();
};

export interface TokenPairPoolView {
    token0: string;
    token1: string;
    amm: string;
}

export interface IcpexPairPool {
    swap_v2: [TokenPairPoolView, SwapV2MarketMakerView];
}

export const match_icpex_pair_pool = <T>(
    pool: IcpexPairPool,
    { swap_v2 }: { swap_v2: (pool: [TokenPairPoolView, SwapV2MarketMakerView]) => T },
): T => {
    if ('swap_v2' in pool) return swap_v2(pool.swap_v2);
    throw new Error(`unknown icpex pool: ${JSON.stringify(pool)}`);
};

export interface CombinedPairPoolIcpex {
    anchor: string;
    pool: IcpexPairPool;
}

export const get_combined_pair_pool_icpex_amount_out = (
    pool: CombinedPairPoolIcpex,
    amount_in: bigint,
    token_in: string,
): bigint => {
    return match_icpex_pair_pool(pool.pool, {
        swap_v2: ([_, swap_v2]) => swap_v2_market_maker_view_amount_out(swap_v2, amount_in, token_in),
    });
};

export const get_combined_pair_pool_icpex_instant_price = (pool: CombinedPairPoolIcpex, token_in: string): number => {
    return match_icpex_pair_pool(pool.pool, {
        swap_v2: ([_, swap_v2]) => swap_v2_market_maker_view_instant_price(swap_v2, token_in),
    });
};
