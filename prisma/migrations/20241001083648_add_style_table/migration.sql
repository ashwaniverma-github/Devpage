-- CreateTable
CREATE TABLE "Style" (
    "id" TEXT NOT NULL,
    "pageStyle" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Style_userId_key" ON "Style"("userId");

-- AddForeignKey
ALTER TABLE "Style" ADD CONSTRAINT "Style_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
