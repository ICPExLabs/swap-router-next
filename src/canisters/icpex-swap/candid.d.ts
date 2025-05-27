import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';
import type { Principal } from '@dfinity/principal';

export interface Account {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
}
export type Amm =
    | { 'swap_v2_1%': null }
    | { 'swap_v2_0.01%': null }
    | { 'swap_v2_0.05%': null }
    | { 'swap_v2_0.3%': null };
export interface ArchivedBlocks {
    canister_id: Principal;
    length: bigint;
    block_height_offset: bigint;
}
export type BlockChainArgs =
    | { BlockQuery: bigint }
    | { WasmModuleQuery: null }
    | { CurrentArchivingMaxLengthUpdate: bigint }
    | {
          ArchivedCanisterMaxMemorySizeBytesUpdate: {
              canister_id: Principal;
              max_memory_size_bytes: bigint;
          };
      }
    | { NextArchiveCanisterConfigUpdate: NextArchiveCanisterConfig }
    | { BlocksPush: null }
    | { CachedBlockQuery: null }
    | {
          ArchivedCanisterMaintainersUpdate: {
              maintainers: [] | [Principal[]];
              canister_id: Principal;
          };
      }
    | { WasmModuleUpdate: Uint8Array | number[] }
    | { BlockChainQuery: null };
export interface BlockChainView {
    current_archiving: [] | [CurrentArchiving];
    latest_block_hash: Uint8Array | number[];
    archive_config: NextArchiveCanisterConfig;
    next_block_index: bigint;
    archived: ArchivedBlocks[];
}
export interface BurnFee {
    fee: bigint;
    fee_to: Account;
}
export type BusinessError =
    | { InvalidTokenPair: [Principal, Principal] }
    | { TokenBlockChainLocked: null }
    | { TransferError: TransferError }
    | { NotSupportedToken: Principal }
    | { Swap: string }
    | { TokenPairAmmNotExist: TokenPairAmm }
    | { TokenPairAmmStillAlive: TokenPairAmm }
    | { TokenAccountsLocked: TokenAccount[] }
    | { SystemError: string }
    | { MemoTooLong: null }
    | { InsufficientBalance: { token: Principal; balance: bigint } }
    | { TokenPairAmmExist: TokenPairAmm }
    | { RequestTraceLocked: string }
    | { InvalidCreated: { created: bigint; system: bigint } }
    | { InvalidAmm: string }
    | { InvalidTransferFee: { fee: bigint; token: Principal } }
    | { SwapBlockChainLocked: null }
    | { TokenBlockChainError: string }
    | { TransferFromError: TransferFromError }
    | { TokenAccountsUnlocked: TokenAccount[] }
    | { FrozenToken: Principal }
    | { NotOwner: Principal }
    | { BadTransferFee: { expected_fee: bigint } }
    | { SwapBlockChainError: string }
    | { CallCanisterError: string }
    | { Liquidity: string }
    | { Expired: { deadline: bigint; system: bigint } };
