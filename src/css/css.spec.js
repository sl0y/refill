import {describe, expect, it, jest} from '@jest/globals';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import css from './css.wrap.js';


// eslint-disable-next-line max-lines-per-function
describe('refill.css', () => {

    it(
        'is a function',
        () => void expect(css).toBeFun(),
    );

    it.each([
        [null, null],
        // [{}, {}],
        // [1, 1],
    ])(
        'throws error for options %p and component %p',
        (options, component) => expect(
            () => css(options)(component),
        ).toThrow(),
    );

    it(
        'returns correct function for the component',
        () => {

            const names = {};
            const root = 'root';
            const component = () => null;
            component.displayName = 'Dn';

            const actual = css({root, names})(component);

            expect(actual).toEqual(expect.any(Function));
            expect(actual.displayName).toBe('Css(Dn)');

        },
    );

    it('hoists non-React static elements', () => {

        const originalComponent = () => null;
        originalComponent.staticProp = 'staticProperty';
        originalComponent.propTypes = {};
        originalComponent.defaultProps = {};

        const wrapper = css('tag', $ => $)(originalComponent);

        expect(wrapper.staticProp).toBe('staticProperty');
        expect(wrapper.propTypes).toBe(void (1));
        expect(wrapper.defaultProps).toBe(void (1));

    });

    it('passes the transformed props to the wrapped component', () => {

        const like = expect.objectContaining;
        const anyFun = expect.any(Function);

        const names = {};
        const root = 'root';

        const originalComponent = jest.fn(() => null);
        const wrapper = jest.fn(css({root, names}));

        // noinspection JSCheckFunctionSignatures
        const wrappedComponent = wrapper(originalComponent);

        // noinspection JSCheckFunctionSignatures
        TestRenderer.create(React.createElement(wrappedComponent));

        expect(wrappedComponent).toEqual(anyFun);
        expect(wrapper).toHaveBeenCalledTimes(1);
        expect(originalComponent).toHaveBeenCalledTimes(1);

        expect(originalComponent).toHaveBeenCalledWith(
            like({$cn: anyFun}),
            {},
        );

    });


});
