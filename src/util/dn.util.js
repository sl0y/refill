import str from './str.util.js';


const DEFAULT = 'Component';


const dn = (

    $ => str($?.displayName) || str($?.name) || DEFAULT

);


// noinspection JSUnusedGlobalSymbols
export default dn;
