/* eslint-disable no-magic-numbers */
import {describe, expect, it, jest} from '@jest/globals';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import pt from './pt.wrap.js';


// eslint-disable-next-line max-lines-per-function
describe('refill.pt', () => {

    it(
        'is a function',
        () => void expect(pt).toBeFun(),
    );

    it(
        'returns correct function for trivial arg',
        () => {

            const component = () => null;
            component.displayName = 'Dn';

            const actual = pt()(component);

            expect(actual).toEqual(expect.any(Function));
            expect(actual.displayName).toBe('Dn');
            expect(actual.propTypes).toBe(void (1));
            expect(actual.defaultProps).toBe(void (1));
        },
    );

    it('adds propTypes', () => {

        const Component = () => null;
        Component.staticProp = 'staticProperty';
        Component.propTypes = {};
        Component.defaultProps = {};

        const propTypes = {};

        const actual = pt({propTypes})(Component);

        expect(actual.displayName).toBe('Pt(Component)');
        expect(actual.staticProp).toBe('staticProperty');
        expect(actual.propTypes).toBe(propTypes);
        expect(actual.defaultProps).toBe(void (1));

    });

    it('adds defaultProps', () => {

        const Component = () => null;
        Component.staticProp = 'staticProperty';
        Component.propTypes = {};
        Component.defaultProps = {};

        const defaultProps = {};

        const actual = pt({defaultProps})(Component);

        expect(actual.displayName).toBe('Pt(Component)');
        expect(actual.staticProp).toBe('staticProperty');
        expect(actual.propTypes).toBe(void (1));
        expect(actual.defaultProps).toBe(defaultProps);

    });


    it('adds to the props of the wrapped component', () => {

        const originalProps = {a: 1};
        const types = {};
        const defaults = {c: 3};

        const expectedProps = {...originalProps, $pt: types, $dp: defaults, ...defaults};

        const Component = jest.fn(() => null);

        Component.displayName = 'MockedComponent';

        // noinspection JSCheckFunctionSignatures
        const wrapper = jest.fn(pt({types, defaults}));

        // noinspection JSCheckFunctionSignatures
        const Hoc = wrapper(Component);

        // noinspection JSCheckFunctionSignatures
        TestRenderer.create(React.createElement(Hoc, originalProps));

        expect(Hoc).toEqual(expect.any(Function));
        expect(Hoc.displayName).toBe(`Pt(${Component.displayName})`);
        expect(wrapper).toHaveBeenCalledTimes(1);
        expect(Component).toHaveBeenCalledTimes(1);
        expect(Component).toHaveBeenCalledWith(expectedProps, {});

    });

});
