const advertProps = /* GraphQL */ `
	id
	type
	createdAt
	title
	description
	quantity
	lendingPeriod
	meta {
		reservableQuantity
		collectableQuantity
		isMine
		canEdit
		canArchive
		canUnarchive
		canRemove
		canBook
		canReserve
		canCancelReservation
		canCollect
		canJoinWaitList
    	canLeaveWaitList
		canManageClaims
		canReturn
		canPick
		canUnpick
		reservedyMe
		collectedByMe
		isLendingAdvert
		isReservedBySome
		isCollectedBySome
		isPicked
		returnInfo {
			at
			quantity
		}
		claims {
			by
			at
			quantity
			type
			events {
				at
				type
			}
			canCancel
			canConvert
			isOverdue
		}
	}
	images {
		url
	}
	unit
	height
	width
	depth
	weight
	size
	material
	condition
	usage
	category
	reference
	notes
	tags

	location {
		name
		adress
		zipCode
		city
		country
	}
	contact {
		email
		phone
		organization
	}
`

const categoriesProp = /* GraphQL */ `
	categories {
			id
			parentId
			label
			co2kg
			advertCount
	}
`

const mutationProps = /* GraphQL */ `
	advert {
		${advertProps}
	}
	${categoriesProp}
	status {
		code
		message
		field
	}
`

export const getAdvertQuery = /* GraphQL */ `
query Query($id: ID!) {
	getAdvert(id: $id) {
		${advertProps}
	}
  }
 `

export const listAdvertsQuery = /* GraphQL */ `
query Query($filter: AdvertFilterInput) {
	adverts(filter: $filter) {
		adverts {
			${advertProps}
		}
		${categoriesProp}
		paging {
      nextCursor
      totalCount
			pageIndex
			pageCount
			pageSize
			pageCount
    }
	}
}
`

export const createAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$input: AdvertInput!
) {
	createAdvert(input: $input) {
		${mutationProps}
	}
}
`

export const updateAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!
	$input: AdvertInput!
) {
	updateAdvert(id: $id, input: $input) {
		${mutationProps}
	}
}
`

export const removeAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!
) {
	removeAdvert(id: $id) {
		${mutationProps}
	}
}
`

export const archiveAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!
) {
	archiveAdvert(id: $id) {
		${mutationProps}
	}
}
`

export const unarchiveAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!
) {
	unarchiveAdvert(id: $id) {
		${mutationProps}
	}
}
`

export const reserveAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!
	$quantity: Int!
) {
	reserveAdvert(id: $id, quantity: $quantity) {
		${mutationProps}
	}
}
`

export const cancelAdvertReservationMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!
) {
	cancelAdvertReservation(id: $id) {
		${mutationProps}
	}
}
`

export const collectAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!
	$quantity: Int!
) {
	collectAdvert(id: $id, quantity: $quantity) {
		${mutationProps}
	}
}
`

export const cancelAdvertClaimMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
	$by: String!,
	$type: AdvertClaimType!
) {
	cancelAdvertClaim(id: $id, by: $by, type: $type) {
		${mutationProps}
	}
}
`

export const convertAdvertClaimMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
	$by: String!,
	$type: AdvertClaimType!
	$newType: AdvertClaimType!
) {
	convertAdvertClaim(id: $id, by: $by, type: $type, newType: $newType) {
		${mutationProps}
	}
}
`

export const renewAdvertClaimMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
	$by: String!,
	$type: AdvertClaimType!
) {
	renewAdvertClaim(id: $id, by: $by, type: $type) {
		${mutationProps}
	}
}
`

export const returnAdvertMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
) {
	returnAdvert(id: $id) {
		${mutationProps}
	}
}
`

export const joinAdvertWaitlistMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
) {
	joinAdvertWaitlist(id: $id) {
		${mutationProps}
	}
}
`

export const leaveAdvertWaitlistMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
) {
	leaveAdvertWaitlist(id: $id) {
		${mutationProps}
	}
}
`

export const markAdvertAsPickedMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
) {
	markAdvertAsPicked(id: $id) {
		${mutationProps}
	}
}
`

export const markAdvertAsUnpickedMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
) {
	markAdvertAsUnpicked(id: $id) {
		${mutationProps}
	}
}
`
export const patchAdvertTagsMutation = /* GraphQL */ `
mutation Mutation(
	$id: ID!,
	$add: [String]!,
    $remove: [String]!
) {
	patchAdvertTags(id: $id, add: $add, remove: $remove) {
		${mutationProps}
	}
}
`
