create table
    if not exists lessons (
                              id uuid not null primary key,
                              title varchar(255) not null,
                              description varchar(255),
                              type_lesson varchar(50),
                              updated_at timestamp
                                     with
                                         time zone not null,
                              created_at timestamp
                                     with
                                         time zone not null,
                              url_reference varchar,
                              offset_day_learn integer,
                              contributor_id uuid [],
                              author_id uuid not null
);

alter table lessons owner to beva;

create table
    if not exists lesson_group (
                                   id uuid not null primary key,
                                   title varchar(255) not null,
                                   description varchar(255),
                                   updated_at timestamp
                                          with
                                              time zone not null,
                                   created_at timestamp
                                          with time zone not null,
                                   contributor_id uuid [],
                                   author_id uuid not null
);

alter table lesson_group owner to beva;

create table
    if not exists lesson_group_has_lesson (
                                              id uuid not null primary key,
                                              lesson_group_id uuid not null references lesson_group,
                                              lesson_id uuid not null references lessons,
                                              position integer
);

alter table lesson_group_has_lesson owner to beva;

create table
    if not exists subjects (
                               id uuid not null primary key,
                               title varchar(255) not null,
                               description varchar(255),
                               updated_at timestamp
                                      with
                                          time zone not null,
                               created_at timestamp
                                      with
                                          time zone not null,
                               type_subject varchar(20) not null,
                               subject_depend uuid null,
                               contributor_id uuid [],
                               author_id uuid not null
);

alter table subjects owner to beva;

create table
    if not exists subject_has_lesson_group (
                                               id uuid not null primary key,
                                               subject_id uuid not null references subjects,
                                               lesson_group_id uuid not null references lesson_group,
                                               position integer
);

alter table subject_has_lesson_group owner to beva;

create table
    if not exists courses (
                              id uuid not null primary key,
                              title varchar(255) not null,
                              description varchar(255),
                              updated_at timestamp
                                     with
                                         time zone not null,
                              created_at timestamp
                                     with time zone not null,
                              contributor_id uuid [],
                              author_id uuid not null,
                              type_course varchar(50) not null
);

alter table courses owner to beva;

create table
    if not exists course_has_subject (
                                         id uuid not null primary key,
                                         course_id uuid not null references courses,
                                         subject_id uuid not null references subjects
);

alter table course_has_subject owner to beva;
