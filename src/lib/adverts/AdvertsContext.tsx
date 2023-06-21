import { FC, PropsWithChildren, createContext } from 'react'
import { AdvertsRepository } from './types'

const notProvided = (method: string) => () => {
	throw new Error(`AdvertsContext::${method} is not provided`)
}
export const AdvertsContext = createContext<AdvertsRepository>({
	getAdvert: notProvided('getAdvert'),
	listAdverts: notProvided('listAdverts'),
	createAdvert: notProvided('createAdvert'),
})


export const AdvertsProvider: FC<PropsWithChildren<{repository: AdvertsRepository}>> = ({ repository, children }) => (
	<AdvertsContext.Provider value={repository}>
		{children}
	</AdvertsContext.Provider>
)