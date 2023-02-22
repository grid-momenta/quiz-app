/*
  Warnings:

  - You are about to drop the column `email` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `questions` table. All the data in the column will be lost.
  - Added the required column `title` to the `quizzes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quizzes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_quizzes" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "quizzes";
DROP TABLE "quizzes";
ALTER TABLE "new_quizzes" RENAME TO "quizzes";
CREATE TABLE "new_answers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answer" TEXT NOT NULL,
    "isRight" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "questionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_answers" ("createdAt", "id", "questionId", "updatedAt") SELECT "createdAt", "id", "questionId", "updatedAt" FROM "answers";
DROP TABLE "answers";
ALTER TABLE "new_answers" RENAME TO "answers";
CREATE UNIQUE INDEX "answers_questionId_key" ON "answers"("questionId");
CREATE TABLE "new_questions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "quizId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questions" ("createdAt", "id", "quizId", "updatedAt") SELECT "createdAt", "id", "quizId", "updatedAt" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
CREATE UNIQUE INDEX "questions_quizId_key" ON "questions"("quizId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
