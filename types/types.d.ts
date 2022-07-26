declare global {
  namespace NodeJS {
    interface Global {
      prisma: any
    }
  }
}

export interface VoteCandidateProps {
  candidates: Candidate[]
}
