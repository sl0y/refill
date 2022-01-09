import FN from '@me5on/fn';
import css from '../css/css.wrap.js';
import dub$ from '../dub/dub$.wrap.js';


const {compose} = FN;


const vis$ = (

    ({displayName, names}, ...dats) => compose(
        css({root: displayName, names}),
        ...(dats ?? []),
        dub$({displayName}),
    )

);


// noinspection JSUnusedGlobalSymbols
export default vis$;
