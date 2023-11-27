import { FC, PropsWithChildren, useContext, useState } from 'react'
import {
    Route,
    RouteProps,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    useLoaderData,
} from 'react-router-dom'
import { Layout } from 'layout'
import {
    AdvertsRepository,
    AdvertsContext,
    CreateAdvertView,
    EditAdvertView,
    AdvertsView,
    AdvertDetailsView,
    MyAdvertsView,
    MyReservationsView,
} from 'adverts'
import {
    EditProfileView,
    ProfileContext,
    ProfileRepository,
    ProfileView,
} from 'profile'
import { AdvertQrCodeView } from 'adverts/components/details'
import { AuthContext, HaffaUserRoles } from 'auth'
import { UnauthorizedView } from 'auth/components/UnathorizedView'
import { CategoriesRepository } from 'categories/types'
import { CategoriesContext } from 'categories'
import { TermsRepository } from 'terms/types'
import { TermsContext } from 'terms'
import { MySubscriptionsView } from 'subscriptions'
import { SubscriptionView } from 'subscriptions/components/SubscriptionView'
import { AdminView } from 'admin'
import { ScanQrCodeView } from 'qr-code-navigation/ScanQrCodeView'
import { AboutView } from 'about'
import { ErrorRouteView } from './ErrorRouteView'

const UnpackLoaderData: FC<{ render: (loaderData: any) => JSX.Element }> = ({
    render,
}) => {
    const loaderData = useLoaderData()
    return render(loaderData)
}

const RouteLayout: FC<
    PropsWithChildren & { ifRoles: (roles: HaffaUserRoles) => boolean }
> = ({ ifRoles, children }) => {
    const { roles } = useContext(AuthContext)

    return ifRoles(roles) ? (
        <Layout key="a">{children}</Layout>
    ) : (
        <Layout key="u">
            <UnauthorizedView />
        </Layout>
    )
}

