import classicist from '@me5on/classicist';
import IS from '@me5on/is';
import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import dn from '../util/dn.util.js';
import str from '../util/str.util.js';


const css = (

    ({root, names}) => Component => {

        const $dn = dn(Component);
        const $cn = classicist({names, root: str(root) || $dn});

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

        if (IS.fun(Component)) {
            hoistNonReactStatic(Css, Component);
        }

        Css.displayName = `Css(${$dn})`;
        return Css;
    }

);


// noinspection JSUnusedGlobalSymbols
export default css;
