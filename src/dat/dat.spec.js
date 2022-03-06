/* eslint-disable no-magic-numbers */
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

    it('uses the function name for tag if not provided', () => {

        const like = expect.objectContaining;
        const anyFun = expect.any(Function);

        const prop = 'prop';
        const tag = 'fn';
        const prefix = `Dat-${tag}(`;
        const fn = ({a}) => ({b: a});

        const component = jest.fn(() => null);
        const implementation = dat(fn);
        const wrapper = jest.fn(implementation);

        // noinspection JSCheckFunctionSignatures
        const hoc = wrapper(component);

        expect(hoc.displayName.substring(0, prefix.length)).toEqual(prefix);

        // noinspection JSCheckFunctionSignatures
        TestRenderer.create(React.createElement(hoc, {a: prop}));

        expect(hoc).toEqual(anyFun);
        expect(wrapper).toHaveBeenCalledTimes(1);
        expect(component).toHaveBeenCalledTimes(1);

        expect(component).toHaveBeenCalledWith(
            like({b: prop}),
            {},
        );

    });

    it('passes the transformed props to the wrapped component', () => {

        const like = expect.objectContaining;
        const anyFun = expect.any(Function);

        const prop = 'prop';
        const tag = 'name';
        const fn = ({a}) => ({b: a});

        const Component = jest.fn(() => null);
        const wrapper = jest.fn(dat(tag, fn));

        // noinspection JSCheckFunctionSignatures
        const Hoc = wrapper(Component);

        // noinspection JSCheckFunctionSignatures
        TestRenderer.create(React.createElement(Hoc, {a: prop}));

        expect(Hoc).toEqual(anyFun);
        expect(wrapper).toHaveBeenCalledTimes(1);
        expect(Component).toHaveBeenCalledTimes(1);

        expect(Component).toHaveBeenCalledWith(
            like({b: prop}),
            {},
        );

    });

});
