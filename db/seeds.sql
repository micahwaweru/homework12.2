-- helped by SQL activity 17
use staff_db;

INSERT INTO team
    (name)
VALUES
    ('HR'),
    ('Marketing'),
    ('IT'),
    ('Accounting');

INSERT INTO role
    (title, salary, team_id)
VALUES
    ('HR Director', 200000, 1),
    ('HR Representative', 70000, 1),
    ('Marketing VP', 250000, 2),
    ('Marketing Specialist', 70000, 2),
    ('IT Manager', 150000,3),
    ('IT Tech', 50000,3),
    ('Accounting Manager', 300000, 4),
    ('Accountant', 300000, 4);

INSERT INTO role
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Toby', 'Flenderson', 1, NULL),
    ('Holly', 'Flax', 2, 1),
    ('Jan', 'Levinson', 3, NULL),
    ('Hunter', 'Smith', 4, 3),
    ('Nick', 'Thomas', 5, NULL),
    ('Ed', 'Helms', 6, 5),
    ('Angela', 'Martin', 7, NULL),
    ('Oscar', 'Martinez' 8, 7);