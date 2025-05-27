import { BigNumber } from 'bignumber.js';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export interface KongswapTokenLP {
    token_id: number;
    chain: string;
    address: string;
    name: string;
    symbol: string;
    pool_id_of: number;
    decimals: number;
    fee: string;
    total_supply: string;
    is_removed: boolean;
}
export interface KongswapTokenIC {
    token_id: number;
    chain: string;
    canister_id: string;
    name: string;
    symbol: string;
    decimals: number;
    fee: string;
    icrc1: boolean;
    icrc2: boolean;
    icrc3: boolean;
    is_removed: boolean;
}
export type KongswapToken = { LP: KongswapTokenLP } | { IC: KongswapTokenIC };
const get_token_address = (token: KongswapToken): string => {
    if ('LP' in token) return token.LP.address;
    if ('IC' in token) return token.IC.canister_id;
    throw new Error(`unknown token: ${JSON.stringify(token)}`);
};
const get_token_id = (token: KongswapToken): number => {
    if ('LP' in token) return token.LP.token_id;
    if ('IC' in token) return token.IC.token_id;
    throw new Error(`unknown token: ${JSON.stringify(token)}`);
};
const get_token_decimals = (token: KongswapToken): number => {
    if ('LP' in token) return token.LP.decimals;
    if ('IC' in token) return token.IC.decimals;
    throw new Error(`unknown token: ${JSON.stringify(token)}`);
};
const get_token_fee = (token: KongswapToken): string => {
    if ('LP' in token) return token.LP.fee;
    if ('IC' in token) return token.IC.fee;
    throw new Error(`unknown token: ${JSON.stringify(token)}`);
};
const get_token_is_removed = (token: KongswapToken): boolean => {
    if ('LP' in token) return token.LP.is_removed;
    if ('IC' in token) return token.IC.is_removed;
    throw new Error(`unknown token: ${JSON.stringify(token)}`);
};

export interface KongswapPool {
    pool_id: number;

    name: string;
    symbol: string;

    chain_0: string;
    symbol_0: string;
    address_0: string;
    balance_0: string;
    lp_fee_0: string;

    chain_1: string;
    symbol_1: string;
    address_1: string;
    balance_1: string;
    lp_fee_1: string;

    price: number;
    lp_fee_bps: number;
    lp_token_symbol: string;
    is_removed: boolean;
}

const nat_to_decimal_precision = (n: bigint, from_decimal_precision: number, to_decimal_precision: number): bigint => {
    if (from_decimal_precision === to_decimal_precision) return n;
    let nn = BigInt(`${n}`);
    if (from_decimal_precision < to_decimal_precision) {
        let decimal_diff = to_decimal_precision - from_decimal_precision;
        while (decimal_diff > 0) {
            nn *= 10n;
            decimal_diff -= 1;
        }
    } else {
        let decimal_diff = from_decimal_precision - to_decimal_precision;
        while (decimal_diff > 0) {
            nn /= 10n;
            decimal_diff -= 1;
        }
    }
    return nn;
};

