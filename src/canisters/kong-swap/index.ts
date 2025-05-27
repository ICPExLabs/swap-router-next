import { bigint2string, getAnonymousActorCreator, unwrapRustResultMap } from '@choptop/haw';

import { KongswapPool, KongswapToken } from '../../types/ex/kongswap';
import { idlFactory } from './candid';
import type { _SERVICE } from './candid.d';

export const query_kongswap_tokens = async (canister_id: string): Promise<KongswapToken[]> => {
    const actor: _SERVICE = await getAnonymousActorCreator()(idlFactory, canister_id);
    const r = await actor.tokens([]);
    return unwrapRustResultMap(
        r,
        (r) => {
            return r
                .filter((r) => ('LP' in r ? !r.LP.is_removed : !r.IC.is_removed))
                .map(
                    (r): KongswapToken =>
                        'LP' in r
                            ? {
                                  LP: {
                                      token_id: r.LP.token_id,
                                      chain: r.LP.chain,
                                      address: r.LP.address,
                                      name: r.LP.name,
                                      symbol: r.LP.symbol,
                                      pool_id_of: r.LP.pool_id_of,
                                      decimals: r.LP.decimals,
                                      fee: bigint2string(r.LP.fee),
                                      total_supply: bigint2string(r.LP.total_supply),
                                      is_removed: r.LP.is_removed,
                                  },
                              }
                            : {
                                  IC: {
                                      token_id: r.IC.token_id,
                                      chain: r.IC.chain,
                                      canister_id: r.IC.canister_id,
                                      name: r.IC.name,
                                      symbol: r.IC.symbol,
                                      decimals: r.IC.decimals,
                                      fee: bigint2string(r.IC.fee),
                                      icrc1: r.IC.icrc1,
                                      icrc2: r.IC.icrc2,
                                      icrc3: r.IC.icrc3,
                                      is_removed: r.IC.is_removed,
                                  },
                              },
                );
        },
        () => [],
    );
};

export const query_kongswap_pools = async (canister_id: string): Promise<KongswapPool[]> => {
    const actor: _SERVICE = await getAnonymousActorCreator()(idlFactory, canister_id);
    const r = await actor.pools([]);
    return unwrapRustResultMap(
        r,
        (r) => {
            return r
                .filter((r) => !r.is_removed)
                .map(
                    (r): KongswapPool => ({
                        pool_id: r.pool_id,
                        name: r.name,
                        symbol: r.symbol,
                        chain_0: r.chain_0,
                        symbol_0: r.symbol_0,
                        address_0: r.address_0,
                        balance_0: bigint2string(r.balance_0),
                        lp_fee_0: bigint2string(r.lp_fee_0),
                        chain_1: r.chain_1,
                        symbol_1: r.symbol_1,
                        address_1: r.address_1,
                        balance_1: bigint2string(r.balance_1),
                        lp_fee_1: bigint2string(r.lp_fee_1),
                        price: r.price,
                        lp_fee_bps: r.lp_fee_bps,
                        lp_token_symbol: r.lp_token_symbol,
                        is_removed: r.is_removed,
                    }),
                );
        },
        () => [],
    );
};
