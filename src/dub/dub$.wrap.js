import IS from '@me5on/is';
import hoist$ from 'hoist-non-react-statics';
import React from 'react';
import dn from '../util/dn.util.js';


const dub$ = (

    ({displayName}) => Component => {

        const $dn = displayName || dn(Component);

        const Dub$ = (
            // eslint-disable-next-line spaced-comment
            $ => /*#__PURE__*/React.createElement(
                Component,
                {
                    ...$,
                    $dn, $dub: $dn,
                },
            )
        );

        if (IS.fun(Component)) {
            hoist$(Dub$, Component);
            Component.displayName = $dn;
        }

        Dub$.displayName = `Dub$(${$dn})`;
        return Dub$;
    }

);


// noinspection JSUnusedGlobalSymbols
export default dub$;
