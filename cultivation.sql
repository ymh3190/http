drop database cultivation;

create database cultivation default character set utf8mb4 collate utf8mb4_general_ci;
use cultivation;

-- 타입 결정 근거
-- 감지 혹은 측정 테이블의 PK가 int(4bytes)인 이유
-- 1분 데이터를 평균하여 저장한다는 전제로
-- 하루 1440개, 1년 525,600개 21억개까지 약 400년 소요
-- 색인시 문자열보다 숫자형 타입이 더 좋은 성능을 내는것으로 알고있음
-- cf) mediumint unsigned(3bytes)적용시 1500만개까지 30년 소요

-- boolean(1byte): On/Off 2가지 상태만 존재하기에

-- datetime: 8bytes '2024-05-10 13:10:05' 더 적은 용량이므로
-- char(14): 14bytes '20240510131005'
-- varchar(14): 15bytes '20240510131005'

-- 재배기측 센서 감지
create table detection_cult(
    id int primary key auto_increment,
    is_open_tp_hum_co2 boolean not null comment '온도/습도/CO2 단선 알람 On: true, Off: false',
    is_limited_max_tp boolean not null comment '온도 상한 알람 On: true, Off: false',
    is_limited_min_tp boolean not null comment '온도 하한 알람 On: true, Off: false',
    is_limited_max_hum boolean not null comment '습도 상한 알람 On: true, Off: false',
    is_limited_min_hum boolean not null comment '습도 하한 알람 On: true, Off: false',
    is_limited_co2 boolean not null comment 'CO2 알람 On: true, Off: false',
    is_pump_valve boolean not null comment '펌프/밸브 On/Off 알람 On: true, Off: false',
    is_led1 boolean not null comment 'LED1 On/Off 알람 On: true, Off: false',
    is_led2 boolean not null comment 'LED2 On/Off 알람 On: true, Off: false',
    detected_at datetime not null comment '감지 시각'
);

-- 물탱크측 센서 감지
create table detection_wt(
    id int primary key auto_increment,
    is_open_tp_ph boolean not null comment '온도/pH 단선 알람 On: true, Off: false',
    is_open_ec boolean not null comment 'EC 단선 알람 On: true, Off: false',
    is_limited_max_tp boolean not null comment '온도 상한 알람 On: true, Off: false',
    is_limited_min_tp boolean not null comment '온도 하한 알람 On: true, Off: false',
    is_ph boolean not null comment 'pH 알람 On: true, Off: false',
    is_ec boolean not null comment 'EC 알람 On: true, Off: false',
    is_water_level boolean not null comment '수위 알람 On: true, Off: false',
    is_cooler boolean not null comment '냉각기 On/Off 알람 On: true, Off: false',
    detected_at datetime not null comment '감지 시각'
);

-- 재배기측 센서 측정
create table measure_cult(
    id int primary key auto_increment,
    tp float not null comment '온도',
    hum float not null comment '습도',
    co2 float not null comment 'CO2',
    measured_at datetime not null comment '측정 시각'
);

-- 물탱크측 센서 측정
create table measure_wt(
    id int primary key auto_increment,
    tp float not null comment '온도',
    ph float not null comment 'pH',
    ec float not null comment 'EC',
    measured_at datetime not null comment '측정 시각'
);

-- 재배기측 설정
create table config_cult(
    id int primary key auto_increment,
    limited_max_tp float not null comment '온도 상한',
    limited_min_tp float not null comment '온도 하한',
    limited_max_hum float not null comment '습도 상한',
    limited_min_hum float not null comment '습도 하한',
    limited_co2 float not null comment 'CO2',
    led1_on_hr tinyint not null comment 'LED1 동작 시간',
    led1_on_min tinyint not null comment 'LED1 동작 분',
    led1_off_hr tinyint not null comment 'LED1 정지 시간',
    led1_off_min tinyint not null comment 'LED1 정지 분',
    led2_on_hr tinyint not null comment 'LED2 동작 시간',
    led2_on_min tinyint not null comment 'LED2 동작 분',
    led2_off_hr tinyint not null comment 'LED2 정지 시간',
    led2_off_min tinyint not null comment 'LED2 정지 분',
    pump_valve_on_hr tinyint not null comment '펌프/밸브 동작 시간',
    pump_valve_on_min tinyint not null comment '펌프/밸브 동작 분',
    pump_valve_off_hr tinyint not null comment '펌프/밸브 정지 시간',
    pump_valve_off_min tinyint not null comment '펌프/밸브 정지 분',
    created_at datetime not null default current_timestamp comment '생성 일자'
);

-- 물탱크측 설정
create table config_wt(
    id int primary key auto_increment,
    limited_max_tp float not null comment '온도 상한',
    limited_min_tp float not null comment '온도 하한',
    ph float not null comment 'pH',
    ec float not null comment 'EC',
    created_at datetime not null default current_timestamp comment '생성 일자'
);

-- 제어 코드
create table control_code(
    id int primary key auto_increment,
    code_name varchar(25) not null unique,
    control_name varchar(30) not null unique,
    created_at datetime not null default current_timestamp comment '생성 일자'
);

-- 제어 코드 실 데이터
insert into control_code(code_name, control_name) values('is_system_on', '전체 System 시작/정지');
insert into control_code(code_name, control_name) values('is_pump1_value_time_on', '재배기 Pump1/Valve 시간 적용');
insert into control_code(code_name, control_name) values('is_led1_time_on', '재배기 LED1 시간 적용');
insert into control_code(code_name, control_name) values('is_led2_time_on', '재배기 LED2 시간 적용');
insert into control_code(code_name, control_name) values('is_manual_cult', '재배기 자동/수동 전환');
insert into control_code(code_name, control_name) values('is_manual_pump1_value_on', '재배기 Pump1/Valve 수동 On/Off');
insert into control_code(code_name, control_name) values('is_manual_led1', '재배기 LED1 수동 On/Off');
insert into control_code(code_name, control_name) values('is_manual_led2', '재배기 LED2 수동 On/Off');
insert into control_code(code_name, control_name) values('is_manual_pump2_cooler', '재배기 Pump2/Cooler 수동 On/Off');

-- 재배기측 제어
create table control_cult(
    id int primary key auto_increment,
    control_code_id int not null,
    created_at datetime not null default current_timestamp comment '생성 일자',
    foreign key (control_code_id) references control_code(id)
);

-- 물탱크측 제어
create table control_wt(
    id int primary key auto_increment,
    control_code_id int not null,
    created_at datetime not null default current_timestamp comment '생성 일자',
    foreign key (control_code_id) references control_code(id)
);

-- 알람 코드
create table alarm_code(
    id int primary key auto_increment,
    alarm_name varchar(10) not null unique comment '알람 이름',
    created_at datetime not null default current_timestamp comment '생성 일자'
);

-- 알람 이력
create table alarm_history(
    id int primary key auto_increment,
    alarm_code_id int not null,
    created_at datetime not null default current_timestamp comment '생성 일자',
    foreign key (alarm_code_id) references alarm_code(id)
);
