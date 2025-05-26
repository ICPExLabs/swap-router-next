import _ from 'lodash';

import { quote_icp_by_icp_swap } from './canisters/icpex/swap';
import { find_all_paths } from './path';
import { PairSwapPath } from './types/pair';
import {
    CombinedPairPool,
    CombinedPairPoolAnchor,
    get_combined_pair_pool_key,
    is_combined_pair_pool_valid,
    match_combined_pair_pool_anchor_async,
} from './types/pool';

export const pair_swap_exact_tokens_by = async (
    anchors: CombinedPairPoolAnchor[],
    from_token: string,
    to_token: string,
    from_amount: bigint,
) => {
    const pools = await Promise.all(
        anchors.map((anchor) =>
            match_combined_pair_pool_anchor_async<CombinedPairPool[]>(anchor, {
                icpex: async (anchor) => {
                    const pools = await quote_icp_by_icp_swap(anchor);
                    return pools.map((pool) => ({ icpex: { anchor, pool } }));
                },
            }),
        ),
    );
    return pair_swap_exact_tokens(
        pools.flatMap((p) => p),
        from_token,
        to_token,
        from_amount,
    );
};

export const pair_swap_exact_tokens = (
    pair_pools: CombinedPairPool[],
    from_token: string,
    to_token: string,
    from_amount: bigint,
) => {
    const pools = new Map<string, CombinedPairPool>();
    for (const pool of pair_pools) {
        if (!is_combined_pair_pool_valid(pool)) continue;
        const key = get_combined_pair_pool_key(pool);
        if (pools.has(key)) continue;
        pools.set(key, pool);
    }

    // 1. find all path
    // todo
    console.log('pools', pools);
    console.log('from_token', from_token);
    console.log('to_token', to_token);
    console.log('from_amount', from_amount);

    throw new Error('unimplemented');
};

// ======================== paths ========================

export const get_pair_swap_exact_tokens_paths_by = async (
    anchors: CombinedPairPoolAnchor[],
    from_token: string,
    to_token: string,
    from_amount: bigint,
): Promise<PairSwapPath[]> => {
    const pools = await Promise.all(
        anchors.map((anchor) =>
            match_combined_pair_pool_anchor_async<CombinedPairPool[]>(anchor, {
                icpex: async (anchor) => {
                    const pools = await quote_icp_by_icp_swap(anchor);
                    return pools.map((pool) => ({ icpex: { anchor, pool } }));
                },
            }),
        ),
    );
    return get_pair_swap_exact_tokens_paths(
        pools.flatMap((p) => p),
        from_token,
        to_token,
        from_amount,
    );
};

export const get_pair_swap_exact_tokens_paths = (
    pair_pools: CombinedPairPool[],
    from_token: string,
    to_token: string,
    from_amount: bigint,
): PairSwapPath[] => {
    if (from_amount <= 0n) throw new Error('from_amount must be positive');

    const pools = new Map<string, CombinedPairPool>();
    for (const pool of pair_pools) {
        if (!is_combined_pair_pool_valid(pool)) continue;
        const key = get_combined_pair_pool_key(pool);
        if (pools.has(key)) continue;
        pools.set(key, pool);
    }

    // 1. find all path
    const all_paths = find_all_paths(pools, from_token, to_token);

    // 2. calculate
    let paths = all_paths.map((path) => path.calculate(from_amount));

    // 3. sort
    paths = _.sortBy(
        paths.filter((p) => 0n < p.to_amount),
        [(p) => -p.to_amount],
    );

    return paths;
};
