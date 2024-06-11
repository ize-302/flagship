DROP INDEX IF EXISTS `idIndex`;--> statement-breakpoint
CREATE UNIQUE INDEX `emailIndex` ON `users` (`email`);