import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

const MockNestedComponent = ({ queries, lazyQueries, mutations, reactiveVars }) => {
    return (
        <div>
            {queries?.map(({ name, getVariables }, index) => (
                <div key={`query-${name}-${index}`}>
                    <div>{name}</div>
                    <div>{JSON.stringify(getVariables())}</div>
                </div>
            ))}
            {lazyQueries?.map(({ name, getVariables }, index) => (
                <div key={`lazyQuery-${name}-${index}`}>
                    <div>{name}</div>
                    <div>{JSON.stringify(getVariables())}</div>
                </div>
            ))}
            {mutations?.map(({ name, getVariables }, index) => {
                return (
                    <div key={`mutation-${name}-${index}`}>
                        <div>{name}</div>
                        <div>{JSON.stringify(getVariables())}</div>
                    </div>
                );
            })}
            {reactiveVars?.map(({ name, reactiveVar }, index) => {
                return (
                    <div key={`cache-${name}-${index}`}>
                        <div>{name}</div>
                        <div>{reactiveVar()}</div>
                    </div>
                );
            })}
        </div>
    );
};

jest.mock('@cheddartv/alice-components', () => {
    return {
        queryProvider: jest.fn().mockImplementation(options => {
            return function mockQueryProvider() {
                return <MockNestedComponent {...options} />;
            };
        }),
    };
});


const customRender = (children) => render(<MockedProvider>{children}</MockedProvider>);

export * from '@testing-library/react';
export { customRender as render };