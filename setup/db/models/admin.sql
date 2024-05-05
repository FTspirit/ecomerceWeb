create table
    account_permissions (
        id uuid not null primary key DEFAULT uuid_generate_v4 (),
        description varchar(255) not null,
        slug varchar(255) not null,
        role_type varchar(255) not null,
        routes varchar(50) [],
        path varchar(50) []
    );

alter table account_permissions owner to beva;

create table
    admins (
        id uuid not null primary key DEFAULT uuid_generate_v4 (),
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
        with
            time zone,
            is_supper_admin boolean default false,
            is_active boolean default true
    );

alter table admins owner to beva;

create table
    admin_authentications (
        id uuid not null primary key DEFAULT uuid_generate_v4 (),
        admin_id uuid not null references admins on delete cascade,
        refresh_token varchar(255),
        expires_at timestamp
        with time zone
    );

alter table admin_authentications owner to beva;

create table
    admin_has_roles (
                       id uuid not null primary key DEFAULT uuid_generate_v4 (),
                       admin_id uuid not null references admins on delete cascade,
                       role_type varchar(255) not null,
                       is_enable boolean not null
);

alter table admin_has_roles owner to beva;

