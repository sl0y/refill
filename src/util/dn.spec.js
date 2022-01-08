import {describe, expect, it} from '@jest/globals';
import dn from './dn.util.js';


describe('refill/util/dn', () => {

    it(
        'is a function',
        () => void expect(dn).toBeFun(),
    );


    it.each([
        // result, ...args
        ['Component', void (1)],
        ['Component', null],
        ['name', {name: 'name'}],
        ['some name', {displayName: 'some name'}],
        ['display name', {displayName: 'display name', name: 'name'}],
    ])(
        'returns correct string %p for %p',
        expect(dn).toMapExact,
    );

});
