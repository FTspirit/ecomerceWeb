-- The uuid-ossp module provides some handy functions that implement standard algorithms for generating UUIDs.

-- To install the uuid-ossp module, you use the CREATE EXTENSION statement as follows

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert list permission for admin

INSERT INTO
    account_permissions (description, slug, routes, path, role_type)
VALUES
    (
        'Tổng quan',
        'management-overview-admin',
        null,
        null,
        'management-admin'
    ),
    (
        'Tổng quan',
        'management-overview-student',
        null,
        null,
        'management-student'
    ),(
        'Tổng quan',
        'management-overview-mentor',
        null,
        null,
        'management-mentor'
    ),(
        'Tổng quan',
        'management-overview-exam',
        null,
        null,
        'management-exam'
    ),(
        'Tổng quan',
        'management-overview-course',
        null,
        null,
        'management-course'
    ),(
        'Quản lý sinh viên',
        'management-student',
        ARRAY ['/admin/student' ],
        ARRAY['/list-student',
            '/detail-student/:id',
            '/create-student',
            '/edit-student/:id'],
        'management-student'
    ), (
        'Quản lý mentor',
        'management-mentor',
        ARRAY ['/admin/mentor'],
        ARRAY['/list-mentor',
            '/detail-mentor/:id',
            '/create-mentor',
            '/edit-mentor/:id'],
        'management-mentor'
    ), (
        'Quản lý thi',
        'management-exam',
        ARRAY ['/admin/exam'],
        ARRAY['/',
            '/'],
        'management-exam'
    ), (
        'Quản lý giáo trình',
        'management-course',
        ARRAY ['/admin/course'],
        null,
        'management-course'
    ), (
        'Quản lý admin',
        'management-admin',
        ARRAY ['/admin/course'],
        ARRAY ['/list-admin',
            '/detail-admin/:id',
            '/create-admin'],
        'management-admin'
    ),(
        'Học viên',
        'student-overview',
        null,
        null,
        'student'
    ),
    (
        'Tổng quan mentor',
        'mentor-overview',
        null,
        null,
        'mentor-course'
    ),
    (
        'Quản lý course',
        'course-management',
        null,
        null,
        'mentor-course'
    ),
    (
        'Chat',
        'chat',
        null,
        ARRAY [
            '/mentee-chat/pending',
            '/mentee-chat/processing'
            ],
        'mentor-course'
    ),
    (
        'Phỏng vấn',
        'interview',
        null,
        ARRAY [
            '/interview'
            ],
        'mentor-course'
    ),
    (
        'Quản lý support',
        'support-management',
        null,
        ARRAY [
            '/support-management'
            ],
        'mentor-course'
    ),
    ('Đăng ký lịch',
     'schedule-register',
     null,
     ARRAY [
         '/schedule-register'
         ],
     'mentor-course'
     ),
    ('Cài đặt',
     'settings',
     null,
     ARRAY [
         '/settings'
         ],
     'mentor-course'
    ), (
        'Tổng quan mentor',
        'mentor-overview',
        null,
        null,
        'mentor-support'
    ),
    (
        'Chat',
        'chat',
        null,
        ARRAY [
            '/mentee-chat/pending',
            '/mentee-chat/processing'
            ],
        'mentor-support'
    ),
    (
        'Phỏng vấn',
        'interview',
        null,
        ARRAY [
            '/interview'
            ],
        'mentor-support'
    ),
    (
        'Quản lý support',
        'support-management',
        null,
        ARRAY [
            '/support-management'
            ],
        'mentor-support'
    ),
    ('Đăng ký lịch',
     'schedule-register',
     null,
     ARRAY [
         '/schedule-register'
         ],
     'mentor-support'
     ),
    ('Cài đặt',
     'settings',
     null,
     ARRAY [
         '/settings'
         ],
     'mentor-support'
    );


-- Create supper admin account

INSERT INTO
    admins (
    email_register,
    email_login,
    name,
    password,
    created_at,
    updated_at,
    is_supper_admin
)
VALUES (
           'linhbm@lumi.vn',
           'linhbm@beva.edu',
           'Bùi Mạnh Linh',
           '$2a$08$F34rQumGaJGBaXdxeXFrE.EjQo.PYWt.TUQA7GtFtJP6UGDgbBpw.',
           '2023-03-22T17:59:09.364Z',
           '2023-03-22T17:59:09.364Z',
           true
       );