const createRouter = (
    { getTerms }: TermsRepository,
    { getAdvert }: AdvertsRepository,
    { getProfile }: ProfileRepository,
    { getCategories }: CategoriesRepository
) => {
    // So many of the routes relies on
    // - an async fetch of some data
    // - an eventual unpacking of the data (via useLoaderData())
    // - progatation of loaded data to a rendering component
    // In order to avoid trivial separate components for this orchestration
    // we introduce AsyncRouteConfig and simple functions to orchestrate
    // this router/async/load/render mess
    type AsyncRouteConfig = Pick<RouteProps, 'element' | 'loader'>

    /**
     * path: /
     */
    const createHomeProps = (): AsyncRouteConfig => ({
        element: (
            <Layout key="home">
                <AdvertsView />
            </Layout>
        ),
    })
    /**
     * path: /my-adverts
     */
    const createMyAdvertsProps = (): AsyncRouteConfig => ({
        element: (
            <Layout key="my-adverts">
                <MyAdvertsView />
            </Layout>
        ),
    })
    /**
     * path: /my-reservations
     */
    const createMyReservationsProps = (): AsyncRouteConfig => ({
        element: (
            <Layout key="my-reservations">
                <MyReservationsView />
            </Layout>
        ),
    })
    /**
     * path: /'advert/create
     */
    const createAdvertProps = (): AsyncRouteConfig => ({
        loader: () =>
            Promise.all([getProfile(), getTerms(), getCategories()]).then(
                ([profile, terms, categories]) => ({
                    profile,
                    terms,
                    categories,
                })
            ),
        element: (
            <UnpackLoaderData
                key="create-advert"
                render={({ profile, terms, categories }) => (
                    <Layout>
                        <CreateAdvertView
                            profile={profile}
                            terms={terms}
                            categories={categories}
                        />
                    </Layout>
                )}
            />
        ),
    })

    /**
     * path: /advert/edit
     */
    const editAdvertProps = (): AsyncRouteConfig => ({
        loader: ({ params: { advertId } }) =>
            Promise.all([
                getAdvert(advertId as string),
                getTerms(),
                getCategories(),
            ]).then(([advert, terms, categories]) => ({
                advert,
                terms,
                categories,
            })),
        element: (
            <UnpackLoaderData
                key="edit-advert"
                render={({ advert, terms, categories }) => (
                    <Layout>
                        <EditAdvertView
                            advert={advert}
                            terms={terms}
                            categories={categories}
                        />
                    </Layout>
                )}
            />
        ),
    })

    /**
     * path: /advert/qrcode/:advertId
     */
    const viewAdvertQrCodeProps = (): AsyncRouteConfig => ({
        loader: ({ params: { advertId } }) =>
            getAdvert(advertId as string).then((advert) => ({
                advert,
            })),
        element: (
            <UnpackLoaderData
                key="view-advert"
                render={({ advert }) => <AdvertQrCodeView advert={advert} />}
            />
        ),
    })
    /**
     * path: /advert/:advertId
     */
    const viewAdvertProps = (): AsyncRouteConfig => ({
        loader: ({ params: { advertId } }) =>
            Promise.all([getAdvert(advertId as string), getCategories()]).then(
                ([advert, categories]) => ({
                    advert,
                    categories,
                })
            ),
        element: (
            <UnpackLoaderData
                key="view-advert"
                render={({ advert, categories }) => (
                    <Layout>
                        <AdvertDetailsView
                            advert={advert}
                            categories={categories}
                        />
                    </Layout>
                )}
            />
        ),
    })

    /**
     * path: /profile/edit
     */
    const editProfileProps = (): AsyncRouteConfig => ({
        loader: () =>
            Promise.all([getProfile(), getTerms()]).then(
                ([profile, terms]) => ({ profile, terms })
            ),
        element: (
            <UnpackLoaderData
                key="edit-profile"
                render={({ profile, terms }) => (
                    <Layout>
                        <EditProfileView profile={profile} terms={terms} />
                    </Layout>
                )}
            />
        ),
    })

    /**
     * path: /profile
     */
    const viewProfileProps = (): AsyncRouteConfig => ({
        loader: () => getProfile().then((profile) => ({ profile })),
        element: (
            <UnpackLoaderData
                key="view-profile"
                render={({ profile }) => (
                    <Layout>
                        <ProfileView profile={profile} />
                    </Layout>
                )}
            />
        ),
    })

    /**
     * path: /my-subscriptions
     */
    const viewMySubscriptionsProps = (): AsyncRouteConfig => ({
        element: (
            <RouteLayout ifRoles={(r) => !!r.canSubscribe}>
                <MySubscriptionsView />
            </RouteLayout>
        ),
    })

    /**
     * path: /subscription
     */
    const viewSubscriptionProps = (): AsyncRouteConfig => ({
        element: (
            <RouteLayout ifRoles={(r) => !!r.canSubscribe}>
                <SubscriptionView />
            </RouteLayout>
        ),
    })

    /**
     * path: /scan
     */
    const viewScanQrCodeProps = (): AsyncRouteConfig => ({
        element: (
            <Layout>
                <ScanQrCodeView />
            </Layout>
        ),
    })

    /**
     * path: /admin
     */
    const viewAdminProps = (): AsyncRouteConfig => ({
        element: (
            <RouteLayout
                ifRoles={(r) =>
                    !!(
                        r.canEditApiKeys ||
                        r.canEditSystemCategories ||
                        r.canEditSystemLoginPolicies ||
                        r.canEditTerms ||
                        r.canRunSystemJobs
                    )
                }
            >
                <AdminView />
            </RouteLayout>
        ),
    })

    /**
     * path: /about
     */
    const viewAboutProps = (): AsyncRouteConfig => ({
        element: (
            <Layout>
                <AboutView />
            </Layout>
        ),
    })

    return createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" errorElement={<ErrorRouteView />}>
                <Route path="" {...createHomeProps()} />
                <Route
                    path="my-reservations"
                    {...createMyReservationsProps()}
                />
                <Route path="my-adverts" {...createMyAdvertsProps()} />
                <Route path="advert/create" {...createAdvertProps()} />
                <Route path="advert/edit/:advertId" {...editAdvertProps()} />
                <Route
                    path="advert/qrcode/:advertId"
                    {...viewAdvertQrCodeProps()}
                />
                <Route path="advert/:advertId" {...viewAdvertProps()} />
                <Route path="profile/edit" {...editProfileProps()} />
                <Route path="profile" {...viewProfileProps()} />
                <Route
                    path="my-subscriptions"
                    {...viewMySubscriptionsProps()}
                />
                <Route path="subscription" {...viewSubscriptionProps()} />
                <Route path="scan" {...viewScanQrCodeProps()} />
                <Route path="about" {...viewAboutProps()} />
                <Route path="admin" {...viewAdminProps()} />
            </Route>
        )
    )
}

export const AppRouter: FC = () => {
    const terms = useContext(TermsContext)
    const adverts = useContext(AdvertsContext)
    const profiles = useContext(ProfileContext)
    const categories = useContext(CategoriesContext)
    const [router] = useState(
        createRouter(terms, adverts, profiles, categories)
    )
    return <RouterProvider router={router} />
}
