import { createContext } from 'react'
import dayjs from 'dayjs'
import { interpolate } from 'lib/interpolate'

export interface PhraseContextType {
    APP_TITLE: string
    INFO_SLOW_CONNECTION: string
    ERROR_UNAUTHORIZED: string
    ERROR_NOT_FOUND: string
    ERROR_UNKNOWN: string
    SIGNOUT: string
    NAV_HOME: string
    NAV_MY_ADVERTS: string
    NAV_MY_RESERVATIONS: string
    NAV_PROFILE: string
    CREATE_ADVERT: string
    EDIT_ADVERT: string
    SAVE_ADVERT: string
    REMOVE_ADVERT: string
    EDIT_PROFILE: string
    SAVE_PROFILE: string
    SCAN_QR_CODE: string
    PICKUP_ADVERT: string
    phrase: (
        key: string,
        defaultTemplateString: string,
        templateVariables?: Record<string, string | number>
    ) => string
    fromNow: (date: string) => string
}
export const PhraseContext = createContext<PhraseContextType>({
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
    CREATE_ADVERT: 'Skapa annons',
    EDIT_ADVERT: 'Redigera annons',
    SAVE_ADVERT: 'Spara annonsen',
    REMOVE_ADVERT: 'Ta bort annonsen',
    EDIT_PROFILE: 'Redigera din profil',
    SAVE_PROFILE: 'Spara din profil',
    SCAN_QR_CODE: 'Skanna kod',
    PICKUP_ADVERT: 'Jag tar med mig prylen nu!',
    phrase: (_, template, values) =>
        values ? interpolate(template, values) : template,
    fromNow: (date) => dayjs(date).fromNow(),
})
