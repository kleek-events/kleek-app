import {
  AttendeesChecked as AttendeesCheckedEvent,
  ConditionModuleWhitelisted as ConditionModuleWhitelistedEvent,
  EventCanceled as EventCanceledEvent,
  EventCreated as EventCreatedEvent,
  EventSettled as EventSettledEvent,
  EventUpdated as EventUpdatedEvent,
  Initialized as InitializedEvent,
  NewEnrollee as NewEnrolleeEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
  Upgraded as UpgradedEvent,
} from '../generated/Kleek/Kleek'
import {
  AttendeesChecked,
  ConditionModuleWhitelisted,
  EventCanceled,
  EventCreated,
  EventSettled,
  EventUpdated,
  Initialized,
  NewEnrollee,
  OwnershipTransferred,
  Paused,
  Unpaused,
  Upgraded,
} from '../generated/schema'

export function handleAttendeesChecked(event: AttendeesCheckedEvent): void {
  let entity = new AttendeesChecked(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.eventId = event.params.eventId
  // entity.attendees = event.params.attendees
  entity.data = event.params.data
  entity.sender = event.params.sender
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleConditionModuleWhitelisted(event: ConditionModuleWhitelistedEvent): void {
  let entity = new ConditionModuleWhitelisted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.module = event.params.module
  entity.name = event.params.name
  entity.whitelisted = event.params.whitelisted
  entity.sender = event.params.sender
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventCanceled(event: EventCanceledEvent): void {
  let entity = new EventCanceled(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.eventId = event.params.eventId
  entity.reason = event.params.reason
  entity.data = event.params.data
  entity.sender = event.params.sender
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventCreated(event: EventCreatedEvent): void {
  let entity = new EventCreated(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.eventId = event.params.eventId
  entity.owner = event.params.owner
  entity.contentUri = event.params.contentUri
  entity.endDate = event.params.endDate
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventSettled(event: EventSettledEvent): void {
  let entity = new EventSettled(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.eventId = event.params.eventId
  entity.data = event.params.data
  entity.sender = event.params.sender
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventUpdated(event: EventUpdatedEvent): void {
  let entity = new EventUpdated(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.eventId = event.params.eventId
  entity.owner = event.params.owner
  entity.contentUri = event.params.contentUri
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewEnrollee(event: NewEnrolleeEvent): void {
  let entity = new NewEnrollee(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.eventId = event.params.eventId
  entity.enrollee = event.params.enrollee
  entity.sender = event.params.sender
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
