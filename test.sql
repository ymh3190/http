show full columns from table_name

alter table table_name add column_name int after another_column_name;
alter table table_name add foreign key (column_name) references table_name(id);
alter table table_name add unique (column_name, column_name2, column_name3);
alter table table_name modify column_name type;

drop database test;

create database test default character set utf8mb4 collate utf8mb4_general_ci;
use test;

create table user(
    id              int primary key auto_increment comment '유저 아이디',
    password        char(60) not null,
    role            enum('admin', 'user') not null default 'user' comment '역할',
    username        varchar(10) not null unique comment '유저 이름',
    created_at      datetime not null default current_timestamp
);

create table token(
    id              int primary key auto_increment comment '토큰 아이디',
    user_id         int not null comment '유저 아이디 참조',
    ip              varchar(22) not null,
    is_valid        boolean not null default true,
    refresh_token   char(40) not null comment '액세스 토큰 만료시 재발급',
    user_agent      varchar(150) not null comment '브라우저',
    created_at      datetime not null default current_timestamp,
    foreign key (user_id) references user(id) on delete cascade
);

create table image(
    id              int primary key auto_increment,
    file            varchar(16) not null unique,
    path            varchar(52) not null,
    created_at      datetime not null default current_timestamp
);

create table video(
    id              int primary key auto_increment,
    file            varchar(16) not null unique,
    path            varchar(51) not null,
    created_at      datetime not null default current_timestamp
);

create table genre(
    id              int primary key auto_increment,
    name            varchar(5) not null,
    video_id        int,
    image_id        int,
    created_at      datetime not null default current_timestamp,
    foreign key (video_id) references video(id),
    foreign key (image_id) references image(id),
    unique key (name, video_id),
    unique key (name, image_id)
);

create table client(
    id              int primary key auto_increment comment '거래처 아이디',
    type            enum('거래사', '공급업체') not null comment '거래처 유형',
    company         varchar(20) not null comment '회사 명',
    tel             varchar(20) not null comment '회사 번호',
    fax             varchar(20) not null comment '회사 팩스',
    address         varchar(50) not null comment '회사 주소',
    tax_no          char(10) not null comment '사업자 번호',
    corp_no         varchar(15) not null comment '법인 등록 번호',
    manager_name    varchar(10) not null comment '담당자 명',
    manager_tel     varchar(15) not null comment '담당자 번호',
    ceo_name        varchar(10) not null comment '대표 명',
    ceo_tel         varchar(15) not null comment '대표 번호',
    comment         varchar(50) not null comment '메모',
    creator_id      int not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);

create table item(
    id              int primary key auto_increment,
    type            enum('원료', '자재', '제품') not null,
    kind            varchar(10) not null,
    creator_id      int not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);

create table commodity(
    id              int primary key auto_increment comment '원자재 아이디',
    item_id         int not null,
    name            varchar(10) not null,
    unit            varchar(5) not null,
    price           int not null,
    specification   varchar(10) not null,
    stock    int not null,
    creator_id      int not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (item_id) references item(id),
    foreign key (creator_id) references user(id)
);

create table commodity_order_plan(
    id              int primary key auto_increment,
    commodity_id    int not null,
    count           int not null,
    client_id       int not null,
    creator_id      int not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (client_id) references client(id),
    foreign key (creator_id) references user(id)
);

create table commodity_warehouse(
    id              int primary key auto_increment,
    creator_id      int not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);

create table tank(
    id              int primary key auto_increment,
    name            varchar(5) not null,
    created_at      datetime not null default current_timestamp
);

create table product(
    id              int primary key auto_increment comment '제품 아이디',
    name            varchar(10) not null,
    type            varchar(3) not null,
    unit            varchar(5) not null,
    price           int not null,
    specification   varchar(10) not null,
    safety_stock    int not null,
    creator_id      int not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);
