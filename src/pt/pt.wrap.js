import IS from '@me5on/is';
import hoist$ from 'hoist-non-react-statics';
import React from 'react';
import dn from '../util/dn.util.js';


const pt = (

    $ => Component => {

        const $pt = $?.$pt ?? $?.types ?? $?.propTypes;
        const $dp = $?.$dp ?? $?.defaults ?? $?.defaultProps;

        if (!$pt && !$dp) {
            return Component;
        }

        // eslint-disable-next-line spaced-comment
        const Pt = ($ => /*#__PURE__*/React.createElement(Component, {...$, $pt, $dp}));

        if (IS.fun(Component)) {
            hoist$(Pt, Component);
        }

        Pt.displayName = `Pt(${dn(Component)})`;
        Pt.propTypes = $pt;
        Pt.defaultProps = $dp;

        return Pt;
    }

);


// noinspection JSUnusedGlobalSymbols
export default pt;
