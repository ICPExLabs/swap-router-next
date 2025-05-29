import {
    CombinedPairPoolIcpex,
    get_combined_pair_pool_icpex_amount_out,
    get_combined_pair_pool_icpex_instant_price,
} from './ex/icpex';
import { CombinedPairPoolIcpswap } from './ex/icpswap';
import {
    CombinedPairPoolKongswap,
    debug_combined_pair_pool_kongswap,
    get_combined_pair_pool_key_kongswap,
    get_combined_pair_pool_kongswap_amount_out,
    get_combined_pair_pool_kongswap_instant_price,
    get_combined_pair_pool_tokens_kongswap,
    is_combined_pair_pool_valid_kongswap,
    KongswapUserReply,
} from './ex/kongswap';

export type CombinedPairPoolAnchor =
    | {
          icpex: string; // swap canister
      }
    | {
          kongswap: {
              anchor: string; // canister
              fetch_user: () => Promise<KongswapUserReply>;
          };
      }
    | {
          icpswap: string; // router canister
      };

export const match_combined_pair_pool_anchor_async = async <T>(
    anchor: CombinedPairPoolAnchor,
    {
        icpex,
        kongswap,
        icpswap,
    }: {
        icpex: (anchor: string) => Promise<T>;
        kongswap: (anchor: {
            anchor: string; // canister
            fetch_user: () => Promise<KongswapUserReply>;
        }) => Promise<T>;
        icpswap: (router: string) => Promise<T>;
    },
): Promise<T> => {
    if ('icpex' in anchor) return icpex(anchor.icpex);
    if ('kongswap' in anchor) return kongswap(anchor.kongswap);
    if ('icpswap' in anchor) return icpswap(anchor.icpswap);
    throw new Error(`unknown anchor: ${JSON.stringify(anchor)}`);
};

export type CombinedPairPool =
    | {
          icpex: CombinedPairPoolIcpex;
      }
    | {
          kongswap: CombinedPairPoolKongswap;
      }
    | {
          icpswap: CombinedPairPoolIcpswap;
      };

export const match_combined_pair_pool = <T>(
    pool: CombinedPairPool,
    {
        icpex,
        kongswap,
        icpswap,
    }: {
        icpex: (pool: CombinedPairPoolIcpex) => T;
        kongswap: (pool: CombinedPairPoolKongswap) => T;
        icpswap: (pool: CombinedPairPoolIcpswap) => T;
    },
): T => {
    if ('icpex' in pool) return icpex(pool.icpex);
    if ('kongswap' in pool) return kongswap(pool.kongswap);
    if ('icpswap' in pool) return icpswap(pool.icpswap);
    throw new Error(`unknown pool: ${JSON.stringify(pool)}`);
};

export const match_combined_pair_pool_async = async <T>(
    pool: CombinedPairPool,
    {
        icpex,
        kongswap,
    }: { icpex: (pool: CombinedPairPoolIcpex) => Promise<T>; kongswap: (pool: CombinedPairPoolKongswap) => Promise<T> },
): Promise<T> => {
    if ('icpex' in pool) return icpex(pool.icpex);
    if ('kongswap' in pool) return kongswap(pool.kongswap);
    throw new Error(`unknown pool: ${JSON.stringify(pool)}`);
};

export const debug_combined_pair_pool = (pool: CombinedPairPool): string => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) =>
            `icpex(${pool.anchor})_[${pool.pool.swap_v2[0].token0}][${pool.pool.swap_v2[0].token1}](${pool.pool.swap_v2[0].amm}) { reserve0: ${pool.pool.swap_v2[1].reserve0}, reserve1: ${pool.pool.swap_v2[1].reserve1} }`,
        kongswap: debug_combined_pair_pool_kongswap,
        icpswap: (pool) => `icpswap(${pool.anchor})_${pool.pool.key}`,
    });
};

export const get_combined_pair_pool_key = (pool: CombinedPairPool): string => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) =>
            `icpex(${pool.anchor})_[${pool.pool.swap_v2[0].token0}][${pool.pool.swap_v2[0].token1}](${pool.pool.swap_v2[0].amm})`,
        kongswap: get_combined_pair_pool_key_kongswap,
        icpswap: (pool) => `icpswap(${pool.anchor})_${pool.pool.key}`,
    });
};

export const is_combined_pair_pool_valid = (pool: CombinedPairPool): boolean => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => pool.pool.swap_v2[1].reserve0 !== '0' && pool.pool.swap_v2[1].reserve1 !== '0',
        kongswap: is_combined_pair_pool_valid_kongswap,
        icpswap: () => true,
    });
};

export const get_combined_pair_pool_tokens = (pool: CombinedPairPool): [string, string] => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => [pool.pool.swap_v2[0].token0, pool.pool.swap_v2[0].token1],
        kongswap: get_combined_pair_pool_tokens_kongswap,
        icpswap: (pool) => [pool.pool.token0.address, pool.pool.token1.address],
    });
};

export const get_combined_pair_pool_amount_out = (
    pool: CombinedPairPool,
    amount_in: bigint,
    token_in: string,
): bigint => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => get_combined_pair_pool_icpex_amount_out(pool, amount_in, token_in),
        kongswap: (pool) =>
            get_combined_pair_pool_kongswap_amount_out(pool.tokens, pool.user, pool.pool, amount_in, token_in),
        icpswap: () => 0n,
    });
};

export const get_combined_pair_pool_instant_price = (pool: CombinedPairPool, token_in: string): number => {
    return match_combined_pair_pool(pool, {
        icpex: (pool) => get_combined_pair_pool_icpex_instant_price(pool, token_in),
        kongswap: (pool) => get_combined_pair_pool_kongswap_instant_price(pool.tokens, pool.pool, token_in),
        icpswap: () => 0,
    });
};