// https://github.com/KongSwap/kong/blob/0f8aa2d6490ef8feda0fb091ee10aaab3a343686/src/kong_backend/src/swap/swap_amounts.rs#L463
const swap_amount_0 = (
    tokens: KongswapToken[],
    pool: KongswapPool,
    amount_0: bigint,
    user_fee_level: number | undefined,
    use_lp_fee: number | undefined,
    use_gas_fee: string | undefined,
): bigint => {
    // Token 0
    const token_0 = tokens.find((t) => get_token_address(t) === pool.address_0)!;
    const token_id_0 = get_token_id(token_0);
    // Token 1
    const token_1 = tokens.find((t) => get_token_address(t) === pool.address_1)!;
    const token_id_1 = get_token_id(token_1);

    const reserve_0 = BigInt(pool.balance_0) + BigInt(pool.lp_fee_0);
    const reserve_1 = BigInt(pool.balance_1) + BigInt(pool.lp_fee_1);
    if (reserve_0 <= 0n || reserve_1 <= 0n) return 0n;

    // convert amount_0 and pool balances to the max_decimals precision
    const max_decimals = Math.max(get_token_decimals(token_0), get_token_decimals(token_1));
    const reserve_0_in_max_decimals = nat_to_decimal_precision(reserve_0, get_token_decimals(token_0), max_decimals);
    const reserve_1_in_max_decimals = nat_to_decimal_precision(reserve_1, get_token_decimals(token_1), max_decimals);
    const amount_0_in_max_decimals = nat_to_decimal_precision(amount_0, get_token_decimals(token_0), max_decimals);

    // amount_1 = (amount_0 * reserve_1) / (reserve_0 + amount_0)
    let numerator_in_max_decimals = amount_0_in_max_decimals * reserve_1_in_max_decimals;
    const denominator_in_max_decimals = reserve_0_in_max_decimals + amount_0_in_max_decimals;
    const amount_1_in_max_decimals = numerator_in_max_decimals / denominator_in_max_decimals;

    // calculate the LP fees
    // any user fee discount. user.fee_level is 0 = 100% fee (no discount), 100 = 0% fee (max discount)
    // user_lp_fee_pct = 100 - user.fee_level
    const user_lp_fee_pct = 100n - (user_fee_level === undefined ? 0n : BigInt(`${user_fee_level}`));
    // user_lp_fee_bps = (user_lp_fee * user_lp_fee_pct) / 100 - user's fee level in bps with discount
    const user_lp_fee_bps =
        (user_lp_fee_pct * (use_lp_fee === undefined ? BigInt(pool.lp_fee_bps) : BigInt(`${use_lp_fee}`))) / 100n;
    // lp_fee_1 = (amount_1 * user_lp_fee_bps) / 10_000
    numerator_in_max_decimals = amount_1_in_max_decimals * user_lp_fee_bps;
    const lp_fee_1_in_max_decimals = numerator_in_max_decimals / 10000n;

    // convert amount_1 and lp_fee_1 from max_decimals to token_1 precision
    const amount_1 = nat_to_decimal_precision(amount_1_in_max_decimals, max_decimals, get_token_decimals(token_1));
    const lp_fee = nat_to_decimal_precision(lp_fee_1_in_max_decimals, max_decimals, get_token_decimals(token_1));
    const gas_fee = use_gas_fee === undefined ? BigInt(get_token_fee(token_1)) : BigInt(use_gas_fee);

    console.assert(token_id_0 !== 0);
    console.assert(token_id_1 !== 0);

    return amount_1 - lp_fee - gas_fee;
};

// https://github.com/KongSwap/kong/blob/0f8aa2d6490ef8feda0fb091ee10aaab3a343686/src/kong_backend/src/swap/swap_amounts.rs#L555
const swap_amount_1 = (
    tokens: KongswapToken[],
    pool: KongswapPool,
    amount_1: bigint,
    user_fee_level: number | undefined,
    use_lp_fee: number | undefined,
    use_gas_fee: string | undefined,
): bigint => {
    // Token 0
    const token_0 = tokens.find((t) => get_token_address(t) === pool.address_0)!;
    const token_id_0 = get_token_id(token_0);
    // Token 1
    const token_1 = tokens.find((t) => get_token_address(t) === pool.address_1)!;
    const token_id_1 = get_token_id(token_1);

    const reserve_0 = BigInt(pool.balance_0) + BigInt(pool.lp_fee_0);
    const reserve_1 = BigInt(pool.balance_1) + BigInt(pool.lp_fee_1);
    if (reserve_0 <= 0n || reserve_1 <= 0n) return 0n;

    // convert amount_0 and pool balances to the max_decimals precision
    const max_decimals = Math.max(get_token_decimals(token_0), get_token_decimals(token_1));
    const reserve_0_in_max_decimals = nat_to_decimal_precision(reserve_0, get_token_decimals(token_0), max_decimals);
    const reserve_1_in_max_decimals = nat_to_decimal_precision(reserve_1, get_token_decimals(token_1), max_decimals);
    const amount_1_in_max_decimals = nat_to_decimal_precision(amount_1, get_token_decimals(token_1), max_decimals);

    // amount_0 = (amount_1 * reserve_0) / (reserve_1 + amount_1)
    let numerator_in_max_decimals = amount_1_in_max_decimals * reserve_0_in_max_decimals;
    const denominator_in_max_decimals = reserve_1_in_max_decimals + amount_1_in_max_decimals;
    const amount_0_in_max_decimals = numerator_in_max_decimals / denominator_in_max_decimals;

    // calculate the LP fees
    // any user fee discount. user.fee_level is 0 = 100% fee (no discount), 100 = 0% fee (max discount)
    // user_lp_fee_pct = 100 - user.fee_level
    const user_lp_fee_pct = 100n - (user_fee_level === undefined ? 0n : BigInt(`${user_fee_level}`));
    // user_lp_fee_bps = (user_lp_fee * user_lp_fee_pct) / 100 - user's fee level in bps with discount
    const user_lp_fee_bps =
        (user_lp_fee_pct * (use_lp_fee === undefined ? BigInt(pool.lp_fee_bps) : BigInt(`${use_lp_fee}`))) / 100n;
    // lp_fee_1 = (amount_1 * user_lp_fee_bps) / 10_000
    numerator_in_max_decimals = amount_0_in_max_decimals * user_lp_fee_bps;
    const lp_fee_0_in_max_decimals = numerator_in_max_decimals / 10000n;

    // convert amount_0 and lp_fee_0 to token_0 precision
    const amount_0 = nat_to_decimal_precision(amount_0_in_max_decimals, max_decimals, get_token_decimals(token_0));
    const lp_fee = nat_to_decimal_precision(lp_fee_0_in_max_decimals, max_decimals, get_token_decimals(token_0));
    const gas_fee = use_gas_fee === undefined ? BigInt(get_token_fee(token_0)) : BigInt(use_gas_fee);

    console.assert(token_id_0 !== 0);
    console.assert(token_id_1 !== 0);

    return amount_0 - lp_fee - gas_fee;
};

