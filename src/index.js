import css from './css/css.wrap.js';
import dat from './dat/dat.wrap.js';
import dub$ from './dub/dub$.wrap.js';
import vis$ from './vis/vis$.wrap.js';


const refill = () => refill;


Object.assign(
    refill,
    {
        css,
        dat,
        dub$,
        vis$,
    },
);


export default refill;
