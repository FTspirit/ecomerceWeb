create table
    if not exists mentors (
                              id uuid not null primary key,
                              email_register varchar(255) default NULL:: character varying,
                              email_login varchar(255) default NULL:: character varying,
                              name varchar not null,
                              password varchar(255) default NULL:: character varying,
                              man_hour integer,
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
                                     with
                                         time zone,
                              mentor_permission varchar(50),
                              address varchar(255),
                              citizen_identification_card varchar(255) not null,
                              bank_name varchar(255) not null,
                              bank_account varchar(255) not null,
                                  course_supports uuid []
);

create table
    if not exists mentor_authentications (
                                             id uuid not null primary key,
                                             mentor_id uuid not null references mentors on delete cascade,
                                             refresh_token varchar(255),
                                             expires_at timestamp
                                                    with time zone
);
