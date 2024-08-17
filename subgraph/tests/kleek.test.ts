import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { AttendeesChecked } from "../generated/schema"
import { AttendeesChecked as AttendeesCheckedEvent } from "../generated/Kleek/Kleek"
import { handleAttendeesChecked } from "../src/kleek"
import { createAttendeesCheckedEvent } from "./kleek-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let eventId = BigInt.fromI32(234)
    let attendees = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let data = Bytes.fromI32(1234567890)
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let timestamp = BigInt.fromI32(234)
    let newAttendeesCheckedEvent = createAttendeesCheckedEvent(
      eventId,
      attendees,
      data,
      sender,
      timestamp
    )
    handleAttendeesChecked(newAttendeesCheckedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AttendeesChecked created and stored", () => {
    assert.entityCount("AttendeesChecked", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AttendeesChecked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eventId",
      "234"
    )
    assert.fieldEquals(
      "AttendeesChecked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "attendees",
      "[0x0000000000000000000000000000000000000001]"
    )
    assert.fieldEquals(
      "AttendeesChecked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )
    assert.fieldEquals(
      "AttendeesChecked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AttendeesChecked",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
