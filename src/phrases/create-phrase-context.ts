import { interpolate } from 'lib/interpolate'
import dayjs from 'dayjs'
import { PhraseContextType } from './types'

const defaultPhrases: Omit<
    PhraseContextType,
    'phrase' | 'fromNow' | 'getConfig'
> &
    Record<string, string> = {
    APP_TITLE: 'Haffa!',
    INFO_SLOW_CONNECTION: '... väntar på innehåll från servern ...',
    ERROR_UNAUTHORIZED: 'Du saknar behörighet.',
    ERROR_NOT_FOUND: 'Hoppsan, vi kan inte hitta sidan eller resursen.',
    ERROR_UNKNOWN: 'Något gick fel. Försök igen.',
    SIGNOUT: 'Logga ut',
    NAV_HOME: 'Hem',
    NAV_MY_ADVERTS: 'Mina annonser',
    NAV_MY_RESERVATIONS: 'Haffat!',
    NAV_PROFILE: 'Min profil',
    ADVERT_CREATE: 'Ny annons',
    ADVERT_EDIT: 'Redigera annons',
    ADVERT_EDIT_SAVE: 'Spara annonsen',
    ADVERT_EDIT_CANCEL: 'Avbryt',
    ADVERT_REMOVE: 'Ta bort annonsen',
    ADVERT_COLLECT: 'Hämta pryl',
    ADVERT_RESERVE: 'Reservera',
    ADVERT_CANCEL_RESERVATION: 'Ångra mina reservationer',
    ADVERT_PRINT_QRCODE: 'Skriv ut QR',
    ADVERT_ARCHIVE: 'Arkivera',
    PROFILE_EDIT: 'Redigera din profil',
    PROFILE_SAVE: 'Spara din profil',
    SCAN_QR_CODE: 'Skanna',
    ...{
        NOTIFICATIONS_ADVERT_WAS_CREATED: 'Annonsen har skapats',
        NOTIFICATIONS_ADVERT_WAS_UPDATED: 'Annonsen har uppdaterats',
        NOTIFICATIONS_ADVERT_WAS_REMOVED: 'Annonsen har tagits bort',
        NOTIFICATIONS_ADVERT_WAS_ARCHIVED: 'Annonsen är nu arkiverad',
        NOTIFICATIONS_ADVERT_WAS_UNARCHIVED:
            'Annonsen är återställd från arkivet',
        NOTIFICATIONS_ADVERT_WAS_RESERVED: 'Annonsen är reserverad',
        NOTIFICATIONS_ADVERT_RESERVATION_WAS_CANCELLED:
            'Reservationen är borttagen',
        NOTIFICATIONS_ADVERT_WAS_COLLECTED:
            'Annonsartikeln är markerad som uthämtad',
        NOTIFICATIONS_ADVERT_CLAIM_WAS_REMOVED: 'Markeringen är borttagningen',
        NOTIFICATIONS_ADVERT_CLAIM_WAS_CHANGED: 'Markeringen har ändrats',
        NOTIFICATIONS_APIKEYS_WAS_UPDATED: 'API nycklar är uppdaterade',
        NOTIFICATIONS_CATEGORIES_WAS_UPDATED: 'Inställningarna är sparade',
        NOTIFICATIONS_LOGINS_WAS_UPDATED: 'Inställningarna är sparade',
        NOTIFICATIONS_OPTIONS_WAS_UPDATED: 'Dina ändringar är sparade',
        NOTIFICATIONS_PROFILE_WAS_UPDATED: 'Din profil är uppdaterad',
        NOTIFICATIONS_TERMS_WAS_UPDATED: 'Definitionerna är uppdaterade',
    },
    ...{
        SORT_OPTION_TITLE_ASC: 'A-Ö',
        SORT_OPTION_TITLE_DESC: 'Ö-A',
        SORT_OPTION_CREATEDAT_ASC: 'Äldst',
        SORT_OPTION_CREATEDAT_DESC: 'Nyast',
        SEARCH_EMPTY_RESULT: 'Hoppsan, det blev inga träffar på den',
    },
    ...{
        CATEGORIES_TITLE: 'Kategorier',
        LOGINS_TITLE: 'Användare & behörigheter',
        APIKEYS_TITLE: 'API nycklar',
        THEME_TITLE: 'Tema',
        THEME_ACTION_RESTORE: 'Återställ',
        THEME_ACTION_SAVE: 'Spara',
        THEME_FIELD_ERROR_COLOR: 'Fel',
        THEME_FIELD_INFO_COLOR: 'Information',
        THEME_FIELD_PRIMARY_COLOR: 'Primär färg',
        THEME_FIELD_SECONDARY_COLOR: 'Sekundär färg',
        THEME_FIELD_SUCCESS_COLOR: 'Genomfört',
        THEME_FIELD_WARNING_COLOR: 'Varning',
        THEME_SECTION_COLORS: 'Färger',
        THEME_SECTION_EDITORIAL: 'Definitioner för tema',
        ANALYTICS_TITLE: 'Webanalys',
        ANALYTICS_ACTION_SAVE: 'Spara',
        ANALYTICS_FIELD_CONFIG: 'Konfiguration',
        ANALYTICS_FIELD_PROVIDER: 'Leverantör',
        ANALYTICS_PROVIDER_OPTION_GOOGLE: 'Google',
        ANALYTICS_PROVIDER_OPTION_MATOMO: 'Matomo',
        ANALYTICS_PROVIDER_OPTION_NONE: 'Ej aktiv',
        ANALYTICS_SECTION_EDITORIAL: 'Definitioner för web-analys',
        TERMS_TITLE: 'Definitioner',
        TERMS_FIELD_ORGANIZATION: 'Organisationer',
        TERMS_FIELD_UNIT: 'Enheter',
        TERMS_FIELD_MATERIAL: 'Material',
        TERMS_FIELD_CONDITION: 'Skick',
        TERMS_FIELD_USAGE: 'Användningsområden',
        CATEGORIES_ALL_PLACEHOLDER: 'Alla Kategorier (platshållare)',
        CATEGORIES_ADD: 'Lägg till ny kategori',
        CATEGORIES_REMOVE: 'Ta bort kategori',
        CATEGORIES_SAVE: 'Spara',
        LOGINS_FIELD_PERMISSIONS: 'Email & behörigheter',
        LOGINS_DENY: 'Neka',
        LOGINS_FIELD_EMAIL: 'Email',
        LOGINS_ADD_RULE: 'Lägg till regel',
        LOGINS_SAVE: 'Spara',
        ROLES_CAN_EDIT_OWN_ADVERTS: 'Skapa annonser',
        ROLES_CAN_ARCHIVE_OWN_ADVERTS: 'Arkivera egna annonser',
        ROLES_CAN_REMOVE_OWN_ADVERTS: 'Ta bort egna annonser',
        ROLES_CAN_RESERVE_ADVERTS: 'Reservera annonser',
        ROLES_CAN_COLLECT_ADVERTS: 'Hämta ut annonser',
        ROLES_CAN_MANAGE_OWN_ADVERTS_HISTORY: 'Hantera egna annonsers historik',
        ROLES_CAN_MANAGE_ALL_ADVERTS:
            'Hantera egna och andras annonser (admin)',
        ROLES_CAN_EDIT_TERMS: 'Hantera definitioner (admin)',
        ROLES_CAN_EDIT_SYSTEM_CATEGORIES: 'Hantera system kategorier (admin)',
        ROLES_CAN_EDIT_SYSTEM_LOGIN_POLICIES:
            'Hantera systemets användare & behörigheter (admin)',
        ROLES_CAN_EDIT_API_KEYS: 'Hantera API nycklar',
        ROLES_CAN_RUN_SYSTEM_JOBS: 'Agent som får köra jobb (admin)',
        ROLES_SELECT_LABEL: 'Behörigheter',
        APIKEYS_FIELD_EMAIL: 'Email',
        APIKEYS_FIELD_KEY: 'Nyckel',
        APIKEYS_FIELD_EXPIRES: 'Giltig till',
        APIKEYS_ADD: 'Lägg till nyckel',
        APIKEYS_SAVE: 'Spara',
        PHRASES_FIELD_VALUE: 'Värde',
        PHRASES_FIELD_DEFAULT: 'Fabriksinställning',
        PHRASES_FIELD_KEY: 'ID',
    },
    ...{
        ADVERT_EDITOR_SECTION_DESCRIPTION:
            'Beskriv din annons så att den blir sökbar och ser fin ut i listningen.',
        ADVERT_EDITOR_SECTION_IMAGES: 'En bild säger mer än tusen ord!',
        ADVERT_EDITOR_SECTION_LOCATION: 'Var finns prylen?',
        ADVERT_EDITOR_SECTION_CONTACT:
            'Vem kan man kontakta angående haffningar?',
        ADVERT_EDITOR_SECTION_ADDITIONAL:
            'Om det är viktigt, kan du ange ytterligare detaljer här.',
        ADVERT_FIELD_TITLE: 'Titel',
        ADVERT_FIELD_DESCRIPTION: 'Beskrivning',
        ADVERT_FIELD_QUANTITY: 'Antal',
        ADVERT_FIELD_CATEGORY: 'Kategori',
        ADVERT_FIELD_REFERENCE: 'Egen referens',
        ADVERT_FIELD_LOCATION_ADRESS: 'Adress',
        ADVERT_FIELD_LOCATION_ZIPCODE: 'Postnummer',
        ADVERT_FIELD_LOCATION_CITY: 'Stad',
        ADVERT_FIELD_CONTACT_EMAIL: 'Email',
        ADVERT_FIELD_CONTACT_PHONE: 'Telefon',
        ADVERT_FIELD_ORGANIZATION: 'Organisation',
        ADVERT_FIELD_UNIT: 'Enhet',
        ADVERT_FIELD_MATERIAL: 'Material',
        ADVERT_FIELD_CONDITION: 'Skick',
        ADVERT_FIELD_USAGE: 'Användningsområde',
        ADVERT_UPLOAD_IMAGE: 'Välj en fin bild',
    },
    ...{
        MYADVERTS_ACTIVE: 'Aktiva',
        MYADVERTS_RESERVED: 'Reserverade',
        MYADVERTS_COLLECTED: 'Uthämtade',
        MYADVERTS_ARCHIVED: 'Arkiverade',
        MYRESERVATIONS_RESERVED: 'Reserverade',
        MYRESERVATIONS_COLLECTED: 'Uthämtat',
    },
    ...{
        ADVERT_IS_COLLECTED_BY_YOU: 'Du har hämtat {count} {unit}',
        ADVERT_CLAIM_IS_COLLECTED: '{by} hämtade {quantity} {unit} {at}',
        ADVERT_CLAIMS_MANAGE_TITLE: 'Välj hantering',
        ADVERT_CLAIMS_CANCEL_COLLECT: 'Ångra hämtning',
        ADVERT_CLAIMS_CHANGE_TO_RESERVED: 'Ändra till reservation',
        ADVERT_IS_RESERVED_BY_YOU: 'Du har reserverat {count} {unit}',
        ADVERT_CLAIM_IS_RESERVED: '{by} reserverade {quantity} {unit} {at}',
        ADVERT_CLAIMS_CANCEL_RESERVATION: 'Ångra reservation',
        ADVERT_CLAIMS_COLLECT_MANUALLY: 'Lämna ut manuellt',
    },
}

