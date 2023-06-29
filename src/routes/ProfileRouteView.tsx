import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Profile } from 'profile/types'
import { ProfileView } from 'profile/components/ProfileView'
import { Layout } from '../layout'

export const ProfileRouteView: FC = () => {
    const { profile } = useLoaderData() as { profile: Profile }
    return (
        <Layout>
            <ProfileView profile={profile} />
        </Layout>
    )
}
