-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "twitter" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
