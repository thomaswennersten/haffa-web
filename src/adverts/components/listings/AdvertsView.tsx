import { FC } from 'react'
import { AdvertsListWithSearch } from './AdvertsListWithSearch'

export const AdvertsView: FC = () => (
    <AdvertsListWithSearch
        cacheName="adverts"
        defaultSearchParams={{ restrictions: { canBeReserved: true } }}
    />
)