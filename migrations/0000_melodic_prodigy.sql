CREATE TABLE `notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`isArchived` integer DEFAULT false,
	`created_at` text DEFAULT (current_timestamp),
	`updated_at` integer DEFAULT (unixepoch())
);
