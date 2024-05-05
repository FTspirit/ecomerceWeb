CREATE TABLE
    IF NOT EXISTS students (
        id uuid not null primary key,
        email_register varchar(255) default NULL:: character varying,
        email_login varchar(255) default NULL:: character varying,
        name varchar not null,
        password varchar(255) default NULL:: character varying,
        created_at timestamp
        with
            time zone not null,
        updated_at timestamp
        with
            time zone not null,
        suspended_at timestamp
        with
            time zone,
        flags jsonb,
        is_deleted boolean default false,
        deleted_at timestamp
        with time zone,
        student_permission varchar(50)
    );

CREATE TABLE
    IF NOT EXISTS student_authentications (
        id uuid not null primary key,
        student_id uuid not null references students on delete cascade,
        access_token varchar(255),
        refresh_token varchar(255)
    );