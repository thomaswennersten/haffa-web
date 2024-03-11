export const getCompositionQuery = /* GraphQL */ `
    query Query {
        viewComposition {
            rows {
                columns {
                    module {
                        title
                        size
                        body
                        border
                        categories
                        image
                        position
                        width
                        imageRef
                        tags
                    }
                }
            }
        }
    }
`

export const updateCompositionMutation = /* GraphQL */ `
    mutation Mutation($input: ViewCompositionInput!) {
        updateComposition(input: $input) {
            rows {
                columns {
                    module {
                        title
                        size
                        body
                        border
                        categories
                        image
                        position
                        width
                        imageRef
                        tags
                    }
                }
            }
        }
    }
`
