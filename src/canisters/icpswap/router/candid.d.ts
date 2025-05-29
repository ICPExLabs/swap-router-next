import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';
import type { Principal } from '@dfinity/principal';

export interface CreatePoolArgs {
    fee: bigint;
    sqrtPriceX96: string;
    token0: Token;
    token1: Token;
    subnet: [] | [string];
}
export interface CycleInfo {
    balance: bigint;
    available: bigint;
}
export type Error =
    | { CommonError: null }
    | { InternalError: string }
    | { UnsupportedToken: string }
    | { InsufficientFunds: null };
export interface FailedPoolInfo {
    task: PoolUpgradeTask;
    timestamp: bigint;
    errorMsg: string;
}
export interface GetPoolArgs {
    fee: bigint;
    token0: Token;
    token1: Token;
}
export interface Icrc21ConsentInfo {
    metadata: Icrc21ConsentMessageMetadata;
    consent_message: Icrc21ConsentMessage;
}
export type Icrc21ConsentMessage =
    | {
          LineDisplayMessage: { pages: { lines: string[] }[] };
      }
    | { GenericDisplayMessage: string };
export interface Icrc21ConsentMessageMetadata {
    utc_offset_minutes: [] | [number];
    language: string;
}
export interface Icrc21ConsentMessageRequest {
    arg: Uint8Array | number[];
    method: string;
    user_preferences: Icrc21ConsentMessageSpec;
}
export type Icrc21ConsentMessageResponse = { Ok: Icrc21ConsentInfo } | { Err: Icrc21Error };
export interface Icrc21ConsentMessageSpec {
    metadata: Icrc21ConsentMessageMetadata;
    device_spec:
        | []
        | [
              | { GenericDisplay: null }
              | {
                    LineDisplay: {
                        characters_per_line: number;
                        lines_per_page: number;
                    };
                },
          ];
}
export type Icrc21Error =
    | {
          GenericError: { description: string; error_code: bigint };
      }
    | { InsufficientPayment: Icrc21ErrorInfo }
    | { UnsupportedCanisterCall: Icrc21ErrorInfo }
    | { ConsentMessageUnavailable: Icrc21ErrorInfo };
export interface Icrc21ErrorInfo {
    description: string;
}
export interface Icrc28TrustedOriginsResponse {
    trusted_origins: string[];
}
export interface Passcode {
    fee: bigint;
    token0: Principal;
    token1: Principal;
}
export interface PoolData {
    fee: bigint;
    key: string;
    tickSpacing: bigint;
    token0: Token;
    token1: Token;
    canisterId: Principal;
}
export interface PoolInstaller {
    weight: bigint;
    subnet: string;
    subnetType: string;
    canisterId: Principal;
}
export interface PoolUpgradeTask {
    turnOnAvailable: PoolUpgradeTaskStep;
    backup: {
        isDone: boolean;
        isSent: boolean;
        retryCount: bigint;
        timestamp: bigint;
    };
    stop: PoolUpgradeTaskStep;
    moduleHashBefore: [] | [Uint8Array | number[]];
    moduleHashAfter: [] | [Uint8Array | number[]];
    turnOffAvailable: PoolUpgradeTaskStep;
    upgrade: PoolUpgradeTaskStep;
    start: PoolUpgradeTaskStep;
    poolData: PoolData;
}
export interface PoolUpgradeTaskStep {
    isDone: boolean;
    timestamp: bigint;
}
export type Result = { ok: string } | { err: Error };
export type Result_1 = { ok: null } | { err: Error };
export type Result_10 =
    | {
          ok: {
              infoCid: Principal;
              trustedCanisterManagerCid: Principal;
              governanceCid: [] | [Principal];
              passcodeManagerCid: Principal;
              backupCid: Principal;
              feeReceiverCid: Principal;
          };
      }
    | { err: Error };
