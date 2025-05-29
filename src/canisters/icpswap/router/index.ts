import { bigint2string, getAnonymousActorCreator, principal2string, unwrapMotokoResultMap } from '@choptop/haw';

import { IcpswapPool } from '../../../types/ex/icpswap';
import { idlFactory } from './candid';
import type { _SERVICE } from './candid.d';

export const query_icpswap_pools = async (canister_id: string): Promise<IcpswapPool[]> => {
    const actor: _SERVICE = await getAnonymousActorCreator()(idlFactory, canister_id);
    const r = await actor.getPools();
    return unwrapMotokoResultMap(
        r,
        (r) => {
            return r.map(
                (r): IcpswapPool => ({
                    key: r.key,
                    canisterId: principal2string(r.canisterId),
                    fee: bigint2string(r.fee),
                    tickSpacing: bigint2string(r.tickSpacing),
                    token0: {
                        address: r.token0.address,
                        standard: r.token0.standard,
                    },
                    token1: {
                        address: r.token1.address,
                        standard: r.token1.standard,
                    },
                }),
            );
        },
        () => [],
    );
};
