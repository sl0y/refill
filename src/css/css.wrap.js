import classicist from '@me5on/classicist';
import IS from '@me5on/is';
import hoist$ from 'hoist-non-react-statics';
import React from 'react';
import dn from '../util/dn.util.js';
import str from '../util/str.util.js';


const {fun} = IS;


const css = (

    ({root, names, strat = 'doubles'}) => Component => {

        const $dn = dn(Component);
        root = str(root) || $dn;
        const $cn = classicist({names, root, strat});

        const Css = (
            // eslint-disable-next-line spaced-comment
            $ => /*#__PURE__*/React.createElement(
                Component,
                {
                    ...$,
                    $cn,
                },
            )
        );

        if (fun(Component)) {
            hoist$(Css, Component);
        }

        Css.displayName = `Css(${$dn})`;
        return Css;
    }

);


// noinspection JSUnusedGlobalSymbols
export default css;
