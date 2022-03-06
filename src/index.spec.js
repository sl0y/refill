/* eslint-disable new-cap,max-lines-per-function */


import {describe, expect, it} from '@jest/globals';
import refill from './index.js';


const sortedKeys = (

    $ => $
        ? Object.keys($).sort()
        : []

);


describe('refill', () => {

    const funs = ['css', 'dat', 'dub$', 'pt', 'vis$'].sort();

    it(
        'refill is a function',
        () => expect(refill).toBeFun(refill),
    );

    it(
        'refill returns itself',
        () => expect(refill()).toBeFun(refill),
    );

    it(
        'contains fields',
        () => expect(sortedKeys(refill)).toEqual(funs),
    );

    describe.each(funs)('function', name => { // eslint-disable-line no-shadow
        describe(`refill.${name}`, () => {

            const fn = refill[name];

            it(
                'is a function',
                () => void expect(fn).toBeFun(name),
            );

        });
    });


});
