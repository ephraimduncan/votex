import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "../../../lib/prismaClient"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, programme, portfolio } = req.body
  const session = await getSession({ req })

  console.log("/api/admin/create", session)

  if (session?.user.provider === "google") {
    return res.json({ error: "You are unauthorized to create a new Candidate" })
  }

  const result = await prisma.candidate.create({
    data: {
      name: name,
      portfolio: portfolio,
      programme: programme,
    },
  })

  return res.json(result)
}
