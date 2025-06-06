export const idlFactory = ({ IDL }: any) => {
    const Passcode = IDL.Record({
        fee: IDL.Nat,
        token0: IDL.Principal,
        token1: IDL.Principal,
    });
    const Error = IDL.Variant({
        CommonError: IDL.Null,
        InternalError: IDL.Text,
        UnsupportedToken: IDL.Text,
        InsufficientFunds: IDL.Null,
    });
    const Result_1 = IDL.Variant({ ok: IDL.Null, err: Error });
    const PoolInstaller = IDL.Record({
        weight: IDL.Nat,
        subnet: IDL.Text,
        subnetType: IDL.Text,
        canisterId: IDL.Principal,
    });
    const Token = IDL.Record({ address: IDL.Text, standard: IDL.Text });
    const CreatePoolArgs = IDL.Record({
        fee: IDL.Nat,
        sqrtPriceX96: IDL.Text,
        token0: Token,
        token1: Token,
        subnet: IDL.Opt(IDL.Text),
    });
    const PoolData = IDL.Record({
        fee: IDL.Nat,
        key: IDL.Text,
        tickSpacing: IDL.Int,
        token0: Token,
        token1: Token,
        canisterId: IDL.Principal,
    });
    const Result_8 = IDL.Variant({ ok: PoolData, err: Error });
    const PoolUpgradeTaskStep = IDL.Record({
        isDone: IDL.Bool,
        timestamp: IDL.Nat,
    });
    const PoolUpgradeTask = IDL.Record({
        turnOnAvailable: PoolUpgradeTaskStep,
        backup: IDL.Record({
            isDone: IDL.Bool,
            isSent: IDL.Bool,
            retryCount: IDL.Nat,
            timestamp: IDL.Nat,
        }),
        stop: PoolUpgradeTaskStep,
        moduleHashBefore: IDL.Opt(IDL.Vec(IDL.Nat8)),
        moduleHashAfter: IDL.Opt(IDL.Vec(IDL.Nat8)),
        turnOffAvailable: PoolUpgradeTaskStep,
        upgrade: PoolUpgradeTaskStep,
        start: PoolUpgradeTaskStep,
        poolData: PoolData,
    });
    const Result_13 = IDL.Variant({
        ok: IDL.Opt(PoolUpgradeTask),
        err: Error,
    });
    const CycleInfo = IDL.Record({ balance: IDL.Nat, available: IDL.Nat });
    const Result_12 = IDL.Variant({ ok: CycleInfo, err: Error });
    const Result_11 = IDL.Variant({
        ok: IDL.Opt(IDL.Principal),
        err: Error,
    });
    const Result_10 = IDL.Variant({
        ok: IDL.Record({
            infoCid: IDL.Principal,
            trustedCanisterManagerCid: IDL.Principal,
            governanceCid: IDL.Opt(IDL.Principal),
            passcodeManagerCid: IDL.Principal,
            backupCid: IDL.Principal,
            feeReceiverCid: IDL.Principal,
        }),
        err: Error,
    });
    const Result_9 = IDL.Variant({ ok: IDL.Vec(Passcode), err: Error });
    const Result_7 = IDL.Variant({
        ok: IDL.Vec(PoolUpgradeTask),
        err: Error,
    });
    const GetPoolArgs = IDL.Record({
        fee: IDL.Nat,
        token0: Token,
        token1: Token,
    });
    const Result_6 = IDL.Variant({
        ok: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(PoolUpgradeTask))),
        err: Error,
    });
    const Result_4 = IDL.Variant({ ok: IDL.Vec(PoolData), err: Error });
    const Result_5 = IDL.Variant({
        ok: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(Passcode))),
        err: Error,
    });
    const FailedPoolInfo = IDL.Record({
        task: PoolUpgradeTask,
        timestamp: IDL.Nat,
        errorMsg: IDL.Text,
    });
    const Result_3 = IDL.Variant({
        ok: IDL.Vec(FailedPoolInfo),
        err: Error,
    });
    const Icrc21ConsentMessageMetadata = IDL.Record({
        utc_offset_minutes: IDL.Opt(IDL.Int16),
        language: IDL.Text,
    });
    const Icrc21ConsentMessageSpec = IDL.Record({
        metadata: Icrc21ConsentMessageMetadata,
        device_spec: IDL.Opt(
            IDL.Variant({
                GenericDisplay: IDL.Null,
                LineDisplay: IDL.Record({
                    characters_per_line: IDL.Nat16,
                    lines_per_page: IDL.Nat16,
                }),
            }),
        ),
    });
    const Icrc21ConsentMessageRequest = IDL.Record({
        arg: IDL.Vec(IDL.Nat8),
        method: IDL.Text,
        user_preferences: Icrc21ConsentMessageSpec,
    });
    const Icrc21ConsentMessage = IDL.Variant({
        LineDisplayMessage: IDL.Record({
            pages: IDL.Vec(IDL.Record({ lines: IDL.Vec(IDL.Text) })),
        }),
        GenericDisplayMessage: IDL.Text,
    });
    const Icrc21ConsentInfo = IDL.Record({
        metadata: Icrc21ConsentMessageMetadata,
        consent_message: Icrc21ConsentMessage,
    });
    const Icrc21ErrorInfo = IDL.Record({ description: IDL.Text });
    const Icrc21Error = IDL.Variant({
        GenericError: IDL.Record({
            description: IDL.Text,
            error_code: IDL.Nat,
        }),
        InsufficientPayment: Icrc21ErrorInfo,
        UnsupportedCanisterCall: Icrc21ErrorInfo,
        ConsentMessageUnavailable: Icrc21ErrorInfo,
    });
    const Icrc21ConsentMessageResponse = IDL.Variant({
        Ok: Icrc21ConsentInfo,
        Err: Icrc21Error,
    });
    const Icrc28TrustedOriginsResponse = IDL.Record({
        trusted_origins: IDL.Vec(IDL.Text),
    });
    const Result_2 = IDL.Variant({ ok: IDL.Bool, err: Error });
    const UpgradePoolArgs = IDL.Record({ poolIds: IDL.Vec(IDL.Principal) });
    const Result = IDL.Variant({ ok: IDL.Text, err: Error });
    return IDL.Service({
        addPasscode: IDL.Func([IDL.Principal, Passcode], [Result_1], []),
        addPoolControllers: IDL.Func([IDL.Principal, IDL.Vec(IDL.Principal)], [], []),
        addPoolInstallers: IDL.Func([IDL.Vec(PoolInstaller)], [], []),
        addPoolInstallersValidate: IDL.Func(
            [IDL.Vec(PoolInstaller)],
            [IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })],
            [],
        ),
        batchAddPoolControllers: IDL.Func([IDL.Vec(IDL.Principal), IDL.Vec(IDL.Principal)], [], []),
        batchClearRemovedPool: IDL.Func([IDL.Vec(IDL.Principal)], [], []),
        batchRemovePoolControllers: IDL.Func([IDL.Vec(IDL.Principal), IDL.Vec(IDL.Principal)], [], []),
        batchRemovePools: IDL.Func([IDL.Vec(IDL.Principal)], [Result_1], []),
        batchSetPoolAdmins: IDL.Func([IDL.Vec(IDL.Principal), IDL.Vec(IDL.Principal)], [], []),
        batchSetPoolAvailable: IDL.Func([IDL.Vec(IDL.Principal), IDL.Bool], [], []),
        batchSetPoolIcrc28TrustedOrigins: IDL.Func([IDL.Vec(IDL.Principal), IDL.Vec(IDL.Text)], [Result_1], []),
        batchSetPoolLimitOrderAvailable: IDL.Func([IDL.Vec(IDL.Principal), IDL.Bool], [], []),
        clearPoolUpgradeTaskHis: IDL.Func([], [], []),
        clearRemovedPool: IDL.Func([IDL.Principal], [IDL.Text], []),
        clearUpgradeFailedPoolList: IDL.Func([], [], []),
        createPool: IDL.Func([CreatePoolArgs], [Result_8], []),
        deletePasscode: IDL.Func([IDL.Principal, Passcode], [Result_1], []),
        getAdmins: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        getCurrentUpgradeTask: IDL.Func([], [Result_13], ['query']),
        getCycleInfo: IDL.Func([], [Result_12], []),
        getGovernanceCid: IDL.Func([], [Result_11], ['query']),
        getInitArgs: IDL.Func([], [Result_10], ['query']),
        getInstallerModuleHash: IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Nat8))], ['query']),
        getNextPoolVersion: IDL.Func([], [IDL.Text], ['query']),
        getPasscodesByPrincipal: IDL.Func([IDL.Principal], [Result_9], ['query']),
        getPendingUpgradePoolList: IDL.Func([], [Result_7], ['query']),
        getPool: IDL.Func([GetPoolArgs], [Result_8], ['query']),
        getPoolInstallers: IDL.Func([], [IDL.Vec(PoolInstaller)], ['query']),
        getPoolUpgradeTaskHis: IDL.Func([IDL.Principal], [Result_7], ['query']),
        getPoolUpgradeTaskHisList: IDL.Func([], [Result_6], ['query']),
        getPools: IDL.Func([], [Result_4], ['query']),
        getPrincipalPasscodes: IDL.Func([], [Result_5], ['query']),
        getRemovedPools: IDL.Func([], [Result_4], ['query']),
        getUpgradeFailedPoolList: IDL.Func([], [Result_3], ['query']),
        getVersion: IDL.Func([], [IDL.Text], ['query']),
        icrc10_supported_standards: IDL.Func([], [IDL.Vec(IDL.Record({ url: IDL.Text, name: IDL.Text }))], ['query']),
        icrc21_canister_call_consent_message: IDL.Func(
            [Icrc21ConsentMessageRequest],
            [Icrc21ConsentMessageResponse],
            [],
        ),
        icrc28_trusted_origins: IDL.Func([], [Icrc28TrustedOriginsResponse], []),
        removePool: IDL.Func([GetPoolArgs], [IDL.Text], []),
        removePoolControllers: IDL.Func([IDL.Principal, IDL.Vec(IDL.Principal)], [], []),
        removePoolInstaller: IDL.Func([IDL.Principal], [], []),
        removePoolInstallerValidate: IDL.Func([IDL.Principal], [IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })], []),
        retryAllFailedUpgrades: IDL.Func([], [Result_1], []),
        setAdmins: IDL.Func([IDL.Vec(IDL.Principal)], [], []),
        setIcrc28TrustedOrigins: IDL.Func([IDL.Vec(IDL.Text)], [Result_2], []),
        setInstallerModuleHash: IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
        setInstallerModuleHashValidate: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })],
            [],
        ),
        setPoolAdmins: IDL.Func([IDL.Principal, IDL.Vec(IDL.Principal)], [], []),
        setPoolAvailable: IDL.Func([IDL.Principal, IDL.Bool], [], []),
        setUpgradePoolList: IDL.Func([UpgradePoolArgs], [Result_1], []),
        upgradePoolTokenStandard: IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    });
};
