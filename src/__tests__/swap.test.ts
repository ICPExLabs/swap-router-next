import { get_pair_swap_exact_tokens_paths_by } from '..';

test('test swap', async () => {
    // await pair_swap_exact_tokens_by(
    //     [{ icpex: 'arfmo-qqaaa-aaaaj-az7ta-cai' }],
    //     'ryjl3-tyaaa-aaaaa-aaaba-cai',
    //     'lvfsa-2aaaa-aaaaq-aaeyq-cai',
    //     100000000n,
    // );

    // const paths = await get_pair_swap_exact_tokens_paths_by(
    //     [{ icpex: 'arfmo-qqaaa-aaaaj-az7ta-cai' }],
    //     'ryjl3-tyaaa-aaaaa-aaaba-cai',
    //     'lvfsa-2aaaa-aaaaq-aaeyq-cai',
    //     100000000n,
    // );
    // console.log(paths);

    // const paths = await get_pair_swap_exact_tokens_paths_by(
    //     [
    //         {
    //             kongswap: {
    //                 anchor: '2ipq2-uqaaa-aaaar-qailq-cai',
    //                 fetch_user: async () => ({
    //                     user_id: 0,
    //                     principal_id: '2vxsx-fae', // cspell: disable-line
    //                     account_id: '1c7a48ba6a562aa9eaa2481a9049cdf0433b9738c992d698c31d8abf89cadc79',
    //                     my_referral_code: '',
    //                     referred_by: undefined,
    //                     referred_by_expires_at: undefined,
    //                     fee_level: 0,
    //                     fee_level_expires_at: undefined,
    //                 }),
    //             },
    //         },
    //     ],
    //     'ryjl3-tyaaa-aaaaa-aaaba-cai',
    //     'hhaaz-2aaaa-aaaaq-aacla-cai',
    //     100000000n,
    // );
    // console.log(paths);

    const paths = await get_pair_swap_exact_tokens_paths_by(
        [
            {
                icpswap: '4mmnk-kiaaa-aaaag-qbllq-cai',
            },
        ],
        'ryjl3-tyaaa-aaaaa-aaaba-cai',
        'lvfsa-2aaaa-aaaaq-aaeyq-cai',
        100000000n,
        { reserve_zero: true },
    );
    console.log(paths);
});
