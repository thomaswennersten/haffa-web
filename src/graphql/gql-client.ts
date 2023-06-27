import { makeBackendUrl } from '../lib/make-backend-url'
import { FluentGql, FluentGqlOptions } from './types'

/*
const mapNullToNotFoundError = <T>(value: T): T => {
	if ((value === null) || (value === undefined))
}
*/
const gqlFetch = (options: FluentGqlOptions) => fetch(options.url, 
	{
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...options.headers,
		},
		body: JSON.stringify({
			query: options.query,
			variables: options.variables,
		}),
	})
	.then(response => response.json())

const gqlFetchMap = <T>(options: FluentGqlOptions, property: string): Promise<T> => gqlFetch(options).then(({ data }) => data[property] as T)

export const gqlClient = (options: FluentGqlOptions = { url: makeBackendUrl('/api/v1/haffa/graphql'), headers: {}, query: '', variables: null }): FluentGql => ({
	url: url => gqlClient({ ...options, url }),
	headers: headers => gqlClient({ ...options, headers }),
	query: query => gqlClient({ ...options, query }),
	variables: variables => gqlClient({ ...options, variables }),
	map: <T>(property: string, fixup?: (value: T) => T) => gqlFetchMap<T>(options, property).then(value => fixup ? fixup(value) : value),
})
