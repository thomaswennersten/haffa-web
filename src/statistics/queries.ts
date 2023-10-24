export const getEventsQuery = /* GraphQL */ `
    query Query($from: String, $to: String) {
        events(from: $from, to: $to) {
            event
            at
            quantity
            organization
            category
            co2kg
        }
    }
`
