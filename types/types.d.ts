import { Candidate, Vote } from "@prisma/client"

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any
    }
  }
}

export interface VoteCandidateProps {
  candidates: Candidate[]
  votes: Vote[]
}
