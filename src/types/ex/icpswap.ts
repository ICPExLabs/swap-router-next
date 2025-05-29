export interface IcpswapPool {
    key: string;
    canisterId: string;
    fee: string;
    tickSpacing: string;
    token0: {
        address: string;
        standard: string;
    };
    token1: {
        address: string;
        standard: string;
    };
}

export interface CombinedPairPoolIcpswap {
    anchor: string;
    pool: IcpswapPool;
}