export type Result_11 = { ok: [] | [Principal] } | { err: Error };
export type Result_12 = { ok: CycleInfo } | { err: Error };
export type Result_13 = { ok: [] | [PoolUpgradeTask] } | { err: Error };
export type Result_2 = { ok: boolean } | { err: Error };
export type Result_3 = { ok: FailedPoolInfo[] } | { err: Error };
export type Result_4 = { ok: PoolData[] } | { err: Error };
export type Result_5 = { ok: [Principal, Passcode[]][] } | { err: Error };
export type Result_6 = { ok: [Principal, PoolUpgradeTask[]][] } | { err: Error };
export type Result_7 = { ok: PoolUpgradeTask[] } | { err: Error };
export type Result_8 = { ok: PoolData } | { err: Error };
export type Result_9 = { ok: Passcode[] } | { err: Error };
export interface Token {
    address: string;
    standard: string;
}
export interface UpgradePoolArgs {
    poolIds: Principal[];
}
export interface _SERVICE {
    addPasscode: ActorMethod<[Principal, Passcode], Result_1>;
    addPoolControllers: ActorMethod<[Principal, Principal[]], undefined>;
    addPoolInstallers: ActorMethod<[PoolInstaller[]], undefined>;
    addPoolInstallersValidate: ActorMethod<[PoolInstaller[]], { Ok: string } | { Err: string }>;
    batchAddPoolControllers: ActorMethod<[Principal[], Principal[]], undefined>;
    batchClearRemovedPool: ActorMethod<[Principal[]], undefined>;
    batchRemovePoolControllers: ActorMethod<[Principal[], Principal[]], undefined>;
    batchRemovePools: ActorMethod<[Principal[]], Result_1>;
    batchSetPoolAdmins: ActorMethod<[Principal[], Principal[]], undefined>;
    batchSetPoolAvailable: ActorMethod<[Principal[], boolean], undefined>;
    batchSetPoolIcrc28TrustedOrigins: ActorMethod<[Principal[], string[]], Result_1>;
    batchSetPoolLimitOrderAvailable: ActorMethod<[Principal[], boolean], undefined>;
    clearPoolUpgradeTaskHis: ActorMethod<[], undefined>;
    clearRemovedPool: ActorMethod<[Principal], string>;
    clearUpgradeFailedPoolList: ActorMethod<[], undefined>;
    createPool: ActorMethod<[CreatePoolArgs], Result_8>;
    deletePasscode: ActorMethod<[Principal, Passcode], Result_1>;
    getAdmins: ActorMethod<[], Principal[]>;
    getCurrentUpgradeTask: ActorMethod<[], Result_13>;
    getCycleInfo: ActorMethod<[], Result_12>;
    getGovernanceCid: ActorMethod<[], Result_11>;
    getInitArgs: ActorMethod<[], Result_10>;
    getInstallerModuleHash: ActorMethod<[], [] | [Uint8Array | number[]]>;
    getNextPoolVersion: ActorMethod<[], string>;
    getPasscodesByPrincipal: ActorMethod<[Principal], Result_9>;
    getPendingUpgradePoolList: ActorMethod<[], Result_7>;
    getPool: ActorMethod<[GetPoolArgs], Result_8>;
    getPoolInstallers: ActorMethod<[], PoolInstaller[]>;
    getPoolUpgradeTaskHis: ActorMethod<[Principal], Result_7>;
    getPoolUpgradeTaskHisList: ActorMethod<[], Result_6>;
    getPools: ActorMethod<[], Result_4>;
    getPrincipalPasscodes: ActorMethod<[], Result_5>;
    getRemovedPools: ActorMethod<[], Result_4>;
    getUpgradeFailedPoolList: ActorMethod<[], Result_3>;
    getVersion: ActorMethod<[], string>;
    icrc10_supported_standards: ActorMethod<[], { url: string; name: string }[]>;
    icrc21_canister_call_consent_message: ActorMethod<[Icrc21ConsentMessageRequest], Icrc21ConsentMessageResponse>;
    icrc28_trusted_origins: ActorMethod<[], Icrc28TrustedOriginsResponse>;
    removePool: ActorMethod<[GetPoolArgs], string>;
    removePoolControllers: ActorMethod<[Principal, Principal[]], undefined>;
    removePoolInstaller: ActorMethod<[Principal], undefined>;
    removePoolInstallerValidate: ActorMethod<[Principal], { Ok: string } | { Err: string }>;
    retryAllFailedUpgrades: ActorMethod<[], Result_1>;
    setAdmins: ActorMethod<[Principal[]], undefined>;
    setIcrc28TrustedOrigins: ActorMethod<[string[]], Result_2>;
    setInstallerModuleHash: ActorMethod<[Uint8Array | number[]], undefined>;
    setInstallerModuleHashValidate: ActorMethod<[Uint8Array | number[]], { Ok: string } | { Err: string }>;
    setPoolAdmins: ActorMethod<[Principal, Principal[]], undefined>;
    setPoolAvailable: ActorMethod<[Principal, boolean], undefined>;
    setUpgradePoolList: ActorMethod<[UpgradePoolArgs], Result_1>;
    upgradePoolTokenStandard: ActorMethod<[Principal, Principal], Result>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
