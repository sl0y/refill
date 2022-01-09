import FN from '@me5on/fn';
import css from '../css/css.wrap.js';
import dub$ from '../dub/dub$.wrap.js';


const {compose} = FN;


const vis$ = (

    ({displayName, names, strat = 'doubles'}, ...dats) => compose(
        css({root: displayName, names, strat}),
        ...(dats ?? []),
        dub$({displayName}),
    )

);


// noinspection JSUnusedGlobalSymbols
export default vis$;
