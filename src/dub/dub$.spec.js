import {describe, expect, it, jest} from '@jest/globals';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import dub$ from './dub$.wrap.js';


// eslint-disable-next-line max-lines-per-function
describe('refill.dub$', () => {

    it(
        'is a function',
        () => void expect(dub$).toBeFun(),
    );

    it.each([
        [null, null],
        [void (1), void (1)],
        [null, void (1)],
        [void (1), null],
    ])(
        'throws error for options %p and component %p',
        (options, component) => expect(
            () => dub$(options)(component),
        ).toThrow(),
    );

    it.each([
        [{name: 'Component'}, void (1)],
        [{name: 'name'}, {displayName: 'Component'}],
    ])(
        'returns correct function for options %p and component %p',
        (options, component) => {

            const anyFun = expect.any(Function);
            const actual = dub$(options)(component);

            expect(actual).toEqual(anyFun);
            expect(actual.displayName).toBe('Dub$(Component)');

            if (component) {
                expect(component.displayName).toBe('Component');
            } else {
                expect(() => component.displayName).toThrow();
            }

        },
    );

    it('hoists non-React static elements', () => {

        const displayName = 'displayName';

        const originalComponent = () => null;
        originalComponent.staticProp = 'staticProperty';
        originalComponent.propTypes = {};
        originalComponent.defaultProps = {};

        const wrapper = dub$({displayName})(originalComponent);

        expect(wrapper.staticProp).toBe('staticProperty');
        expect(wrapper.propTypes).toBe(void (1));
        expect(wrapper.defaultProps).toBe(void (1));

    });

    it('invokes the component with the given $dn and $dub', () => {

        const like = expect.objectContaining;
        const anyFun = expect.any(Function);

        const displayName = 'name';

        const originalComponent = jest.fn(() => null);
        const wrapper = jest.fn(dub$({displayName}));

        // noinspection JSCheckFunctionSignatures
        const wrappedComponent = wrapper(originalComponent);

        // noinspection JSCheckFunctionSignatures
        TestRenderer.create(React.createElement(wrappedComponent));

        expect(wrappedComponent).toEqual(anyFun);
        expect(wrapper).toHaveBeenCalledTimes(1);
        expect(originalComponent).toHaveBeenCalledTimes(1);

        expect(originalComponent).toHaveBeenCalledWith(
            like({
                $dn:  displayName,
                $dub: displayName,
            }),
            {},
        );

    });


});
