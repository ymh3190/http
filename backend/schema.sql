show full columns from table

drop database test;

create database test default character set utf8mb4 collate utf8mb4_general_ci;
use test;

create table user(
    id              char(32) primary key comment '유저 아이디',
    password        char(60) not null,
    role            enum('admin', 'user') not null default 'user' comment '역할',
    username        varchar(10) not null unique comment '유저 이름',
    created_at      datetime not null default current_timestamp
);

create table token(
    id              char(32) primary key comment '토큰 아이디',
    user_id         char(32) not null comment '유저 아이디 참조',
    ip              varchar(22) not null,
    is_valid        boolean not null default true,
    refresh_token   char(40) not null comment '액세스 토큰 만료시 재발급',
    user_agent      varchar(150) not null comment '브라우저',
    created_at      datetime not null default current_timestamp,
    foreign key (user_id) references user(id) on delete cascade
);

create table image(
    id              char(32) primary key,
    path            char(51) not null,
    created_at      datetime not null default current_timestamp
);

create table video(
    id              char(32) primary key,
    path            char(51) not null,
    created_at      datetime not null default current_timestamp
);

create table client(
    id              char(32) primary key comment '거래처 아이디',
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
    creator_id      char(32) not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);

create table item(
    id              char(32) primary key,
    type            enum('원료', '자재', '제품') not null,
    kind            varchar(10) not null,
    creator_id      char(32) not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);

create table commodity(
    id              char(32) primary key comment '원자재 아이디',
    item_id         char(32) not null,
    name            varchar(10) not null,
    unit            varchar(5) not null,
    price           int not null,
    specification   varchar(10) not null,
    stock    int not null,
    creator_id      char(32) not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (item_id) references item(id),
    foreign key (creator_id) references user(id)
);

create table commodity_order_plan(
    id              char(32) primary key,
    commodity_id    char(32) not null,
    count           int not null,
    client_id       char(32) not null,
    creator_id      char(32) not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (client_id) references client(id),
    foreign key (creator_id) references user(id)
);

create table commodity_warehouse(
    id              char(32) primary key,
    creator_id      char(32) not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);

create table tank(
    id              char(32) primary key,
    name            varchar(5) not null,
    created_at      datetime not null default current_timestamp
);

create table product(
    id              char(32) primary key comment '제품 아이디',
    name            varchar(10) not null,
    type            varchar(3) not null,
    unit            varchar(5) not null,
    price           int not null,
    specification   varchar(10) not null,
    safety_stock    int not null,
    creator_id      char(32) not null comment '생성자',
    created_at      datetime not null default current_timestamp,
    foreign key (creator_id) references user(id)
);
