export const idlFactory = ({ IDL }: any) => {
    // const InitArg = IDL.Record({
    //     maintainers: IDL.Opt(IDL.Vec(IDL.Principal)),
    //     schedule: IDL.Opt(IDL.Nat),
    // });
    const CurrentArchiving = IDL.Record({
        canister_id: IDL.Principal,
        length: IDL.Nat64,
        max_length: IDL.Nat64,
        block_height_offset: IDL.Nat64,
    });
    // const InitArgV1 = IDL.Record({
    //     maintainers: IDL.Opt(IDL.Vec(IDL.Principal)),
    //     current_archiving_swap: IDL.Opt(CurrentArchiving),
    //     schedule: IDL.Opt(IDL.Nat),
    //     current_archiving_token: IDL.Opt(CurrentArchiving),
    // });
    // const InitArgs = IDL.Variant({ V0: InitArg, V1: InitArgV1 });
    const Amm = IDL.Variant({
        'swap_v2_1%': IDL.Null,
        'swap_v2_0.01%': IDL.Null,
        'swap_v2_0.05%': IDL.Null,
        'swap_v2_0.3%': IDL.Null,
    });
    const TokenPair = IDL.Record({
        token0: IDL.Principal,
        token1: IDL.Principal,
    });
    const TokenPairAmm = IDL.Record({ amm: Amm, pair: TokenPair });
    const PairRemove = IDL.Record({
        pa: TokenPairAmm,
        remover: IDL.Principal,
    });
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const PairSwapToken = IDL.Record({
        to: Account,
        amm: Amm,
        token_a: IDL.Principal,
        token_b: IDL.Principal,
        from: Account,
        amount_a: IDL.Nat,
        amount_b: IDL.Nat,
    });
    const BurnFee = IDL.Record({ fee: IDL.Nat, fee_to: Account });
    const SwapV2BurnToken = IDL.Record({
        pa: TokenPairAmm,
        to: Account,
        fee: IDL.Opt(BurnFee),
        token: IDL.Principal,
        from: Account,
        amount0: IDL.Nat,
        amount1: IDL.Nat,
        token0: IDL.Principal,
        token1: IDL.Principal,
        amount: IDL.Nat,
    });
    const SwapV2MintToken = IDL.Record({
        pa: TokenPairAmm,
        to: Account,
        token: IDL.Principal,
        from: Account,
        amount0: IDL.Nat,
        amount1: IDL.Nat,
        token0: IDL.Principal,
        token1: IDL.Principal,
        amount: IDL.Nat,
    });
    const SwapV2MintFeeToken = IDL.Record({
        pa: TokenPairAmm,
        to: Account,
        token: IDL.Principal,
        amount: IDL.Nat,
    });
    const SwapV2State = IDL.Record({
        pa: TokenPairAmm,
        price_cumulative_exponent: IDL.Nat8,
        reserve0: IDL.Nat,
        reserve1: IDL.Nat,
        price0_cumulative: IDL.Nat,
        supply: IDL.Nat,
        block_timestamp: IDL.Nat64,
        price1_cumulative: IDL.Nat,
    });
    const SwapV2TransferToken = IDL.Record({
        pa: TokenPairAmm,
        to: Account,
        fee: IDL.Opt(BurnFee),
        token: IDL.Principal,
        from: Account,
        amount: IDL.Nat,
    });
    const SwapV2Operation = IDL.Variant({
        burn: SwapV2BurnToken,
        mint: SwapV2MintToken,
        mint_fee: SwapV2MintFeeToken,
        state: SwapV2State,
        transfer: SwapV2TransferToken,
    });
    const PairCreate = IDL.Record({
        pa: TokenPairAmm,
        creator: IDL.Principal,
    });
    const PairOperation = IDL.Variant({
        remove: PairRemove,
        swap: PairSwapToken,
        swap_v2: SwapV2Operation,
        create: PairCreate,
    });
    const SwapOperation = IDL.Variant({ pair: PairOperation });
    const SwapTransaction = IDL.Record({
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        operation: SwapOperation,
    });
    const SwapBlock = IDL.Record({
        transaction: SwapTransaction,
        timestamp: IDL.Nat64,
        parent_hash: IDL.Vec(IDL.Nat8),
    });
    const QuerySwapBlockResult = IDL.Variant({
        archive: IDL.Principal,
        block: SwapBlock,
    });
    const DepositToken = IDL.Record({
        to: Account,
        token: IDL.Principal,
        from: Account,
        amount: IDL.Nat,
    });
    const TransferToken = IDL.Record({
        to: Account,
        fee: IDL.Opt(BurnFee),
        token: IDL.Principal,
        from: Account,
        amount: IDL.Nat,
    });
    const TokenOperation = IDL.Variant({
        withdraw: DepositToken,
        deposit: DepositToken,
        transfer: TransferToken,
    });
    const TokenTransaction = IDL.Record({
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        operation: TokenOperation,
    });
    const TokenBlock = IDL.Record({
        transaction: TokenTransaction,
        timestamp: IDL.Nat64,
        parent_hash: IDL.Vec(IDL.Nat8),
    });
    const QueryTokenBlockResult = IDL.Variant({
        archive: IDL.Principal,
        block: TokenBlock,
    });
    const FeeTo = IDL.Record({
        token_fee_to: IDL.Opt(Account),
        swap_fee_to: IDL.Opt(Account),
    });
    const FeeToView = IDL.Record({
        token_fee_to: IDL.Bool,
        swap_fee_to: IDL.Bool,
    });
    const MaintainArchives = IDL.Record({
        recharged: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat)),
        checking_interval_ns: IDL.Nat64,
        recharge_cycles: IDL.Nat64,
        min_cycles_threshold: IDL.Nat64,
        last_checked_timestamp: IDL.Nat64,
    });
    const MaintainArchivesConfig = IDL.Record({
        checking_interval_ns: IDL.Nat64,
        recharge_cycles: IDL.Nat64,
        min_cycles_threshold: IDL.Nat64,
    });
    const SwapRatio = IDL.Record({
        numerator: IDL.Nat32,
        denominator: IDL.Nat32,
    });
    const NextArchiveCanisterConfig = IDL.Record({
        maintainers: IDL.Opt(IDL.Vec(IDL.Principal)),
        max_memory_size_bytes: IDL.Opt(IDL.Nat64),
        max_length: IDL.Nat64,
    });
    const BlockChainArgs = IDL.Variant({
        BlockQuery: IDL.Nat64,
        WasmModuleQuery: IDL.Null,
        CurrentArchivingMaxLengthUpdate: IDL.Nat64,
        ArchivedCanisterMaxMemorySizeBytesUpdate: IDL.Record({
            canister_id: IDL.Principal,
            max_memory_size_bytes: IDL.Nat64,
        }),
        NextArchiveCanisterConfigUpdate: NextArchiveCanisterConfig,
        BlocksPush: IDL.Null,
        CachedBlockQuery: IDL.Null,
        ArchivedCanisterMaintainersUpdate: IDL.Record({
            maintainers: IDL.Opt(IDL.Vec(IDL.Principal)),
            canister_id: IDL.Principal,
        }),
        WasmModuleUpdate: IDL.Vec(IDL.Nat8),
        BlockChainQuery: IDL.Null,
    });
    const ArchivedBlocks = IDL.Record({
        canister_id: IDL.Principal,
        length: IDL.Nat64,
        block_height_offset: IDL.Nat64,
    });
    const BlockChainView = IDL.Record({
        current_archiving: IDL.Opt(CurrentArchiving),
        latest_block_hash: IDL.Vec(IDL.Nat8),
        archive_config: NextArchiveCanisterConfig,
        next_block_index: IDL.Nat64,
        archived: IDL.Vec(ArchivedBlocks),
    });
    const PushBlocks = IDL.Record({
        block_height_start: IDL.Nat64,
        length: IDL.Nat64,
    });
    const SwapBlockResponse = IDL.Variant({
        CachedBlock: IDL.Opt(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        BlockChain: BlockChainView,
        ArchivedCanisterMaintainers: IDL.Null,
        CurrentArchivingMaxLength: IDL.Opt(CurrentArchiving),
        NextArchiveCanisterConfig: NextArchiveCanisterConfig,
        Block: QuerySwapBlockResult,
        WasmModule: IDL.Opt(IDL.Vec(IDL.Nat8)),
        BlocksPush: IDL.Opt(PushBlocks),
        ArchivedCanisterMaxMemorySizeBytes: IDL.Null,
    });
    const TransferError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat,
        }),
        TemporarilyUnavailable: IDL.Null,
        BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
    });
    const TokenAccount = IDL.Record({
        token: IDL.Principal,
        account: Account,
    });
    const TransferFromError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat,
        }),
        TemporarilyUnavailable: IDL.Null,
        InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
        BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
    });
    const BusinessError = IDL.Variant({
        InvalidTokenPair: IDL.Tuple(IDL.Principal, IDL.Principal),
        TokenBlockChainLocked: IDL.Null,
        TransferError: TransferError,
        NotSupportedToken: IDL.Principal,
        Swap: IDL.Text,
        TokenPairAmmNotExist: TokenPairAmm,
        TokenPairAmmStillAlive: TokenPairAmm,
        TokenAccountsLocked: IDL.Vec(TokenAccount),
        SystemError: IDL.Text,
        MemoTooLong: IDL.Null,
        InsufficientBalance: IDL.Record({
            token: IDL.Principal,
            balance: IDL.Nat,
        }),
        TokenPairAmmExist: TokenPairAmm,
        RequestTraceLocked: IDL.Text,
        InvalidCreated: IDL.Record({
            created: IDL.Nat64,
            system: IDL.Nat64,
        }),
        InvalidAmm: IDL.Text,
        InvalidTransferFee: IDL.Record({
            fee: IDL.Nat,
            token: IDL.Principal,
        }),
        SwapBlockChainLocked: IDL.Null,
        TokenBlockChainError: IDL.Text,
        TransferFromError: TransferFromError,
        TokenAccountsUnlocked: IDL.Vec(TokenAccount),
        FrozenToken: IDL.Principal,
        NotOwner: IDL.Principal,
        BadTransferFee: IDL.Record({ expected_fee: IDL.Nat }),
        SwapBlockChainError: IDL.Text,
        CallCanisterError: IDL.Text,
        Liquidity: IDL.Text,
        Expired: IDL.Record({ deadline: IDL.Nat64, system: IDL.Nat64 }),
    });
    const SwapBlockResult = IDL.Variant({
        Ok: SwapBlockResponse,
        Err: BusinessError,
    });
    const TokenBlockResponse = IDL.Variant({
        CachedBlock: IDL.Opt(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
        BlockChain: BlockChainView,
        ArchivedCanisterMaintainers: IDL.Null,
        CurrentArchivingMaxLength: IDL.Opt(CurrentArchiving),
        NextArchiveCanisterConfig: NextArchiveCanisterConfig,
        Block: QueryTokenBlockResult,
        WasmModule: IDL.Opt(IDL.Vec(IDL.Nat8)),
        BlocksPush: IDL.Opt(PushBlocks),
        ArchivedCanisterMaxMemorySizeBytes: IDL.Null,
    });
    const TokenBlockResult = IDL.Variant({
        Ok: TokenBlockResponse,
        Err: BusinessError,
    });
    const TokenInfo = IDL.Record({
        fee: IDL.Nat,
        decimals: IDL.Nat8,
        name: IDL.Text,
        canister_id: IDL.Principal,
        is_lp_token: IDL.Bool,
        symbol: IDL.Text,
    });
    const TokenFrozenArg = IDL.Record({
        token: IDL.Principal,
        frozen: IDL.Bool,
    });
    const QueryBlockResult = IDL.Variant({
        archive: IDL.Principal,
        block: IDL.Vec(IDL.Nat8),
    });
    const TokenPairPool = IDL.Record({
        amm: IDL.Text,
        token0: IDL.Principal,
        token1: IDL.Principal,
    });
    const TokenPairCreateOrRemoveArgs = IDL.Record({
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        pool: TokenPairPool,
    });
    const OuterLPView = IDL.Record({
        fee: IDL.Text,
        decimals: IDL.Nat8,
        token_canister_id: IDL.Text,
        minimum_liquidity: IDL.Text,
        total_supply: IDL.Text,
    });
    const InnerLPView = IDL.Record({
        fee: IDL.Text,
        decimals: IDL.Nat8,
        dummy_canister_id: IDL.Text,
        minimum_liquidity: IDL.Text,
        total_supply: IDL.Text,
    });
    const PoolLpView = IDL.Variant({
        outer: OuterLPView,
        inner: InnerLPView,
    });
    const SwapV2MarketMakerView = IDL.Record({
        lp: PoolLpView,
        price_cumulative_exponent: IDL.Nat8,
        block_timestamp_last: IDL.Nat64,
        reserve0: IDL.Text,
        reserve1: IDL.Text,
        subaccount: IDL.Text,
        price1_cumulative_last: IDL.Text,
        token0: IDL.Text,
        token1: IDL.Text,
        fee_rate: IDL.Text,
        k_last: IDL.Text,
        protocol_fee: IDL.Opt(IDL.Text),
        price0_cumulative_last: IDL.Text,
    });
    const MarketMakerView = IDL.Variant({ swap_v2: SwapV2MarketMakerView });
    const TokenPairCreateOrRemoveResult = IDL.Variant({
        Ok: MarketMakerView,
        Err: BusinessError,
    });
    const SwapTokenPair = IDL.Record({
        amm: IDL.Text,
        token: IDL.Tuple(IDL.Principal, IDL.Principal),
    });
    const TokenPairLiquidityAddArgs = IDL.Record({
        to: Account,
        created: IDL.Opt(IDL.Nat64),
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        deadline: IDL.Opt(IDL.Nat64),
        amount_desired: IDL.Tuple(IDL.Nat, IDL.Nat),
        amount_min: IDL.Tuple(IDL.Nat, IDL.Nat),
        swap_pair: SwapTokenPair,
    });
    const TokenPairLiquidityAddSuccess = IDL.Record({
        liquidity: IDL.Nat,
        amount: IDL.Tuple(IDL.Nat, IDL.Nat),
    });
    const TokenPairLiquidityAddResult = IDL.Variant({
        Ok: TokenPairLiquidityAddSuccess,
        Err: BusinessError,
    });
    const TokenPairLiquidityRemoveArgs = IDL.Record({
        to: Account,
        created: IDL.Opt(IDL.Nat64),
        liquidity_without_fee: IDL.Nat,
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        deadline: IDL.Opt(IDL.Nat64),
        amount_min: IDL.Tuple(IDL.Nat, IDL.Nat),
        swap_pair: SwapTokenPair,
    });
    const TokenPairLiquidityRemoveSuccess = IDL.Record({
        amount: IDL.Tuple(IDL.Nat, IDL.Nat),
    });
    const TokenPairLiquidityRemoveResult = IDL.Variant({
        Ok: TokenPairLiquidityRemoveSuccess,
        Err: BusinessError,
    });
    const TokenChangedResult = IDL.Variant({
        Ok: IDL.Nat,
        Err: BusinessError,
    });
    const ManyTokenChangedResult = IDL.Variant({
        Ok: IDL.Vec(TokenChangedResult),
        Err: BusinessError,
    });
    const TokenPairSwapByLoanArgs = IDL.Record({
        to: Account,
        created: IDL.Opt(IDL.Nat64),
        from: Account,
        loan: IDL.Nat,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        path: IDL.Vec(SwapTokenPair),
        deadline: IDL.Opt(IDL.Nat64),
    });
    const TokenPairSwapTokensSuccess = IDL.Record({
        amounts: IDL.Vec(IDL.Nat),
    });
    const TokenPairSwapTokensResult = IDL.Variant({
        Ok: TokenPairSwapTokensSuccess,
        Err: BusinessError,
    });
    const TokenPairSwapExactTokensForTokensArgs = IDL.Record({
        to: Account,
        created: IDL.Opt(IDL.Nat64),
        amount_out_min: IDL.Nat,
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        path: IDL.Vec(SwapTokenPair),
        deadline: IDL.Opt(IDL.Nat64),
        amount_in: IDL.Nat,
    });
    const TokenPairSwapTokensForExactTokensArgs = IDL.Record({
        to: Account,
        created: IDL.Opt(IDL.Nat64),
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        path: IDL.Vec(SwapTokenPair),
        deadline: IDL.Opt(IDL.Nat64),
        amount_out: IDL.Nat,
        amount_in_max: IDL.Nat,
    });
    const TokenPairSwapWithDepositAndWithdrawArgs = IDL.Record({
        to: Account,
        created: IDL.Opt(IDL.Nat64),
        amount_out_min: IDL.Nat,
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        path: IDL.Vec(SwapTokenPair),
        deadline: IDL.Opt(IDL.Nat64),
        deposit_amount_without_fee: IDL.Nat,
        withdraw_fee: IDL.Opt(IDL.Nat),
        deposit_fee: IDL.Opt(IDL.Nat),
    });
    const OuterLP = IDL.Record({
        fee: IDL.Nat,
        decimals: IDL.Nat8,
        token_canister_id: IDL.Principal,
        minimum_liquidity: IDL.Nat,
        total_supply: IDL.Nat,
    });
    const InnerLP = IDL.Record({
        fee: IDL.Nat,
        decimals: IDL.Nat8,
        dummy_canister_id: IDL.Principal,
        minimum_liquidity: IDL.Nat,
        total_supply: IDL.Nat,
    });
    const PoolLp = IDL.Variant({ outer: OuterLP, inner: InnerLP });
    const SwapV2MarketMaker = IDL.Record({
        lp: PoolLp,
        price_cumulative_exponent: IDL.Nat8,
        block_timestamp_last: IDL.Nat64,
        reserve0: IDL.Nat,
        reserve1: IDL.Nat,
        subaccount: IDL.Vec(IDL.Nat8),
        price1_cumulative_last: IDL.Nat,
        token0: IDL.Principal,
        token1: IDL.Principal,
        fee_rate: SwapRatio,
        k_last: IDL.Nat,
        protocol_fee: IDL.Opt(SwapRatio),
        price0_cumulative_last: IDL.Nat,
    });
    const MarketMaker = IDL.Variant({ swap_v2: SwapV2MarketMaker });
    const PauseReason = IDL.Record({
        timestamp_nanos: IDL.Int,
        message: IDL.Text,
    });
    const Permission = IDL.Variant({
        Permitted: IDL.Text,
        Forbidden: IDL.Text,
    });
    const PermissionUpdatedArg = IDL.Variant({
        UpdateRolePermission: IDL.Tuple(IDL.Text, IDL.Opt(IDL.Vec(IDL.Text))),
        UpdateUserPermission: IDL.Tuple(IDL.Principal, IDL.Opt(IDL.Vec(IDL.Text))),
        UpdateUserRole: IDL.Tuple(IDL.Principal, IDL.Opt(IDL.Vec(IDL.Text))),
    });
    const TokenDepositArgWithMeta = IDL.Record({
        arg: DepositToken,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const PairCreateArgWithMeta = IDL.Record({
        arg: TokenPairAmm,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenCustomRemoveArgWithMeta = IDL.Record({
        arg: IDL.Principal,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenPairSwapExactTokensForTokensArg = IDL.Record({
        to: Account,
        pas: IDL.Vec(TokenPairAmm),
        self_canister: IDL.Principal,
        amount_out_min: IDL.Nat,
        from: Account,
        path: IDL.Vec(SwapTokenPair),
        amount_in: IDL.Nat,
    });
    const PairSwapExactTokensForTokensArgWithMeta = IDL.Record({
        arg: TokenPairSwapExactTokensForTokensArg,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenPairLiquidityAddArg = IDL.Record({
        pa: TokenPairAmm,
        to: Account,
        amount_a_min: IDL.Nat,
        token_a: IDL.Principal,
        token_b: IDL.Principal,
        self_canister: IDL.Principal,
        from: Account,
        amount_b_desired: IDL.Nat,
        amount_a_desired: IDL.Nat,
        amount_b_min: IDL.Nat,
    });
    const PairLiquidityAddArgWithMeta = IDL.Record({
        arg: TokenPairLiquidityAddArg,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenCustomPutArgWithMeta = IDL.Record({
        arg: TokenInfo,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenTransferArgWithMeta = IDL.Record({
        arg: TransferToken,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenPairSwapByLoanArg = IDL.Record({
        to: Account,
        pas: IDL.Vec(TokenPairAmm),
        self_canister: IDL.Principal,
        from: Account,
        loan: IDL.Nat,
        path: IDL.Vec(SwapTokenPair),
    });
    const PairSwapByLoanArgWithMeta = IDL.Record({
        arg: TokenPairSwapByLoanArg,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenPairLiquidityRemoveArg = IDL.Record({
        pa: TokenPairAmm,
        to: Account,
        fee: IDL.Opt(BurnFee),
        amount_a_min: IDL.Nat,
        token_a: IDL.Principal,
        token_b: IDL.Principal,
        self_canister: IDL.Principal,
        liquidity_without_fee: IDL.Nat,
        from: Account,
        amount_b_min: IDL.Nat,
    });
    const PairLiquidityRemoveArgWithMeta = IDL.Record({
        arg: TokenPairLiquidityRemoveArg,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenPairSwapTokensForExactTokensArg = IDL.Record({
        to: Account,
        pas: IDL.Vec(TokenPairAmm),
        self_canister: IDL.Principal,
        from: Account,
        path: IDL.Vec(SwapTokenPair),
        amount_out: IDL.Nat,
        amount_in_max: IDL.Nat,
    });
    const PairSwapTokensForExactTokensArgWithMeta = IDL.Record({
        arg: TokenPairSwapTokensForExactTokensArg,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const TokenFrozenArgWithMeta = IDL.Record({
        arg: TokenFrozenArg,
        now: IDL.Nat64,
        created: IDL.Opt(IDL.Nat64),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        caller: IDL.Principal,
    });
    const RequestArgs = IDL.Variant({
        token_block_push: IDL.Null,
        token_deposit: TokenDepositArgWithMeta,
        pair_create: PairCreateArgWithMeta,
        token_custom_remove: TokenCustomRemoveArgWithMeta,
        canisters_maintaining: IDL.Null,
        pair_swap_exact_tokens_for_tokens: PairSwapExactTokensForTokensArgWithMeta,
        pair_liquidity_add: PairLiquidityAddArgWithMeta,
        token_custom_put: TokenCustomPutArgWithMeta,
        token_transfer: TokenTransferArgWithMeta,
        pair_swap_by_loan: PairSwapByLoanArgWithMeta,
        pair_liquidity_remove: PairLiquidityRemoveArgWithMeta,
        pair_swap_tokens_for_exact_tokens: PairSwapTokensForExactTokensArgWithMeta,
        pair_remove: PairCreateArgWithMeta,
        swap_block_push: IDL.Null,
        token_withdraw: TokenDepositArgWithMeta,
        token_frozen: TokenFrozenArgWithMeta,
    });
    const RequestTraceResult = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
    const RequestTraceDone = IDL.Record({
        result: RequestTraceResult,
        done: IDL.Nat64,
    });
    const BusinessLocks = IDL.Record({
        token: IDL.Opt(IDL.Bool),
        swap: IDL.Opt(IDL.Bool),
        balances: IDL.Opt(IDL.Vec(TokenAccount)),
    });
    const RequestTrace = IDL.Record({
        created: IDL.Nat64,
        args: RequestArgs,
        done: IDL.Opt(RequestTraceDone),
        traces: IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Text)),
        locks: BusinessLocks,
        index: IDL.Nat64,
    });
    const TokenDepositArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        created: IDL.Opt(IDL.Nat64),
        token: IDL.Principal,
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        deposit_amount_without_fee: IDL.Nat,
    });
    const TokenTransferArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        created: IDL.Opt(IDL.Nat64),
        token: IDL.Principal,
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        transfer_amount_without_fee: IDL.Nat,
    });
    const TokenWithdrawArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        created: IDL.Opt(IDL.Nat64),
        token: IDL.Principal,
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        withdraw_amount_without_fee: IDL.Nat,
    });
    const TokenWithdrawManyArgs = IDL.Record({
        args: IDL.Vec(TokenWithdrawArgs),
    });
    return IDL.Service({
        __get_candid_interface_tmp_hack: IDL.Func([], [IDL.Text], ['query']),
        block_swap_get: IDL.Func([IDL.Nat64], [QuerySwapBlockResult], ['query']),
        block_token_get: IDL.Func([IDL.Nat64], [QueryTokenBlockResult], ['query']),
        config_fee_to_query: IDL.Func([], [FeeTo], ['query']),
        config_fee_to_replace: IDL.Func([FeeTo], [FeeTo], []),
        config_fee_to_view_query: IDL.Func([], [FeeToView], ['query']),
        config_maintain_archives_query: IDL.Func([], [MaintainArchives], ['query']),
        config_maintain_archives_set: IDL.Func([MaintainArchivesConfig], [], []),
        config_protocol_fee_replace: IDL.Func([IDL.Vec(IDL.Nat8), IDL.Opt(SwapRatio)], [IDL.Opt(SwapRatio)], []),
        config_swap_block_chain_query: IDL.Func([BlockChainArgs], [SwapBlockResult], ['query']),
        config_swap_block_chain_update: IDL.Func([BlockChainArgs], [SwapBlockResult], []),
        config_token_block_chain_query: IDL.Func([BlockChainArgs], [TokenBlockResult], ['query']),
        config_token_block_chain_update: IDL.Func([BlockChainArgs], [TokenBlockResult], []),
        config_token_custom_put: IDL.Func([TokenInfo], [], []),
        config_token_custom_query: IDL.Func([], [IDL.Vec(TokenInfo)], ['query']),
        config_token_custom_remove: IDL.Func([IDL.Principal], [IDL.Opt(TokenInfo)], []),
        config_token_frozen: IDL.Func([TokenFrozenArg], [], []),
        config_token_frozen_query: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        encoded_blocks_swap_get: IDL.Func([IDL.Nat64], [IDL.Vec(IDL.Tuple(IDL.Nat64, QueryBlockResult))], ['query']),
        encoded_blocks_token_get: IDL.Func([IDL.Nat64], [IDL.Vec(IDL.Tuple(IDL.Nat64, QueryBlockResult))], ['query']),
        memory_size_heap: IDL.Func([], [IDL.Nat], ['query']),
        memory_size_stable: IDL.Func([], [IDL.Nat], ['query']),
        pair_create: IDL.Func([TokenPairCreateOrRemoveArgs], [TokenPairCreateOrRemoveResult], []),
        pair_liquidity_add: IDL.Func([TokenPairLiquidityAddArgs, IDL.Opt(IDL.Nat8)], [TokenPairLiquidityAddResult], []),
        pair_liquidity_remove: IDL.Func(
            [TokenPairLiquidityRemoveArgs, IDL.Opt(IDL.Nat8)],
            [TokenPairLiquidityRemoveResult],
            [],
        ),
        pair_liquidity_remove_and_withdraw: IDL.Func(
            [TokenPairLiquidityRemoveArgs],
            [TokenPairLiquidityRemoveResult, IDL.Opt(ManyTokenChangedResult)],
            [],
        ),
        pair_liquidity_remove_and_withdraw_async: IDL.Func(
            [TokenPairLiquidityRemoveArgs],
            [TokenPairLiquidityRemoveResult, IDL.Opt(ManyTokenChangedResult)],
            [],
        ),
        pair_query: IDL.Func([TokenPairPool], [IDL.Opt(MarketMakerView)], ['query']),
        pair_remove: IDL.Func([TokenPairCreateOrRemoveArgs], [TokenPairCreateOrRemoveResult], []),
        pair_swap_by_loan: IDL.Func([TokenPairSwapByLoanArgs, IDL.Opt(IDL.Nat8)], [TokenPairSwapTokensResult], []),
        pair_swap_exact_tokens_for_tokens: IDL.Func(
            [TokenPairSwapExactTokensForTokensArgs, IDL.Opt(IDL.Nat8)],
            [TokenPairSwapTokensResult],
            [],
        ),
        pair_swap_tokens_for_exact_tokens: IDL.Func(
            [TokenPairSwapTokensForExactTokensArgs, IDL.Opt(IDL.Nat8)],
            [TokenPairSwapTokensResult],
            [],
        ),
        pair_swap_with_deposit_and_withdraw: IDL.Func(
            [TokenPairSwapWithDepositAndWithdrawArgs],
            [TokenChangedResult, IDL.Opt(TokenPairSwapTokensResult), IDL.Opt(TokenChangedResult)],
            [],
        ),
        pair_swap_with_deposit_and_withdraw_async: IDL.Func(
            [TokenPairSwapWithDepositAndWithdrawArgs],
            [TokenChangedResult, IDL.Opt(TokenPairSwapTokensResult), IDL.Opt(TokenChangedResult)],
            [],
        ),
        pairs_query: IDL.Func([], [IDL.Vec(IDL.Tuple(TokenPairPool, MarketMakerView))], ['query']),
        pairs_query_raw: IDL.Func([], [IDL.Vec(IDL.Tuple(TokenPairPool, MarketMaker))], ['query']),
        pause_query: IDL.Func([], [IDL.Bool], ['query']),
        pause_query_reason: IDL.Func([], [IDL.Opt(PauseReason)], ['query']),
        pause_replace: IDL.Func([IDL.Opt(IDL.Text)], [], []),
        permission_all: IDL.Func([], [IDL.Vec(Permission)], ['query']),
        permission_assigned_by_user: IDL.Func([IDL.Principal], [IDL.Opt(IDL.Vec(Permission))], ['query']),
        permission_assigned_query: IDL.Func([], [IDL.Opt(IDL.Vec(Permission))], ['query']),
        permission_find_by_user: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Text)], ['query']),
        permission_query: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
        permission_roles_all: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(Permission)))], ['query']),
        permission_roles_by_user: IDL.Func([IDL.Principal], [IDL.Opt(IDL.Vec(IDL.Text))], ['query']),
        permission_roles_query: IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Text))], ['query']),
        permission_update: IDL.Func([IDL.Vec(PermissionUpdatedArg)], [], []),
        request_trace_get: IDL.Func([IDL.Nat64], [IDL.Opt(RequestTrace)], ['query']),
        request_trace_index_get: IDL.Func([], [IDL.Nat64, IDL.Nat64], ['query']),
        request_trace_remove: IDL.Func([IDL.Nat64], [IDL.Opt(RequestTrace)], []),
        request_traces_get: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(IDL.Opt(RequestTrace))], ['query']),
        request_traces_remove: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(IDL.Opt(RequestTrace))], []),
        schedule_find: IDL.Func([], [IDL.Opt(IDL.Nat64)], ['query']),
        schedule_replace: IDL.Func([IDL.Opt(IDL.Nat64)], [], []),
        schedule_trigger: IDL.Func([], [], []),
        token_balance: IDL.Func([IDL.Principal, IDL.Opt(IDL.Vec(IDL.Nat8))], [IDL.Nat], ['query']),
        token_balance_by: IDL.Func([IDL.Principal, Account], [IDL.Nat], ['query']),
        token_balance_of: IDL.Func([IDL.Principal, Account], [IDL.Nat], ['query']),
        token_deposit: IDL.Func([TokenDepositArgs, IDL.Opt(IDL.Nat8)], [TokenChangedResult], []),
        token_query: IDL.Func([IDL.Principal], [IDL.Opt(TokenInfo)], ['query']),
        token_transfer: IDL.Func([TokenTransferArgs, IDL.Opt(IDL.Nat8)], [TokenChangedResult], []),
        token_withdraw: IDL.Func([TokenWithdrawArgs, IDL.Opt(IDL.Nat8)], [TokenChangedResult], []),
        token_withdraw_many: IDL.Func([TokenWithdrawManyArgs, IDL.Opt(IDL.Nat8)], [ManyTokenChangedResult], []),
        tokens_balance: IDL.Func([IDL.Opt(IDL.Vec(IDL.Nat8))], [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))], ['query']),
        tokens_balance_by: IDL.Func([Account], [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))], ['query']),
        tokens_balance_of: IDL.Func([Account], [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))], ['query']),
        tokens_query: IDL.Func([], [IDL.Vec(TokenInfo)], ['query']),
        updated: IDL.Func([], [IDL.Nat64], ['query']),
        version: IDL.Func([], [IDL.Nat32], ['query']),
        wallet_balance: IDL.Func([], [IDL.Nat], ['query']),
        wallet_receive: IDL.Func([], [IDL.Nat], []),
    });
};
export const init = ({ IDL }: any) => {
    const InitArg = IDL.Record({
        maintainers: IDL.Opt(IDL.Vec(IDL.Principal)),
        schedule: IDL.Opt(IDL.Nat),
    });
    const CurrentArchiving = IDL.Record({
        canister_id: IDL.Principal,
        length: IDL.Nat64,
        max_length: IDL.Nat64,
        block_height_offset: IDL.Nat64,
    });
    const InitArgV1 = IDL.Record({
        maintainers: IDL.Opt(IDL.Vec(IDL.Principal)),
        current_archiving_swap: IDL.Opt(CurrentArchiving),
        schedule: IDL.Opt(IDL.Nat),
        current_archiving_token: IDL.Opt(CurrentArchiving),
    });
    const InitArgs = IDL.Variant({ V0: InitArg, V1: InitArgV1 });
    return [IDL.Opt(InitArgs)];
};