const createProductionPhraseContext = (
    phrases: Record<string, string>
): PhraseContextType => ({
    ...defaultPhrases,
    ...phrases,
    phrase: (_, template, values) =>
        values ? interpolate(template, values) : template,
    fromNow: (date) => dayjs(date).fromNow(),
    getConfig: () =>
        Object.entries(defaultPhrases).map(([key, template]) => ({
            key,
            template,
            actual: phrases[key] || '',
        })),
})

const createDevelopmentPhraseContext = (
    phrases: Record<string, string>
): PhraseContextType => {
    const recordings: Record<string, string> = {}
    const phrase: PhraseContextType['phrase'] = (key, template, values) => {
        const p = values
            ? interpolate(
                  phrases[key] || defaultPhrases[key] || template,
                  values
              )
            : template

        if (!key) {
            console.warn(`[phrases] use of unkeyed phrase ${template}`)
            return p
        }

        if (
            Object.hasOwn(defaultPhrases, key) &&
            defaultPhrases[key] !== template
        ) {
            console.warn(`[phrases] ${key} has different defaults`, {
                fromCode: template,
                fromDefinition: defaultPhrases[key],
            })
        }

        if (!recordings[key] && !Object.hasOwn(defaultPhrases, key)) {
            recordings[key] = template
            // console.log(`new phrase: ${key} => ${p}`)
            console.warn(
                `unknown phrase (${key},"${p}"). consider extending phrase config with `,
                recordings
            )
        }
        return p
    }
    const convertToGetters = (o: Record<string, string>) =>
        Object.entries(o).reduce(
            (g, [key, value]) => ({
                ...g,
                get [key]() {
                    return phrase(key, value)
                },
            }),
            {}
        )

    return {
        ...defaultPhrases,
        ...convertToGetters({
            ...defaultPhrases,
            ...phrases,
        }),
        phrase,
        fromNow: (date) => dayjs(date).fromNow(),
        getConfig: () =>
            Object.entries(defaultPhrases).map(([key, template]) => ({
                key,
                template,
                actual: phrases[key] || '',
            })),
    }
}

export const createPhraseContext = (phrases: Record<string, string>) =>
    process.env.NODE_ENV === 'production'
        ? createProductionPhraseContext(phrases)
        : createDevelopmentPhraseContext(phrases)
