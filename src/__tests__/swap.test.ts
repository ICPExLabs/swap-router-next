import { get_pair_swap_exact_tokens_paths_by } from '..';

test('test swap', async () => {
    // await pair_swap_exact_tokens_by(
    //     [{ icpex: 'arfmo-qqaaa-aaaaj-az7ta-cai' }],
    //     'ryjl3-tyaaa-aaaaa-aaaba-cai',
    //     'lvfsa-2aaaa-aaaaq-aaeyq-cai',
    //     100000000n,
    // );
    const paths = await get_pair_swap_exact_tokens_paths_by(
        [{ icpex: 'arfmo-qqaaa-aaaaj-az7ta-cai' }],
        'ryjl3-tyaaa-aaaaa-aaaba-cai',
        'lvfsa-2aaaa-aaaaq-aaeyq-cai',
        100000000n,
    );
    console.log(paths);
});
