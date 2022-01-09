import FN from '@me5on/fn';
import IS from '@me5on/is';
import hoist$ from 'hoist-non-react-statics';
import React from 'react';
import dn from '../util/dn.util.js';
import str from '../util/str.util.js';


const dat = (

    (tag, fn) => Component => {

        const transform = fn ?? tag ?? FN.ident;
        if (!IS.fun(transform)) {
            throw new Error(`${transform} is not a function`);
        }

        const Dat = (
            // eslint-disable-next-line spaced-comment
            $ => /*#__PURE__*/React.createElement(
                Component,
                transform($),
            )
        );

        if (IS.fun(Component)) {
            hoist$(Dat, Component);
        }

        Dat.displayName = (
            fn
                ? `Dat-${str(tag)}(${dn(Component)})`
                : `Dat(${dn(Component)})`
        );

        return Dat;
    }

);


// noinspection JSUnusedGlobalSymbols
export default dat;
