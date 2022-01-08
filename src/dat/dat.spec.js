import {describe, expect, it, jest} from '@jest/globals';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import dat from './dat.wrap.js';


// eslint-disable-next-line max-lines-per-function
describe('refill.dat', () => {

    it(
        'is a function',
        () => void expect(dat).toBeFun(),
    );

    it.each([
        [{}, {}],
        [1, 1],
    ])(
        'throws error for options %p and component %p',
        (options, component) => expect(
            () => dat(options)(component),
        ).toThrow(),
    );

    it(
        'returns correct function for tag, transform function and a component',
        () => {

            const component = () => null;
            component.displayName = 'Dn';

            const actual = dat('tag', $ => $)(component);

            expect(actual).toEqual(expect.any(Function));
            expect(actual.displayName).toBe('Dat-tag(Dn)');

        },
    );

    it(
        'returns correct function for trivial args and a component',
        () => {

            const component = () => null;
            component.displayName = 'Dn';

            const actual = dat()(component);

            expect(actual).toEqual(expect.any(Function));
            expect(actual.displayName).toBe('Dat(Dn)');

        },
    );

    it('hoists non-React static elements', () => {

        const originalComponent = () => null;
        originalComponent.staticProp = 'staticProperty';
        originalComponent.propTypes = {};
        originalComponent.defaultProps = {};

        const wrapper = dat('tag', $ => $)(originalComponent);

        expect(wrapper.staticProp).toBe('staticProperty');
        expect(wrapper.propTypes).toBe(void (1));
        expect(wrapper.defaultProps).toBe(void (1));

    });

    it('passes the transformed props to the wrapped component', () => {

        const like = expect.objectContaining;
        const anyFun = expect.any(Function);

        const prop = 'prop';
        const tag = 'name';
        const fn = ({a}) => ({b: a});

        const originalComponent = jest.fn(() => null);
        const wrapper = jest.fn(dat(tag, fn));

        // noinspection JSCheckFunctionSignatures
        const wrappedComponent = wrapper(originalComponent);

        // noinspection JSCheckFunctionSignatures
        TestRenderer.create(React.createElement(wrappedComponent, {a: prop}));

        expect(wrappedComponent).toEqual(anyFun);
        expect(wrapper).toHaveBeenCalledTimes(1);
        expect(originalComponent).toHaveBeenCalledTimes(1);

        expect(originalComponent).toHaveBeenCalledWith(
            like({b: prop}),
            {},
        );

    });

});
