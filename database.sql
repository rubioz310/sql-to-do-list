CREATE TABLE "ToDoList"(
	"id" serial primary key,
	"task" varchar(250) not null,
	"isComplete" boolean not null
);

INSERT INTO "ToDoList" ("task", "isComplete")
		VALUES ('Finish homework', false);