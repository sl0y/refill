import FN from '@me5on/fn';
import IS from '@me5on/is';
import css from '../css/css.wrap.js';
import dub$ from '../dub/dub$.wrap.js';
import pt from '../pt/pt.wrap.js';


const {compose} = FN;


const vis$ = (options, ...dats) => {

    const str = IS.str(options);

    const $dn = str
        ? options
        : (options?.$dn || options?.displayName);

    const opts = str ? {} : options;
    const {$cns, names, strat} = opts;

    return compose(
        css({
            root:  $dn,
            names: $cns ?? names,
            strat: strat || 'doubles',
        }),
        ...(dats),
        pt(opts),
        dub$({displayName: $dn}),
    );
};


// noinspection JSUnusedGlobalSymbols
export default vis$;
