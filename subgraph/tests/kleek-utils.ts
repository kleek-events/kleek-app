import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
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
  Upgraded
} from "../generated/Kleek/Kleek"

export function createAttendeesCheckedEvent(
  eventId: BigInt,
  attendees: Array<Address>,
  data: Bytes,
  sender: Address,
  timestamp: BigInt
): AttendeesChecked {
  let attendeesCheckedEvent = changetype<AttendeesChecked>(newMockEvent())

  attendeesCheckedEvent.parameters = new Array()

  attendeesCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  attendeesCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "attendees",
      ethereum.Value.fromAddressArray(attendees)
    )
  )
  attendeesCheckedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  attendeesCheckedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  attendeesCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return attendeesCheckedEvent
}

export function createConditionModuleWhitelistedEvent(
  module: Address,
  name: string,
  whitelisted: boolean,
  sender: Address,
  timestamp: BigInt
): ConditionModuleWhitelisted {
  let conditionModuleWhitelistedEvent = changetype<ConditionModuleWhitelisted>(
    newMockEvent()
  )

  conditionModuleWhitelistedEvent.parameters = new Array()

  conditionModuleWhitelistedEvent.parameters.push(
    new ethereum.EventParam("module", ethereum.Value.fromAddress(module))
  )
  conditionModuleWhitelistedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  conditionModuleWhitelistedEvent.parameters.push(
    new ethereum.EventParam(
      "whitelisted",
      ethereum.Value.fromBoolean(whitelisted)
    )
  )
  conditionModuleWhitelistedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  conditionModuleWhitelistedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return conditionModuleWhitelistedEvent
}

export function createEventCanceledEvent(
  eventId: BigInt,
  reason: string,
  data: Bytes,
  sender: Address,
  timestamp: BigInt
): EventCanceled {
  let eventCanceledEvent = changetype<EventCanceled>(newMockEvent())

  eventCanceledEvent.parameters = new Array()

  eventCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  eventCanceledEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )
  eventCanceledEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  eventCanceledEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  eventCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return eventCanceledEvent
}

export function createEventCreatedEvent(
  eventId: BigInt,
  owner: Address,
  contentUri: string,
  endDate: BigInt,
  timestamp: BigInt
): EventCreated {
  let eventCreatedEvent = changetype<EventCreated>(newMockEvent())

  eventCreatedEvent.parameters = new Array()

  eventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam("contentUri", ethereum.Value.fromString(contentUri))
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return eventCreatedEvent
}

export function createEventSettledEvent(
  eventId: BigInt,
  data: Bytes,
  sender: Address,
  timestamp: BigInt
): EventSettled {
  let eventSettledEvent = changetype<EventSettled>(newMockEvent())

  eventSettledEvent.parameters = new Array()

  eventSettledEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  eventSettledEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  eventSettledEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  eventSettledEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return eventSettledEvent
}

export function createEventUpdatedEvent(
  eventId: BigInt,
  owner: Address,
  contentUri: string,
  timestamp: BigInt
): EventUpdated {
  let eventUpdatedEvent = changetype<EventUpdated>(newMockEvent())

  eventUpdatedEvent.parameters = new Array()

  eventUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  eventUpdatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  eventUpdatedEvent.parameters.push(
    new ethereum.EventParam("contentUri", ethereum.Value.fromString(contentUri))
  )
  eventUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return eventUpdatedEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createNewEnrolleeEvent(
  eventId: BigInt,
  enrollee: Address,
  sender: Address,
  timestamp: BigInt
): NewEnrollee {
  let newEnrolleeEvent = changetype<NewEnrollee>(newMockEvent())

  newEnrolleeEvent.parameters = new Array()

  newEnrolleeEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  newEnrolleeEvent.parameters.push(
    new ethereum.EventParam("enrollee", ethereum.Value.fromAddress(enrollee))
  )
  newEnrolleeEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  newEnrolleeEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return newEnrolleeEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
