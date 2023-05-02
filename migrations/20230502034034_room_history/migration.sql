/*
  Warnings:

  - You are about to drop the column `room_description` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `room_image` on the `Character` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "command" TEXT NOT NULL,
    "room_image" TEXT NOT NULL,
    "room_description" TEXT NOT NULL,
    CONSTRAINT "History_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "health_head" INTEGER NOT NULL,
    "health_body" INTEGER NOT NULL,
    "health_leftArm" INTEGER NOT NULL,
    "health_rightArm" INTEGER NOT NULL,
    "health_leftLeg" INTEGER NOT NULL,
    "health_rightLeg" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("health_body", "health_head", "health_leftArm", "health_leftLeg", "health_rightArm", "health_rightLeg", "id", "name", "userId") SELECT "health_body", "health_head", "health_leftArm", "health_leftLeg", "health_rightArm", "health_rightLeg", "id", "name", "userId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_userId_key" ON "Character"("userId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("id", "password", "username") SELECT "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