export interface BusinessLocks {
    token: [] | [boolean];
    swap: [] | [boolean];
    balances: [] | [TokenAccount[]];
}
export interface CurrentArchiving {
    canister_id: Principal;
    length: bigint;
    max_length: bigint;
    block_height_offset: bigint;
}
export interface DepositToken {
    to: Account;
    token: Principal;
    from: Account;
    amount: bigint;
}
export interface FeeTo {
    token_fee_to: [] | [Account];
    swap_fee_to: [] | [Account];
}
export interface FeeToView {
    token_fee_to: boolean;
    swap_fee_to: boolean;
}
export interface InitArg {
    maintainers: [] | [Principal[]];
    schedule: [] | [bigint];
}
export interface InitArgV1 {
    maintainers: [] | [Principal[]];
    current_archiving_swap: [] | [CurrentArchiving];
    schedule: [] | [bigint];
    current_archiving_token: [] | [CurrentArchiving];
}
export type InitArgs = { V0: InitArg } | { V1: InitArgV1 };
export interface InnerLP {
    fee: bigint;
    decimals: number;
    dummy_canister_id: Principal;
    minimum_liquidity: bigint;
    total_supply: bigint;
}
export interface InnerLPView {
    fee: string;
    decimals: number;
    dummy_canister_id: string;
    minimum_liquidity: string;
    total_supply: string;
}
export interface MaintainArchives {
    recharged: [Principal, bigint][];
    checking_interval_ns: bigint;
    recharge_cycles: bigint;
    min_cycles_threshold: bigint;
    last_checked_timestamp: bigint;
}
export interface MaintainArchivesConfig {
    checking_interval_ns: bigint;
    recharge_cycles: bigint;
    min_cycles_threshold: bigint;
}
export type ManyTokenChangedResult = { Ok: TokenChangedResult[] } | { Err: BusinessError };
export interface MarketMaker {
    swap_v2: SwapV2MarketMaker;
}
export interface MarketMakerView {
    swap_v2: SwapV2MarketMakerView;
}
export interface NextArchiveCanisterConfig {
    maintainers: [] | [Principal[]];
    max_memory_size_bytes: [] | [bigint];
    max_length: bigint;
}
export interface OuterLP {
    fee: bigint;
    decimals: number;
    token_canister_id: Principal;
    minimum_liquidity: bigint;
    total_supply: bigint;
}
export interface OuterLPView {
    fee: string;
    decimals: number;
    token_canister_id: string;
    minimum_liquidity: string;
    total_supply: string;
}
export interface PairCreate {
    pa: TokenPairAmm;
    creator: Principal;
}
export interface PairCreateArgWithMeta {
    arg: TokenPairAmm;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface PairLiquidityAddArgWithMeta {
    arg: TokenPairLiquidityAddArg;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface PairLiquidityRemoveArgWithMeta {
    arg: TokenPairLiquidityRemoveArg;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export type PairOperation =
    | { remove: PairRemove }
    | { swap: PairSwapToken }
    | { swap_v2: SwapV2Operation }
    | { create: PairCreate };
export interface PairRemove {
    pa: TokenPairAmm;
    remover: Principal;
}
export interface PairSwapByLoanArgWithMeta {
    arg: TokenPairSwapByLoanArg;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface PairSwapExactTokensForTokensArgWithMeta {
    arg: TokenPairSwapExactTokensForTokensArg;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface PairSwapToken {
    to: Account;
    amm: Amm;
    token_a: Principal;
    token_b: Principal;
    from: Account;
    amount_a: bigint;
    amount_b: bigint;
}
export interface PairSwapTokensForExactTokensArgWithMeta {
    arg: TokenPairSwapTokensForExactTokensArg;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface PauseReason {
    timestamp_nanos: bigint;
    message: string;
}
export type Permission = { Permitted: string } | { Forbidden: string };
export type PermissionUpdatedArg =
    | {
          UpdateRolePermission: [string, [] | [string[]]];
      }
    | { UpdateUserPermission: [Principal, [] | [string[]]] }
    | { UpdateUserRole: [Principal, [] | [string[]]] };
export type PoolLp = { outer: OuterLP } | { inner: InnerLP };
export type PoolLpView = { outer: OuterLPView } | { inner: InnerLPView };
export interface PushBlocks {
    block_height_start: bigint;
    length: bigint;
}
export type QueryBlockResult = { archive: Principal } | { block: Uint8Array | number[] };
export type QuerySwapBlockResult = { archive: Principal } | { block: SwapBlock };
export type QueryTokenBlockResult = { archive: Principal } | { block: TokenBlock };
export type RequestArgs =
    | { token_block_push: null }
    | { token_deposit: TokenDepositArgWithMeta }
    | { pair_create: PairCreateArgWithMeta }
    | { token_custom_remove: TokenCustomRemoveArgWithMeta }
    | { canisters_maintaining: null }
    | {
          pair_swap_exact_tokens_for_tokens: PairSwapExactTokensForTokensArgWithMeta;
      }
    | { pair_liquidity_add: PairLiquidityAddArgWithMeta }
    | { token_custom_put: TokenCustomPutArgWithMeta }
    | { token_transfer: TokenTransferArgWithMeta }
    | { pair_swap_by_loan: PairSwapByLoanArgWithMeta }
    | { pair_liquidity_remove: PairLiquidityRemoveArgWithMeta }
    | {
          pair_swap_tokens_for_exact_tokens: PairSwapTokensForExactTokensArgWithMeta;
      }
    | { pair_remove: PairCreateArgWithMeta }
    | { swap_block_push: null }
    | { token_withdraw: TokenDepositArgWithMeta }
    | { token_frozen: TokenFrozenArgWithMeta };
export interface RequestTrace {
    created: bigint;
    args: RequestArgs;
    done: [] | [RequestTraceDone];
    traces: [bigint, string][];
    locks: BusinessLocks;
    index: bigint;
}
export interface RequestTraceDone {
    result: RequestTraceResult;
    done: bigint;
}
export type RequestTraceResult = { ok: string } | { err: string };
export type Result = { Ok: bigint } | { Err: BusinessError };
export interface SwapBlock {
    transaction: SwapTransaction;
    timestamp: bigint;
    parent_hash: Uint8Array | number[];
}
export type SwapBlockResponse =
    | { CachedBlock: [] | [[bigint, bigint]] }
    | { BlockChain: BlockChainView }
    | { ArchivedCanisterMaintainers: null }
    | { CurrentArchivingMaxLength: [] | [CurrentArchiving] }
    | { NextArchiveCanisterConfig: NextArchiveCanisterConfig }
    | { Block: QuerySwapBlockResult }
    | { WasmModule: [] | [Uint8Array | number[]] }
    | { BlocksPush: [] | [PushBlocks] }
    | { ArchivedCanisterMaxMemorySizeBytes: null };
export type SwapBlockResult = { Ok: SwapBlockResponse } | { Err: BusinessError };
export interface SwapOperation {
    pair: PairOperation;
}
export interface SwapRatio {
    numerator: number;
    denominator: number;
}
export interface SwapTokenPair {
    amm: string;
    token: [Principal, Principal];
}
export interface SwapTransaction {
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    operation: SwapOperation;
}
export interface SwapV2BurnToken {
    pa: TokenPairAmm;
    to: Account;
    fee: [] | [BurnFee];
    token: Principal;
    from: Account;
    amount0: bigint;
    amount1: bigint;
    token0: Principal;
    token1: Principal;
    amount: bigint;
}
export interface SwapV2MarketMaker {
    lp: PoolLp;
    price_cumulative_exponent: number;
    block_timestamp_last: bigint;
    reserve0: bigint;
    reserve1: bigint;
    subaccount: Uint8Array | number[];
    price1_cumulative_last: bigint;
    token0: Principal;
    token1: Principal;
    fee_rate: SwapRatio;
    k_last: bigint;
    protocol_fee: [] | [SwapRatio];
    price0_cumulative_last: bigint;
}
export interface SwapV2MarketMakerView {
    lp: PoolLpView;
    price_cumulative_exponent: number;
    block_timestamp_last: bigint;
    reserve0: string;
    reserve1: string;
    subaccount: string;
    price1_cumulative_last: string;
    token0: string;
    token1: string;
    fee_rate: string;
    k_last: string;
    protocol_fee: [] | [string];
    price0_cumulative_last: string;
}
export interface SwapV2MintFeeToken {
    pa: TokenPairAmm;
    to: Account;
    token: Principal;
    amount: bigint;
}
export interface SwapV2MintToken {
    pa: TokenPairAmm;
    to: Account;
    token: Principal;
    from: Account;
    amount0: bigint;
    amount1: bigint;
    token0: Principal;
    token1: Principal;
    amount: bigint;
}
export type SwapV2Operation =
    | { burn: SwapV2BurnToken }
    | { mint: SwapV2MintToken }
    | { mint_fee: SwapV2MintFeeToken }
    | { state: SwapV2State }
    | { transfer: SwapV2TransferToken };
export interface SwapV2State {
    pa: TokenPairAmm;
    price_cumulative_exponent: number;
    reserve0: bigint;
    reserve1: bigint;
    price0_cumulative: bigint;
    supply: bigint;
    block_timestamp: bigint;
    price1_cumulative: bigint;
}
export interface SwapV2TransferToken {
    pa: TokenPairAmm;
    to: Account;
    fee: [] | [BurnFee];
    token: Principal;
    from: Account;
    amount: bigint;
}
export interface TokenAccount {
    token: Principal;
    account: Account;
}
export interface TokenBlock {
    transaction: TokenTransaction;
    timestamp: bigint;
    parent_hash: Uint8Array | number[];
}
export type TokenBlockResponse =
    | { CachedBlock: [] | [[bigint, bigint]] }
    | { BlockChain: BlockChainView }
    | { ArchivedCanisterMaintainers: null }
    | { CurrentArchivingMaxLength: [] | [CurrentArchiving] }
    | { NextArchiveCanisterConfig: NextArchiveCanisterConfig }
    | { Block: QueryTokenBlockResult }
    | { WasmModule: [] | [Uint8Array | number[]] }
    | { BlocksPush: [] | [PushBlocks] }
    | { ArchivedCanisterMaxMemorySizeBytes: null };
export type TokenBlockResult = { Ok: TokenBlockResponse } | { Err: BusinessError };
export type TokenChangedResult = { Ok: bigint } | { Err: BusinessError };
export interface TokenCustomPutArgWithMeta {
    arg: TokenInfo;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface TokenCustomRemoveArgWithMeta {
    arg: Principal;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface TokenDepositArgWithMeta {
    arg: DepositToken;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface TokenDepositArgs {
    to: Account;
    fee: [] | [bigint];
    created: [] | [bigint];
    token: Principal;
    from: Account;
    memo: [] | [Uint8Array | number[]];
    deposit_amount_without_fee: bigint;
}
export interface TokenFrozenArg {
    token: Principal;
    frozen: boolean;
}
export interface TokenFrozenArgWithMeta {
    arg: TokenFrozenArg;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface TokenInfo {
    fee: bigint;
    decimals: number;
    name: string;
    canister_id: Principal;
    is_lp_token: boolean;
    symbol: string;
}
export type TokenOperation = { withdraw: DepositToken } | { deposit: DepositToken } | { transfer: TransferToken };
export interface TokenPair {
    token0: Principal;
    token1: Principal;
}
export interface TokenPairAmm {
    amm: Amm;
    pair: TokenPair;
}
export interface TokenPairCreateOrRemoveArgs {
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    pool: TokenPairPool;
}
export type TokenPairCreateOrRemoveResult = { Ok: MarketMakerView } | { Err: BusinessError };
export interface TokenPairLiquidityAddArg {
    pa: TokenPairAmm;
    to: Account;
    amount_a_min: bigint;
    token_a: Principal;
    token_b: Principal;
    self_canister: Principal;
    from: Account;
    amount_b_desired: bigint;
    amount_a_desired: bigint;
    amount_b_min: bigint;
}
export interface TokenPairLiquidityAddArgs {
    to: Account;
    created: [] | [bigint];
    from: Account;
    memo: [] | [Uint8Array | number[]];
    deadline: [] | [bigint];
    amount_desired: [bigint, bigint];
    amount_min: [bigint, bigint];
    swap_pair: SwapTokenPair;
}
export type TokenPairLiquidityAddResult =
    | {
          Ok: TokenPairLiquidityAddSuccess;
      }
    | { Err: BusinessError };
export interface TokenPairLiquidityAddSuccess {
    liquidity: bigint;
    amount: [bigint, bigint];
}
export interface TokenPairLiquidityRemoveArg {
    pa: TokenPairAmm;
    to: Account;
    fee: [] | [BurnFee];
    amount_a_min: bigint;
    token_a: Principal;
    token_b: Principal;
    self_canister: Principal;
    liquidity_without_fee: bigint;
    from: Account;
    amount_b_min: bigint;
}
export interface TokenPairLiquidityRemoveArgs {
    to: Account;
    created: [] | [bigint];
    liquidity_without_fee: bigint;
    from: Account;
    memo: [] | [Uint8Array | number[]];
    deadline: [] | [bigint];
    amount_min: [bigint, bigint];
    swap_pair: SwapTokenPair;
}
export type TokenPairLiquidityRemoveResult =
    | {
          Ok: TokenPairLiquidityRemoveSuccess;
      }
    | { Err: BusinessError };
export interface TokenPairLiquidityRemoveSuccess {
    amount: [bigint, bigint];
}
export interface TokenPairPool {
    amm: string;
    token0: Principal;
    token1: Principal;
}
export interface TokenPairSwapByLoanArg {
    to: Account;
    pas: TokenPairAmm[];
    self_canister: Principal;
    from: Account;
    loan: bigint;
    path: SwapTokenPair[];
}
export interface TokenPairSwapByLoanArgs {
    to: Account;
    created: [] | [bigint];
    from: Account;
    loan: bigint;
    memo: [] | [Uint8Array | number[]];
    path: SwapTokenPair[];
    deadline: [] | [bigint];
}
export interface TokenPairSwapExactTokensForTokensArg {
    to: Account;
    pas: TokenPairAmm[];
    self_canister: Principal;
    amount_out_min: bigint;
    from: Account;
    path: SwapTokenPair[];
    amount_in: bigint;
}
export interface TokenPairSwapExactTokensForTokensArgs {
    to: Account;
    created: [] | [bigint];
    amount_out_min: bigint;
    from: Account;
    memo: [] | [Uint8Array | number[]];
    path: SwapTokenPair[];
    deadline: [] | [bigint];
    amount_in: bigint;
}
export interface TokenPairSwapTokensForExactTokensArg {
    to: Account;
    pas: TokenPairAmm[];
    self_canister: Principal;
    from: Account;
    path: SwapTokenPair[];
    amount_out: bigint;
    amount_in_max: bigint;
}
export interface TokenPairSwapTokensForExactTokensArgs {
    to: Account;
    created: [] | [bigint];
    from: Account;
    memo: [] | [Uint8Array | number[]];
    path: SwapTokenPair[];
    deadline: [] | [bigint];
    amount_out: bigint;
    amount_in_max: bigint;
}
export type TokenPairSwapTokensResult = { Ok: TokenPairSwapTokensSuccess } | { Err: BusinessError };
export interface TokenPairSwapTokensSuccess {
    amounts: bigint[];
}
export interface TokenPairSwapWithDepositAndWithdrawArgs {
    to: Account;
    created: [] | [bigint];
    amount_out_min: bigint;
    from: Account;
    memo: [] | [Uint8Array | number[]];
    path: SwapTokenPair[];
    deadline: [] | [bigint];
    deposit_amount_without_fee: bigint;
    withdraw_fee: [] | [bigint];
    deposit_fee: [] | [bigint];
}
export interface TokenTransaction {
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    operation: TokenOperation;
}
export interface TokenTransferArgWithMeta {
    arg: TransferToken;
    now: bigint;
    created: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    caller: Principal;
}
export interface TokenTransferArgs {
    to: Account;
    fee: [] | [bigint];
    created: [] | [bigint];
    token: Principal;
    from: Account;
    memo: [] | [Uint8Array | number[]];
    transfer_amount_without_fee: bigint;
}
export interface TokenWithdrawArgs {
    to: Account;
    fee: [] | [bigint];
    created: [] | [bigint];
    token: Principal;
    from: Account;
    memo: [] | [Uint8Array | number[]];
    withdraw_amount_without_fee: bigint;
}
export interface TokenWithdrawManyArgs {
    args: TokenWithdrawArgs[];
}
export type TransferError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { BadBurn: { min_burn_amount: bigint } }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export type TransferFromError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { InsufficientAllowance: { allowance: bigint } }
    | { BadBurn: { min_burn_amount: bigint } }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface TransferToken {
    to: Account;
    fee: [] | [BurnFee];
    token: Principal;
    from: Account;
    amount: bigint;
}
export interface _SERVICE {
    __get_candid_interface_tmp_hack: ActorMethod<[], string>;
    block_swap_get: ActorMethod<[bigint], QuerySwapBlockResult>;
    block_token_get: ActorMethod<[bigint], QueryTokenBlockResult>;
    config_fee_to_query: ActorMethod<[], FeeTo>;
    config_fee_to_replace: ActorMethod<[FeeTo], FeeTo>;
    config_fee_to_view_query: ActorMethod<[], FeeToView>;
    config_maintain_archives_query: ActorMethod<[], MaintainArchives>;
    config_maintain_archives_set: ActorMethod<[MaintainArchivesConfig], undefined>;
    config_protocol_fee_replace: ActorMethod<[Uint8Array | number[], [] | [SwapRatio]], [] | [SwapRatio]>;
    config_swap_block_chain_query: ActorMethod<[BlockChainArgs], SwapBlockResult>;
    config_swap_block_chain_update: ActorMethod<[BlockChainArgs], SwapBlockResult>;
    config_token_block_chain_query: ActorMethod<[BlockChainArgs], TokenBlockResult>;
    config_token_block_chain_update: ActorMethod<[BlockChainArgs], TokenBlockResult>;
    config_token_custom_put: ActorMethod<[TokenInfo], undefined>;
    config_token_custom_query: ActorMethod<[], TokenInfo[]>;
    config_token_custom_remove: ActorMethod<[Principal], [] | [TokenInfo]>;
    config_token_frozen: ActorMethod<[TokenFrozenArg], undefined>;
    config_token_frozen_query: ActorMethod<[], Principal[]>;
    encoded_blocks_swap_get: ActorMethod<[bigint], [bigint, QueryBlockResult][]>;
    encoded_blocks_token_get: ActorMethod<[bigint], [bigint, QueryBlockResult][]>;
    memory_size_heap: ActorMethod<[], bigint>;
    memory_size_stable: ActorMethod<[], bigint>;
    pair_create: ActorMethod<[TokenPairCreateOrRemoveArgs], TokenPairCreateOrRemoveResult>;
    pair_liquidity_add: ActorMethod<[TokenPairLiquidityAddArgs, [] | [number]], TokenPairLiquidityAddResult>;
    pair_liquidity_remove: ActorMethod<[TokenPairLiquidityRemoveArgs, [] | [number]], TokenPairLiquidityRemoveResult>;
    pair_liquidity_remove_and_withdraw: ActorMethod<
        [TokenPairLiquidityRemoveArgs],
        [TokenPairLiquidityRemoveResult, [] | [ManyTokenChangedResult]]
    >;
    pair_liquidity_remove_and_withdraw_async: ActorMethod<
        [TokenPairLiquidityRemoveArgs],
        [TokenPairLiquidityRemoveResult, [] | [ManyTokenChangedResult]]
    >;
    pair_query: ActorMethod<[TokenPairPool], [] | [MarketMakerView]>;
    pair_remove: ActorMethod<[TokenPairCreateOrRemoveArgs], TokenPairCreateOrRemoveResult>;
    pair_swap_by_loan: ActorMethod<[TokenPairSwapByLoanArgs, [] | [number]], TokenPairSwapTokensResult>;
    pair_swap_exact_tokens_for_tokens: ActorMethod<
        [TokenPairSwapExactTokensForTokensArgs, [] | [number]],
        TokenPairSwapTokensResult
    >;
    pair_swap_tokens_for_exact_tokens: ActorMethod<
        [TokenPairSwapTokensForExactTokensArgs, [] | [number]],
        TokenPairSwapTokensResult
    >;
    pair_swap_with_deposit_and_withdraw: ActorMethod<
        [TokenPairSwapWithDepositAndWithdrawArgs],
        [TokenChangedResult, [] | [TokenPairSwapTokensResult], [] | [TokenChangedResult]]
    >;
    pair_swap_with_deposit_and_withdraw_async: ActorMethod<
        [TokenPairSwapWithDepositAndWithdrawArgs],
        [TokenChangedResult, [] | [TokenPairSwapTokensResult], [] | [TokenChangedResult]]
    >;
    pairs_query: ActorMethod<[], [TokenPairPool, MarketMakerView][]>;
    pairs_query_raw: ActorMethod<[], [TokenPairPool, MarketMaker][]>;
    pause_query: ActorMethod<[], boolean>;
    pause_query_reason: ActorMethod<[], [] | [PauseReason]>;
    pause_replace: ActorMethod<[[] | [string]], undefined>;
    permission_all: ActorMethod<[], Permission[]>;
    permission_assigned_by_user: ActorMethod<[Principal], [] | [Permission[]]>;
    permission_assigned_query: ActorMethod<[], [] | [Permission[]]>;
    permission_find_by_user: ActorMethod<[Principal], string[]>;
    permission_query: ActorMethod<[], string[]>;
    permission_roles_all: ActorMethod<[], [string, Permission[]][]>;
    permission_roles_by_user: ActorMethod<[Principal], [] | [string[]]>;
    permission_roles_query: ActorMethod<[], [] | [string[]]>;
    permission_update: ActorMethod<[PermissionUpdatedArg[]], undefined>;
    request_trace_get: ActorMethod<[bigint], [] | [RequestTrace]>;
    request_trace_index_get: ActorMethod<[], [bigint, bigint]>;
    request_trace_remove: ActorMethod<[bigint], [] | [RequestTrace]>;
    request_traces_get: ActorMethod<[bigint, bigint], ([] | [RequestTrace])[]>;
    request_traces_remove: ActorMethod<[bigint, bigint], ([] | [RequestTrace])[]>;
    schedule_find: ActorMethod<[], [] | [bigint]>;
    schedule_replace: ActorMethod<[[] | [bigint]], undefined>;
    schedule_trigger: ActorMethod<[], undefined>;
    token_balance: ActorMethod<[Principal, [] | [Uint8Array | number[]]], bigint>;
    token_balance_by: ActorMethod<[Principal, Account], bigint>;
    token_balance_of: ActorMethod<[Principal, Account], bigint>;
    token_deposit: ActorMethod<[TokenDepositArgs, [] | [number]], TokenChangedResult>;
    token_query: ActorMethod<[Principal], [] | [TokenInfo]>;
    token_transfer: ActorMethod<[TokenTransferArgs, [] | [number]], TokenChangedResult>;
    token_withdraw: ActorMethod<[TokenWithdrawArgs, [] | [number]], TokenChangedResult>;
    token_withdraw_many: ActorMethod<[TokenWithdrawManyArgs, [] | [number]], ManyTokenChangedResult>;
    tokens_balance: ActorMethod<[[] | [Uint8Array | number[]]], [Principal, bigint][]>;
    tokens_balance_by: ActorMethod<[Account], [Principal, bigint][]>;
    tokens_balance_of: ActorMethod<[Account], [Principal, bigint][]>;
    tokens_query: ActorMethod<[], TokenInfo[]>;
    updated: ActorMethod<[], bigint>;
    version: ActorMethod<[], number>;
    wallet_balance: ActorMethod<[], bigint>;
    wallet_receive: ActorMethod<[], bigint>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
