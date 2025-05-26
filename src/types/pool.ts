import {
    CombinedPairPoolIcpex,
    get_combined_pair_pool_icpex_amount_out,
    get_combined_pair_pool_icpex_instant_price,
} from './ex/icpex';

export interface CombinedPairPoolAnchor {
    icpex: string; // swap canister
}

export const match_combined_pair_pool_anchor_async = async <T>(
    anchor: CombinedPairPoolAnchor,
    { icpex }: { icpex: (anchor: string) => Promise<T> },
): Promise<T> => {
    if ('icpex' in anchor) return icpex(anchor.icpex);
    throw new Error(`unknown anchor: ${JSON.stringify(anchor)}`);
};

export interface CombinedPairPool {
    icpex: CombinedPairPoolIcpex;
}

export const match_combined_pair_pool = <T>(
    pool: CombinedPairPool,
    { icpex }: { icpex: (pool: CombinedPairPoolIcpex) => T },
): T => {
    if ('icpex' in pool) return icpex(pool.icpex);
    throw new Error(`unknown pool: ${JSON.stringify(pool)}`);
};

export const match_combined_pair_pool_async = async <T>(
    pool: CombinedPairPool,
    { icpex }: { icpex: (pool: CombinedPairPoolIcpex) => Promise<T> },
): Promise<T> => {
    if ('icpex' in pool) return icpex(pool.icpex);
    throw new Error(`unknown pool: ${JSON.stringify(pool)}`);
};

export const debug_combined_pair_pool = (pool: CombinedPairPool): string => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) =>
            `icpex(${pool.anchor})_[${pool.pool.swap_v2[0].token0}][${pool.pool.swap_v2[0].token1}](${pool.pool.swap_v2[0].amm}) { reserve0: ${pool.pool.swap_v2[1].reserve0}, reserve1: ${pool.pool.swap_v2[1].reserve1} }`,
    });
};

export const get_combined_pair_pool_key = (pool: CombinedPairPool): string => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) =>
            `icpex(${pool.anchor})_[${pool.pool.swap_v2[0].token0}][${pool.pool.swap_v2[0].token1}](${pool.pool.swap_v2[0].amm})`,
    });
};

export const is_combined_pair_pool_valid = (pool: CombinedPairPool): boolean => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => pool.pool.swap_v2[1].reserve0 !== '0' && pool.pool.swap_v2[1].reserve1 !== '0',
    });
};

export const get_combined_pair_pool_tokens = (pool: CombinedPairPool): [string, string] => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => [pool.pool.swap_v2[0].token0, pool.pool.swap_v2[0].token1],
    });
};

export const get_combined_pair_pool_amount_out = (
    pool: CombinedPairPool,
    amount_in: bigint,
    token_in: string,
): bigint => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => get_combined_pair_pool_icpex_amount_out(pool, amount_in, token_in),
    });
};

export const get_combined_pair_pool_instant_price = (pool: CombinedPairPool, token_in: string): number => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => get_combined_pair_pool_icpex_instant_price(pool, token_in),
    });
};
