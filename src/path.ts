import { BigNumber } from 'bignumber.js';

import { PairSwapPath } from './types/pair';
import {
    CombinedPairPool,
    debug_combined_pair_pool,
    get_combined_pair_pool_amount_out,
    get_combined_pair_pool_instant_price,
    get_combined_pair_pool_tokens,
} from './types/pool';
import { SwapDirection } from './types/swap';

export const find_all_paths = (
    pools: Map<string, CombinedPairPool>,
    from_token: string,
    to_token: string,
    max_path_length: number | undefined,
): PairPath[] => {
    const all_paths: [string, SwapDirection][][] = [];

    const used: [string, SwapDirection][] = [];
    const touched: string[] = [];
    for (const [key, pool] of pools) {
        const [token0, token1] = get_combined_pair_pool_tokens(pool);
        if (token0 === from_token) {
            used.push([key, { token_in: token0, token_out: token1 }]);
            touched.push(token0);
            const paths = inner_find_all_paths(pools, used, touched, token1, to_token, max_path_length);
            all_paths.push(...paths);
            used.pop();
        } else if (token1 === from_token) {
            used.push([key, { token_in: token1, token_out: token0 }]);
            touched.push(token1);
            const paths = inner_find_all_paths(pools, used, touched, token0, to_token, max_path_length);
            all_paths.push(...paths);
            used.pop();
        }
    }

    return all_paths.map((paths) => new PairPath(pools, from_token, to_token, paths));
};

const inner_find_all_paths = (
    pools: Map<string, CombinedPairPool>,
    used: [string, SwapDirection][],
    touched: string[],
    from_token: string,
    to_token: string,
    max_path_length: number | undefined,
): [string, SwapDirection][][] => {
    // console.debug(
    //     `pools: ${pools.size}, from: ${from_token}, to: ${to_token}, used: [${used.map((u) => `${u[0]}{${u[1].token_in}->${u[1].token_out}}`).join(', ')}]`,
    // );

    if (from_token === to_token) return [[...used]];

    if (max_path_length !== undefined && max_path_length <= used.length) return [];

    const all_paths: [string, SwapDirection][][] = [];
    for (const [key, pool] of pools) {
        if (used.find(([u]) => u === key)) continue; // skip

        const [token0, token1] = get_combined_pair_pool_tokens(pool);
        if (token0 === from_token) {
            if (touched.includes(token1)) continue;
            used.push([key, { token_in: token0, token_out: token1 }]);
            touched.push(token0);
            const paths = inner_find_all_paths(pools, used, touched, token1, to_token, max_path_length);
            all_paths.push(...paths);
            used.pop();
        } else if (token1 === from_token) {
            if (touched.includes(token1)) continue;
            used.push([key, { token_in: token1, token_out: token0 }]);
            touched.push(token1);
            const paths = inner_find_all_paths(pools, used, touched, token0, to_token, max_path_length);
            all_paths.push(...paths);
            used.pop();
        }
    }

    return all_paths;
};

export class PairPath {
    constructor(
        public readonly pools: Map<string, CombinedPairPool>,
        public readonly from_token: string,
        public readonly to_token: string,
        public readonly path: [string, SwapDirection][],
    ) {}

    public debug() {
        console.log('path >>>>>>>>>>>>>>>>');
        console.log(this.path);
        for (let i = 0; i < this.path.length; i++) {
            const [key, direction] = this.path[i];
            const pool = this.pools.get(key);

            console.log(`No.${i + 1} ${direction.token_in} -> ${direction.token_out}`);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            console.log(debug_combined_pair_pool(pool!));
        }
        console.log('path <<<<<<<<<<<<<<<<');
    }

    private clone() {
        const pools = new Map();
        for (const [key, pool] of this.pools) {
            pools.set(key, JSON.parse(JSON.stringify(pool)));
        }
        return new PairPath(pools, this.from_token, this.to_token, this.path);
    }

    public calculate(from_amount: bigint): PairSwapPath {
        const cloned = this.clone();
        // cloned.debug();
        return cloned._calculate(from_amount);
    }

    private _calculate(from_amount: bigint): PairSwapPath {
        const amounts: bigint[] = [];
        amounts.push(from_amount);

        let last_amount_in = from_amount;
        for (const [key, direction] of this.path) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const pool = this.pools.get(key)!;
            const amount = get_combined_pair_pool_amount_out(pool, last_amount_in, direction.token_in);
            last_amount_in = amount;
            amounts.push(amount);
        }

        const to_amount = amounts[amounts.length - 1];

        const average_price = BigNumber(to_amount).toNumber() / BigNumber(from_amount).toNumber();

        let instant_price = 1;
        for (const [key, direction] of this.path) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const pool = this.pools.get(key)!;
            instant_price *= get_combined_pair_pool_instant_price(pool, direction.token_in);
        }

        return {
            from_token: this.from_token,
            to_token: this.to_token,

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            path: this.path.map(([key, direction]) => ({ pool: this.pools.get(key)!, direction })),

            from_amount,
            to_amount,

            average_price,
            instant_price,
        };
    }
}
