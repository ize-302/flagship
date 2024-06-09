CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text,
	`password` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usernameIndex` ON `users` (`username`);