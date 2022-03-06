import FN from '@me5on/fn';
import IS from '@me5on/is';
import hoist$ from 'hoist-non-react-statics';
import React from 'react';
import dn from '../util/dn.util.js';
import str from '../util/str.util.js';


const dat = (

    (...$$) => Component => {

        const tag = (2 > $$.length ? $$[0]?.name : $$[0]) ?? ''; // eslint-disable-line no-magic-numbers
        const xfn = (2 > $$.length ? $$[0] : $$[1]) ?? FN.ident; // eslint-disable-line no-magic-numbers

        if (!IS.fun(xfn)) {
            throw new Error(`${xfn} is not a function`);
        }

        // eslint-disable-next-line spaced-comment
        const Dat = ($ => /*#__PURE__*/React.createElement(Component, xfn($)));

        if (IS.fun(Component)) {
            hoist$(Dat, Component);
        }

        Dat.displayName = (
            tag
                ? `Dat-${str(tag)}(${dn(Component)})`
                : `Dat(${dn(Component)})`
        );

        return Dat;
    }

);


// noinspection JSUnusedGlobalSymbols
export default dat;
