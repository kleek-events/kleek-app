'use server'

import dayjs from 'dayjs'

const subgraphUri = process.env.SUBGRAPH_API_URL || ''

export async function getAllEvents() {
  const today = dayjs().endOf('day').unix()

  const response = await fetch(subgraphUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
            eventCreateds(where: {endDate_gt: ${today}}, orderBy: timestamp, orderDirection: desc) {
                id  
                eventId
                owner
                contentUri
                endDate
                timestamp
                transactionHash
            }
      }`,
    }),
  })

  if (!response.ok) {
    console.error('Failed to fetch record', response)
    throw new Error('Failed to fetch records')
  }

  const { data } = await response.json()
  return data.eventCreateds
}

export async function getEvent(id: number) {
  const response = await fetch(subgraphUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
              eventCreateds(where: {eventId: ${id}}) {
                eventId
                owner
                contentUri
                endDate
                timestamp
                transactionHash
            }
      }`,
    }),
  })

  if (!response.ok) {
    console.error('Failed to fetch record', response)
    throw new Error('Failed to fetch records')
  }

  const { data } = await response.json()
  return data.eventCreateds[0]
}

function getEventsByUser(user: string) {}