const kongswap_pool_instant_price = (tokens: KongswapToken[], pool: KongswapPool, token_in: string): number => {
    const token_0 = tokens.find((t) => get_token_address(t) === pool.address_0)!;
    // const token_1 = tokens.find((t) => get_token_address(t) === pool.address_1)!;
    const reserve_0 = BigInt(pool.balance_0) + BigInt(pool.lp_fee_0);
    const reserve_1 = BigInt(pool.balance_1) + BigInt(pool.lp_fee_1);

    const [reserve_in, reserve_out] =
        token_in === get_token_address(token_0) ? [reserve_0, reserve_1] : [reserve_1, reserve_0];
    return BigNumber(reserve_out).toNumber() / BigNumber(reserve_in).toNumber();
};

export const get_combined_pair_pool_kongswap_amount_out = (
    tokens: KongswapToken[],
    user: KongswapUserReply,
    pool: KongswapPool,
    amount_in: bigint,
    token_in: string,
): bigint => {
    const token_0 = tokens.find((t) => get_token_address(t) === pool.address_0)!;

    return token_in === get_token_address(token_0)
        ? swap_amount_0(tokens, pool, amount_in, user.fee_level, undefined, undefined)
        : swap_amount_1(tokens, pool, amount_in, user.fee_level, undefined, undefined);
};

export const get_combined_pair_pool_kongswap_instant_price = (
    tokens: KongswapToken[],
    pool: KongswapPool,
    token_in: string,
): number => {
    return kongswap_pool_instant_price(tokens, pool, token_in);
};

export interface KongswapUserReply {
    user_id: number;
    principal_id: string;
    account_id: string;
    my_referral_code: string;
    referred_by?: string;
    referred_by_expires_at?: string;
    fee_level: number;
    fee_level_expires_at?: string;
}

export interface CombinedPairPoolKongswap {
    anchor: string;
    tokens: KongswapToken[];
    user: KongswapUserReply;
    pool: KongswapPool;
}

export const debug_combined_pair_pool_kongswap = (pool: CombinedPairPoolKongswap): string => {
    const token_0 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_0)!;
    const token_1 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_1)!;
    const reserve_0 = BigInt(pool.pool.balance_0) + BigInt(pool.pool.lp_fee_0);
    const reserve_1 = BigInt(pool.pool.balance_1) + BigInt(pool.pool.lp_fee_1);
    return `kongswap(${pool.anchor})_[${get_token_address(token_0)}][${get_token_address(token_1)}] { reserve0: ${reserve_0}, reserve1: ${reserve_1} }`;
};

export const get_combined_pair_pool_key_kongswap = (pool: CombinedPairPoolKongswap): string => {
    const token_0 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_0)!;
    const token_1 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_1)!;
    return `kongswap(${pool.anchor})_[${get_token_address(token_0)}][${get_token_address(token_1)}]#${pool.pool.pool_id}`;
};

export const is_combined_pair_pool_valid_kongswap = (pool: CombinedPairPoolKongswap): boolean => {
    const token_0 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_0);
    const token_1 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_1);
    if (token_0 === undefined || token_1 === undefined) return false;
    const reserve_0 = BigInt(pool.pool.balance_0) + BigInt(pool.pool.lp_fee_0);
    const reserve_1 = BigInt(pool.pool.balance_1) + BigInt(pool.pool.lp_fee_1);
    return !get_token_is_removed(token_0) && !get_token_is_removed(token_1) && 0n < reserve_0 && 0n < reserve_1;
};

export const get_combined_pair_pool_tokens_kongswap = (pool: CombinedPairPoolKongswap): [string, string] => {
    const token_0 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_0)!;
    const token_1 = pool.tokens.find((t) => get_token_address(t) === pool.pool.address_1)!;
    return [get_token_address(token_0), get_token_address(token_1)];
};
