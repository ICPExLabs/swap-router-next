import { bigint2string, getAnonymousActorCreator, principal2string, unwrapOption } from '@choptop/haw';

import { IcpexPairPool } from '../../../types/ex/icpex';
import { idlFactory } from './candid';
import type { _SERVICE } from './candid.d';

export const quote_icp_by_icp_swap = async (canister_id: string): Promise<IcpexPairPool[]> => {
    const actor: _SERVICE = await getAnonymousActorCreator()(idlFactory, canister_id);
    const r = await actor.pairs_query();
    return r
        .filter(([pool]) => pool.amm.startsWith('swap_v2'))
        .map(([pool, maker]) => ({
            swap_v2: [
                { token0: principal2string(pool.token0), token1: principal2string(pool.token1), amm: pool.amm },
                {
                    subaccount: maker.swap_v2.subaccount,
                    fee_rate: maker.swap_v2.fee_rate,

                    token0: maker.swap_v2.token0,
                    token1: maker.swap_v2.token1,
                    reserve0: maker.swap_v2.reserve0.replace(/_/g, ''),
                    reserve1: maker.swap_v2.reserve1.replace(/_/g, ''),
                    block_timestamp_last: bigint2string(maker.swap_v2.block_timestamp_last),

                    price_cumulative_exponent: maker.swap_v2.price_cumulative_exponent,
                    price0_cumulative_last: maker.swap_v2.price0_cumulative_last.replace(/_/g, ''),
                    price1_cumulative_last: maker.swap_v2.price1_cumulative_last.replace(/_/g, ''),
                    k_last: maker.swap_v2.k_last.replace(/_/g, ''),

                    lp: maker.swap_v2.lp,
                    protocol_fee: unwrapOption(maker.swap_v2.protocol_fee),
                },
            ],
        }));
};
