CREATE TABLE `apikeys` (
	`id` text PRIMARY KEY NOT NULL,
	`api_key` text,
	`project_id` text NOT NULL,
	`owner_id` text NOT NULL,
	`created` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `environments` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`color` text,
	`project_id` text NOT NULL,
	`owner_id` text NOT NULL,
	`updated` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `flags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`key` text,
	`project_id` text NOT NULL,
	`owner_id` text NOT NULL,
	`created` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `flags_columns` (
	`id` text PRIMARY KEY NOT NULL,
	`flag_id` text NOT NULL,
	`environment_id` text,
	`owner_id` text NOT NULL,
	`is_active` integer,
	`updated` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`flag_id`) REFERENCES `flags`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`owner_id` text NOT NULL,
	`created` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`displayName` text,
	`email` text,
	`provider` text,
	`created` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `emailIndex` ON `users` (`email`);