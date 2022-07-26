import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "../../lib/prismaClient"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { portfolio, candidateId } = req.body
  const session = await getSession({ req })

  if (session?.user.provider === "credentials") {
    return res.json({ error: "You are unauthorized to Vote" })
  }

  const result = await prisma.vote.create({
    data: {
      portfolio,
      candidate: {
        connect: {
          id: candidateId,
        },
      },
      User: {
        connect: {
          email: session?.user.email as string,
        },
      },
    },
  })

  return res.json(result)
}
