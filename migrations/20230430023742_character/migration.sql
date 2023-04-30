-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "health_head" INTEGER NOT NULL,
    "health_body" INTEGER NOT NULL,
    "health_leftArm" INTEGER NOT NULL,
    "health_rightArm" INTEGER NOT NULL,
    "health_leftLeg" INTEGER NOT NULL,
    "health_rightLeg" INTEGER NOT NULL
);
