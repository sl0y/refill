import {describe, expect, it} from '@jest/globals';
import vis$ from './vis$.wrap.js';


// eslint-disable-next-line max-lines-per-function
describe('refill.vis$', () => {

    it(
        'is a function',
        () => void expect(vis$).toBeFun(),
    );

    it.each([
        [null, null],
        [void (1), void (1)],
        [null, void (1)],
        [void (1), null],
    ])(
        'throws error for options %p and component %p',
        (options, component) => expect(
            () => vis$(options)(component),
        ).toThrow(),
    );

    it.each([
        ['Component', void (1)],
        [{name: 'Component'}, void (1)],
        [{name: 'name'}, {displayName: 'Component'}],
        [{name: 'name', $pt: {}}, {displayName: 'Component'}],
    ])(
        'returns correct function for options %p and component %p',
        (options, component) => {

            const anyFun = expect.any(Function);
            const actual = vis$(options)(component);

            expect(actual).toEqual(anyFun);
            expect(actual.displayName).toBe(
                options.$pt
                    ? 'Css(Pt(Dub$(Component)))'
                    : 'Css(Dub$(Component))',
            );

            if (component) {
                expect(component.displayName).toBe('Component');
            } else {
                expect(() => component.displayName).toThrow();
            }

        },
    );

});
