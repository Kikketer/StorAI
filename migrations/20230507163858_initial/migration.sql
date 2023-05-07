-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "health_head" INTEGER NOT NULL,
    "health_body" INTEGER NOT NULL,
    "health_leftArm" INTEGER NOT NULL,
    "health_rightArm" INTEGER NOT NULL,
    "health_leftLeg" INTEGER NOT NULL,
    "health_rightLeg" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "command" TEXT NOT NULL,
    "room_image" TEXT,
    "room_description" TEXT,
    "room_options" TEXT,
    "raw_response" TEXT,
    "error" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "History_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
