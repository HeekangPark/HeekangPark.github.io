---
title: "MySQL vs. PostgreSQL vs. MongoDB"
date_created: "2022-11-25"
date_modified: "2022-12-05"
tags: DBMS, MySQL, PostgreSQL, MongoDB
---

<style>
  .document-content > ul ul,
  .document-content > ul ol,
  .document-content > ol ul,
  .document-content > ol ol {
    margin-bottom: 0 !important;
  }
</style>

본 문서에서는 MySQL, PostgreSQL, MongoDB를 비교 분석한다.

2022년 11월 기준 최신 버전을 기준으로 분석하였다.

- MySQL : Community Edition, version 8
- PostgreSQL : version 15
- MongoDB : Comunity Edition, version 6

# 운영적 관점

## 라이선스, 관리/개발 주체, 점유율

MySQL(Comunity Edition), PostgreSQL, MongoDB는 모두 오픈소스이고 무료로 사용할 수 있다.

각 DBMS의 라이센스는 다음과 같다.

- MySQL : [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)
- PostgreSQL : [PostgreSQL License](https://opensource.org/licenses/postgresql)[^1-1-1]
- MongoDB : [MongoDB Server Side Public License(SSPL)](https://www.mongodb.com/licensing/server-side-public-license)[^1-1-2]

[^1-1-1]: BSD, MIT와 유사한 라이선스이다.
[^1-1-2]: AGPL과 유사한 라이선스이다.

각 DBMS의 관리/개발 주체는 다음과 같다.

- MySQL : Oracle
- PostgreSQL : PostgreSQL Global Development Group
- MongoDB : MongoDB Inc.

MySQL, PostgreSQL, MongoDB는 모두 C/C++로 구현되어 있다.

DBMS를 많은 사람들이 사용한다는 것은 그만큼 안정적이고, 성능이 좋고, 범용적이고(다양한 기능을 제공하고), 문제 발생 시 해결 방법이 많다는 것을 의미한다. 2022년 11월 현재 DBMS의 순위는 다음과 같다.[^1-1-3]

[^1-1-3]: 출처 : <https://db-engines.com/en/ranking>

- MySQL : 2위
- PostgreSQL : 4위
- MongoDB : 5위

## 핵심 컨셉

각 DBMS를 한 마디로 설명하면 다음과 같다.

- MySQL : 관계형 데이터베이스(RDB, Relational Database) 관리 시스템
- PostgreSQL : 객체-관계형 데이터베이스(ORDB, Object-Relational Database) 관리 시스템
- MongoDB : NoSQL, 문서 지향 데이터베이스(Document-Oriented Database) 관리 시스템

# 사용적 관점

## 데이터 논리 구조

각 DB가 데이터를 어떤 논리적 구조로 저장하는지 알아보자.

- MySQL
  - 엔티티(entity)는 2차원 테이블(table)의 한 행(row = tuple = record)으로 저장된다.
    - 엔티티의 각 속성은 각 행의 열(column = attribute = field)로 저장된다.
  - 하나의 데이터베이스(database)는 여러 개의 테이블로 구성된다.
- PostgreSQL
  - 엔티티(entity)는 2차원 테이블(table)의 한 행(row = tuple = record)으로 저장된다.
    - 엔티티의 각 속성은 테이블의 열(column = attribute = field)로 저장된다.
  - 하나의 스키마(schema)는 여러 개의 2차원 테이블(table)로 구성된다.
    - 스키마는 테이블들이 속한 논리적인 그룹이다(일종의 네임스페이스(namespace)라 이해하면 좋다).
  - 하나의 데이터베이스(database)는 여러 개의 스키마로 구성된다.
- MongoDB
  - 엔티티(entity)는 JSON 포멧(key-value)의 문서(document)로 저장된다.
    - 엔티티의 각 속성은 문서의 필드(field = key)로 저장된다.
    - 문서는 다른 문서를 포함할 수 있다.
    - 문서에는 스키마가 없다(schemaless).
  - 하나의 컬렉션(collection)은 여러 개의 문서(document)로 구성된다.
  - 하나의 데이터베이스(database)는 여러 개의 컬렉션으로 구성된다.

## 언어

MySQL과 PostgreSQL은 SQL standard를 따르기 때문에 대부분의 명령어가 비슷하다. 반면 MongoDB는 (NoSQL답게) SQL을 사용하지 않는다. MongoDB는 MQL(MongoDB Query Language)라 불리는 독자적인 language를 사용한다.

각 DBMS별로 간단히 CRUD 명령어를 나열하면 다음과 같다.

- MySQL
  - DB 추가 : `CREATE DATABASE <DB 이름>`
  - DB 조회 : `SHOW DATABASES`
  - DB 삭제 : `DROP DATABASE <DB 이름>`
  - 테이블 추가 : `CREATE TABLE <테이블 이름> (<속성 이름> <데이터 타입> <제약 조건>)`
  - 테이블 조회 : `SHOW TABLES`
  - 테이블 삭제 : `DROP TABLE <테이블 이름>`
  - 테이블 변경 : `ALTER TABLE <테이블 이름> <변경 명령>`
  - 엔티티 추가 : `INSERT INTO <테이블 이름> (<속성 이름>, ...) VALUES (<속성 값>, ...)`
  - 엔티티 조회 : `SELECT <속성 이름>, ... FROM <테이블 이름> WHERE <조건>`
  - 엔티티 수정 : `UPDATE <테이블 이름> SET <속성 이름> = <속성 값>, ... WHERE <조건>`
  - 엔티티 삭제 : `DELETE FROM <테이블 이름> WHERE <조건>`
- PostgreSQL
  - DB 추가 : `CREATE DATABASE <DB 이름>`
  - DB 조회 : `\l`
  - DB 삭제 : `DROP DATABASE <DB 이름>`
  - 테이블 추가 : `CREATE TABLE <테이블 이름> (<속성 이름> <데이터 타입> <제약 조건>)`
  - 테이블 조회 : `\d`
  - 테이블 삭제 : `DROP TABLE <테이블 이름>`
  - 테이블 변경 : `ALTER TABLE <테이블 이름> <변경 명령>`
  - 엔티티 추가 : `INSERT INTO <테이블 이름> (<속성 이름>, ...) VALUES (<속성 값>, ...)`
  - 엔티티 조회 : `SELECT <속성 이름>, ... FROM <테이블 이름> WHERE <조건>`
  - 엔티티 수정 : `UPDATE <테이블 이름> SET <속성 이름> = <속성 값>, ... WHERE <조건>`
  - 엔티티 삭제 : `DELETE FROM <테이블 이름> WHERE <조건>`
- MongoDB
  - DB 추가 : `use <DB 이름>`
  - DB 조회 : `show dbs`
  - DB 삭제 : `db.dropDatabase()`
  - 컬렉션 추가 : `db.createCollection(<컬렉션 이름>)`
  - 컬렉션 조회 : `show collections`
  - 컬렉션 삭제 : `db.<컬렉션 이름>.drop()`
  - 도큐먼트 추가 : `db.<컬렉션 이름>.insert({<속성 이름>: <속성 값>, ...})`
  - 도쿠먼트 조회 : `db.<컬렉션 이름>.find({<속성 이름>: <속성 값>, ...})`
  - 도쿠먼트 수정 : `db.<컬렉션 이름>.update({<속성 이름>: <속성 값>, ...}, {<속성 이름>: <속성 값>, ...})`
  - 도쿠먼트 삭제 : `db.<컬렉션 이름>.remove({<속성 이름>: <속성 값>, ...})`

## 데이터 타입

MySQL과 PostgreSQL은 RDBMS로서 비슷한 데이터 타입을 가지고 있다. 다만 PostgreSQL의 데이터 타입은 MySQL의 데이터 타입과 비교했을 때 데이터 타입 이름이 다르다던지, 그 유효 범위가 다르다던지 등 non SQL-standard적인 것들이 많았다. 또한 PostgreSQL은 ORDBMS 답게 조금 더 유연하고 가변적이고 커스터마이징 가능한 데이터 타입을 제공한다. 이를 고려했을 때 MySQL에서 PostgreSQL로의 이전이 PostgreSQL에서 MySQL로의 이전보다 더 쉬울 것이라고 생각한다.

한편 MongoDB는 스키마 없는(schemaless)로서 데이터 타입에 대한 관점이 MySQL, PostgreSQL과 상당히 다르다. 일단 MySQL, PostgreSQL과 다르게 MongoDB에서는 '잘못된 데이터 타입으로 인한 오류'가 없다. MongoDB는 데이터를 그냥 BSON(Binary-encoded JSON) 형태로 저장하기에, JSON 형태로 표현될 수 있는 모든 데이터 타입은 모두 저장 가능하다. 그러나 스키마 없는 DB를 정말 스키마 없이 사용하는 경우는 거의 없고, 보통 MongoDB 클라이언트 쪽에서 스키마를 직접 정의해 사용하게 되는데, 따라서 MongoDB에서는 MongoDB가 지원하는 데이터 타입에 집중하기보단 MongoDB 클라이언트가 제공하는 데이터 타입에 집중하는 것이 맞다.

- MySQL[^2-3-1]
  - numeric data types
    - integer types
      - `TINYINT` = `BOOLEAN` : -128 ~ 127
      - `TINYINT UNSIGNED` : 0 ~ 255
      - `SMALLINT` : -32,768 ~ 32,767
      - `SMALLINT UNSIGNED` : 0 ~ 65,535
      - `MEDIUMINT` : -8,388,608 ~ 8,388,607
      - `MIEDIUMINT UNSIGNED` : 0 ~ 16,777,215
      - `INT` = `INTEGER` : -2,147,483,648 ~ 2,147,483,647
      - `INT UNSIGNED` : 0 ~ 4,294,967,295
      - `BIGINT` : -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807
      - `BIGINT UNSIGNED` : 0 ~ 18,446,744,073,709,551,615
    - floating point types
      - `FLOAT` : 1.175494351e-38 ~ 3.402823466e+38
      - `DOUBLE` = `DOUBLE PRECISION` = `REAL`[^2-3-2] : 2.2250738585072014e-308 ~ 1.7976931348623157e+308
    - fixed point types
      - `DECIMAL(M, D)` = `DEC` = `NUMERIC` = `FIXED` : 1 ≤ `M` ≤ 65, 0 ≤ `D` ≤ 30 (단 `M`은 정수부 자릿수 크기, `D`는 소수부 자릿수 크기)
      - `DECIMAL UNSIGNED(M, D)` : 1 ≤ `M` ≤ 65, 0 ≤ `D` ≤ 30 (단 `M`은 정수부 자릿수 크기, `D`는 소수부 자릿수 크기)
    - bit-value types
      - `BIT(M)` : 1 ≤ `M` ≤ 64 (단 `M`은 비트 크기)
  - date and time data types
    - `DATE` : 1000-01-01 ~ 9999-12-31
    - `DATETIME` : 1000-01-01 00:00:00.000000 ~ 9999-12-31 23:59:59.999999
    - `TIMESTAMP` : 1970-01-01 00:00:01.000000 UTC ~ 2038-01-19 03:14:07.999999 UTC
    - `TIME` : -838:59:59 ~ 838:59:59
    - `YEAR` : 1901 ~ 2155, 0000
  - string data types
    - `CHAR(M)` : 1 ≤ `M` ≤ 255 (단 `M`은 문자열의 길이(문자 단위))
    - `VARCHAR(M)` : 1 ≤ `M` ≤ 65,535 (단 `M`은 문자열의 길이(문자 단위))[^2-3-3]
    - `BINARY(M)` : 1 ≤ `M` ≤ 255 (단 `M`은 이진 문자열의 길이(바이트 단위))
    - `VARBINARY(M)` : 1 ≤ `M` ≤ 65,535 (단 `M`은 이진 문자열의 길이(바이트 단위))[^2-3-3]
    - `TINYBLOB` : 0 ~ 255 bytes
    - `BLOB` : 0 ~ 65,535 bytes
    - `MEDIUMBLOB` : 0 ~ 16,777,215 bytes
    - `LONGBLOB` : 0 ~ 4,294,967,295 bytes
    - `TINYTEXT` : 0 ~ 255 characters
    - `TEXT` : 0 ~ 65,535 characters
    - `MEDIUMTEXT` : 0 ~ 16,777,215 characters
    - `LONGTEXT` : 0 ~ 4,294,967,295 characters
  - Etc
    - `ENUM`[^2-3-4]
    - `SET(member1, member2, ...)` : 0 ~ 64 members
    - `JSON`
    - Geometry data types (`POINT`, `LINESTRING`, `POLYGON`, `MULTIPOINT`, `MULTILINESTRING`, `MULTIPOLYGON`, `GEOMETRYCOLLECTION`)

[^2-3-1]: reference : <https://dev.mysql.com/doc/refman/8.0/en/data-types.html>
[^2-3-2]: 만약 `REAL_AS_FLOAT` SQL 모드가 활성화되어 있다면 `REAL` = `FLOAT`이다.
[^2-3-3]: 정확히 말하면, 65,535는 MySQL에서 하나의 행이 차지할 수 있는 최대 크기를 의미한다. MySQL에는 하나의 행이 차지할 수 있는 최대 크기가 65,535 bytes라는 hard limit이 있다. 하나의 행에 있는 열들은 65,535 bytes를 공유해 사용한다. 즉 `VARCHAR`/`VARBINARY`가 실제로 사용할 수 있는 최대 메모리 크기는 65,535 bytes에서 다른 열들이 사용하고 있는 메모리 크기를 뺀 만큼이다. 또 `VARCHAR`의 경우 현재 사용하고 있는 문자 집합(character set)이 한 글자를 저장할 때 몇 byte를 쓰는지에 따라 M 값의 최댓값은 바뀌게 된다. 예를 들어 utf8은 문자당 최대 3 byte를 사용하므로 `M` 값의 최댓값은 65,535 / 3 = 21,843 또는 21,844가 된다(`VARBINARY`의 경우 이 문제는 없다). 그리고 `VARCHAR`/`VARBINARY`는 1 byte(255 bytes 이하의 문자열인 경우) 또는 2 byte(255 bytes 이상의 문자열인 경우)를 사용해 문자열의 길이 정보를 같이 저장하기 때문에, 이 크기도 고려해야 한다.
[^2-3-4]: 사실 `ENUM`으로 할 수 있는 일들은 거의 전부 참조테이블을 통해 수행할 수 있기 때문에, 되도록이면 사용을 지양하는 것이 좋다.<br/>참고 : [8 Reasons Why MySQL's ENUM Data Type Is Evil](http://komlenic.com/244/8-reasons-why-mysqls-enum-data-type-is-evil/)<br/>번역 : [[번역] MySQL의 ENUM 타입을 사용하지 말아야 할 8가지 이유](https://velog.io/@leejh3224/%EB%B2%88%EC%97%AD-MySQL%EC%9D%98-ENUM-%ED%83%80%EC%9E%85%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EB%A7%90%EC%95%84%EC%95%BC-%ED%95%A0-8%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0)

- PostgreSQL[^2-3-5]
  - numeric types
    - integer types
      - `SMALLINT` : -32,768 ~ 32,767
      - `INTEGER` : -2,147,483,648 ~ 2,147,483,647
      - `BIGINT` : -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807
    - arbitrary precision numeric types
      - `NUMERIC(precision, scale)` = `DECIMAL` : 1 ≤ precision ≤ 1,000, -1,000 ≤ scale ≤ 1,000 (단 precision은 유효숫자의 개수, scale은 소수점 아래 방향으로 몇 칸 내려가는지(음수면 소수점 위 방향으로 몇 칸 올라가는지)를 나타냄)[^2-3-6]
    - floating point types
      - `REAL` : 6 decimal digits precision
      - `DOUBLE PRECISION` : 15 decimal digits precision
    - serial types
      - `SMALLSERIAL` : 1 ~ 32,767
      - `SERIAL` : 1 ~ 2,147,483,647
      - `BIGSERIAL` : 1 ~ 9,223,372,036,854,775,807
  - monetary types
    - `MONEY` : -92233720368547758.08 ~ 92233720368547758.07
  - character types
    - `CHARACTER(n)` = `CHAR` : 1 ≤ `n` ≤ 1,000
    - `CHARACTER VARYING(n)` = `VARCHAR` : 1 ≤ `n` < 10,485,760
    - `TEXT` : ~ 1GB[^2-3-7]
  - binary data types
    - `BYTEA` : ~ 1GB[^2-3-7]
  - date/time types
    - `TIMESTAMP` : 4713 BC ~ 294276 AD, 1 microsecond resolution
    - `TIMESTAMP WITH TIME ZONE` : 4713 BC ~ 294276 AD, 1 microsecond resolution
    - `DATE` : 4713 BC ~ 5874897 AD, 1 day resolution
    - `TIME` : 00:00:00 ~ 24:00:00, 1 microsecond resolution
    - `TIME WITH TIME ZONE` : 00:00:00.00+1559 ~ 24:00:00.00-1559, 1 microsecond resolution
    - `INTERVAL` : -178000000 years ~ 178000000 years, 1 microsecond resolution
  - boolean types
    - `BOOLEAN` : `true` or `false`
  - etc
    - `ENUM('value1', 'value2', ...)`[^1-6-4]
    - geometric types (`POINT`, `LINE`, `LSEG`, `BOX`, `PATH`, `POLYGON`, `CIRCLE`)
    - network address types (`INET`, `CIDR`, `MACADDR`, `MACADDR8`)
    - `BIT(n)`
    - text search types (`TSVECTOR`, `TSQUERY`)
    - uuid type (`UUID`)
    - xml type (`XML`)
    - json type (`JSON`, `JSONB`)
    - arrays, composite types, range types, domain types, object identifier types, pg_lsn type, pseudo-types

[^2-3-5]: reference : <https://www.postgresql.org/docs/15/datatype.html>
[^2-3-6]: 참고로 이는 SQL 표준과 맞지 않다. PostgreSQL의 `NUMERIC` 타입은 다른 DBMS와 호환되지 않을 수도 있다는 점에 유의하자.
[^2-3-7]: 이론적으로는 `TEXT`와 `BYTEA`의 길이 제한은 없지만, PostgreSQL에는 각 열들이 최대 1GB 까지의 값만 저장할 수 있다는 hard limit이 있다. 참고 : [Is there a maximum length when storing into PostgreSQL TEXT](https://stackoverflow.com/questions/39965834/is-there-a-maximum-length-when-storing-into-postgresql-text)

- MongoDB
  - String
  - Integer : 32-bit integer, 64-bit integer (서버 설정에 따라 다름)
  - Boolean
  - Double
  - Min/Max Keys
  - Timestamp, Date
  - Binary data
  - Regular expression
  - Code
  - Object ID
  - Null
  - Arrays, Object


## 데이터 모델링

데이터베이스를 설계/구현할 때는 일반적으로 다음 순서에 따라 진행한다.

1. 데이터 분석 및 요구사항 수집
2. 개념적 설계 : 엔티티와 각 엔티티관의 관계를 모델링(ER Diagram) (DBMS와 독립적)
3. 논리적 설계 : 개념적 설계를 토대로 데이터베이스의 논리적 구조(ex. 테이블(RDB), 문서(Document-oriented DB) 등)를 설계 (DBMS에 종속적)
4. 물리적 설계 : 논리적 설계를 토대로 데이터베이스의 물리적 구조(ex. 데이터 타입, 인덱싱 전략, scaling 전략 등)를 설계
5. 구현

MySQL과 PostgreSQL는 RDBMS로서 3. 논리적 설계 단계에서 다음과 같은 일들이 일어난다.

- 테이블의 종류와 각 테이블의 속성을 정의
- 테이블들의 관계를 정의
- 데이터의 무결성(integrity)을 보장하고, 중복(redundancy)과 이상(anomaly)을 피하기 위해 적절한 수준의 정규화(normalization)를 수행
  
정규화의 종류는 다음과 같다.

- 제 1정규형(1NF) : 모든 속성이 원자값(atomic value)을 가져야 한다.
- 제 2정규형(2NF) : 모든 속성이 기본키에 완전 함수적 종속(full functional dependency)을 가져야 한다.
- 제 3정규형(3NF) : 모든 속성이 기본키에 이행적 함수적 종속(transitive functional dependency)을 가져서는 안 된다.
- Boyce-Codd NF(BCNF) : 모든 결정자(determinant)가 후보키(candidate key)여야 한다.
- 제 4정규형(4NF) : 다치 종속(Multi Valued Dependency, MVD)을 제거한다.
- 제 5정규형(5NF) : 조인 종속(JOIN Dependency, JD)을 제거한다.

아래로 갈수록 더 강력한 정규화이고, 이전 단계 정규화가 성립해야만 다음 단계 정규화를 적용할 수 있다. 하지만 너무 강력한 정규화는 데이터베이스의 성능을 저하시킬 수 있으므로 적절한 정규화 수준을 유지해야 한다.

반면 MongoDB는 Document-oriented DB로서 3. 논리적 설계 단계에서 다음과 같은 일들이 일어난다.

- 문서 정의 : 필드 정의, 명명규칙 정의
- 문서 구조 결정 : 서로 관계가 있는 문서를 embedded 방식으로 저장할 것인지, 아니면 reference 방식으로 저장할 것인지 결정
  - embedded 방식을 사용하면 성능이 좋아지지만, 데이터의 일관성이 떨어질 수 있고, MongoDB의 hard limit들을 넘길 수 있다.[^2-4-1]
  - reference 방식을 사용하면 데이터의 일관성 문제를 해결할 수 있지만 성능이 떨어질 수 있다.
- 컬렉션 정의 : 각 문서들의 접근 패턴을 고려하여 컬렉션을 정의
  - 성능을 위해 필요하다면 컬렉션을 분리할 수도 있다.

[^2-4-1]: ex) 문서의 최대 크기 : 16MB, 문서가 최대로 가질 수 있는 depth 깊이 : 100

# 기술적 관점

## 성능

MySQL, PostgreSQL, MongoDB의 성능을 완벽하게 비교하는 것은 불가능할 것이다. 각자의 use case에 따라, 사용 환경에 따라 성능은 달라질 수 있기 때문이다. 다만 일반론적으로 비교해보면 다음과 같다.

- 비정형 데이터(unstructured data)를 다루는 경우 MySQL, PostgreSQL 대비 MongoDB가 유리할 수 있다.
- 데이터가 매우 큰 경우 (normalization 때문에) 여러 테이블을 참조해야 하는 MySQL, PostgreSQL 대비 MongoDB가 유리할 수 있다.
- JSON 데이터를 다루는 경우 MySQL, PostgreSQL 대비 MongoDB가 유리할 수 있다.
- 트랜잭션 처리가 중요한 경우 MongoDB 대비 MySQL, PostgreSQL이 유리할 수 있다.
- 단순한 쿼리만 사용하는 경우 PostgreSQL 대비 MySQL이 유리할 수 있다.
- 복잡한 쿼리를 사용하거나 대규모 데이터를 읽고 써야 하는 경우 MySQL 대비 PostgreSQL이 유리할 수 있다.
- update 쿼리가 많은 경우 PostgreSQL 대비 MySQL이 유리할 수 있다.

## Join method

MySQL과 PostgreSQL은 RDBMS로서 테이블 간 join을 수행할 수 있다. 대표적인 join method들은 다음과 같다.

- Nested Loop Join (NLJ, NL Join)
  - 알고리즘
    1. 첫 번째 테이블(driving table, outer relation)의 각 행을 순차적으로 모두 읽으면서(풀스캔), 두 번째 테이블(driven table, inner relation)에서 join 조건에 맞는 행을 찾아 join을 수행, 결과 행(들)을 추출 버퍼에 추가한다.
    2. 추출 버퍼에 추가된 행들을 모두 출력한다.
  
  - 특징
    - driving table은 풀스캔하므로, driving table 테이블의 행 수가 적을수록 효율적. 즉, 두 테이블의 크기 차이가 유의미하게 클 때, 행 수가 적은 테이블을 driving table로 사용하는 것이 유리
    - driven table에서 join 조건에 맞는 행을 찾을 때 인덱스를 사용할 수 있으면 성능 향상이 가능함.
    - (driven table이 인덱싱 되어 있고) 등호 조건으로 join을 하는 경우(equi-join) Sort-Merge Join보다 유리
    - driving table을 적당한 크기의 블록(block)으로 나눈 후 블록 하나씩 NL Join을 수행하면 캐시를 적극적으로 사용할 수 있어 성능 향상이 가능함(Block Nested Loop Join, BNL Join).

- Sort-Merge Join
  - 알고리즘
    1. 두 개의 테이블의 각 행을 순차적으로 모두 읽으면서(풀스캔), 각각 join 조건에 맞는 행을 추출해 (join 조건에 따라) 정렬
    2. 추출, 정렬된 두 테이블을 읽으면서 join을 수행, 결과 행(들)을 추출 버퍼에 추가한다.
    3. 추출 버퍼에 추가된 행들을 모두 출력한다.
  
  - 특징
    - 인덱스가 없어도 사용할 수 있음 (join 조건에 대한 정렬이 사실상 인덱스를 구축하는 과정)
    - 테이블의 크기가 매우 크다면 성능이 떨어짐 → Hash Join을 사용하는 것이 유리
    - 대소비교 조건으로 join을 하는 경우 NLJ보다 유리
    - NLJ와 비교했을 때, 두 테이블의 크기가 비슷할 때 유리

- Hash Join
  - 알고리즘
    1. 첫 번째 테이블(build input)에 대해, join 조건을 키(key), 각 행들을 값(value)으로 하여 해시 테이블을 구축
    2. 두 번째 테이블(probe input)에 대해, join 조건을 키로 하여 해시 테이블을 탐색하면서 join을 수행, 결과 행(들)을 추출 버퍼에 추가한다.
    3. 추출 버퍼에 추가된 행들을 모두 출력한다.
  
  - 특징
    - 등호 조건으로 join을 하는 경우(equi-join)에만 사용 가능
    - 대용량 테이블 조인 시 유리
    - build input으로는 크기가 더 작은 테이블을 선택하는 것이 효율적

각 DBMS에서 지원하는 Join method는 다음과 같다.

- MySQL : NL Join, Hash Join[^3-2-1]
- PostgreSQL : NL Join, Sort-Merge Join, Hash Join

[^3-2-1]: Hash Join은 MySQL v8.0.18 이후 추가되었다. v8.0.18부터, MySQL은 인덱스가 없고 등호 조건의 inner join인 경우 디폴트로 Hash Join을 사용한다(v8.0.18 이전에는 인덱스가 없는 equi-join의 경우 BNL Join을 사용했었다). 그리고 v8.0.20 이후에는 outer join에 대해서도, 등호 조건이 아닌 join에 대해서도 Hash Join을 사용할 수 있게 업데이트되었다(여담으로 v8.0.20 이후 BNL Join은 아예 삭제되었다).

한편 MongoDB에서는 사정이 좀 다르다. 일단 MongoDB에서는 join 연산이 필요한 경우가 많지 않다. 데이터의 무결성을 위해 적극적으로 테이블을 분리했다가(정규화) 데이터를 읽을 때 합치는(join) RDBMS와는 다르게, MongoDB는 서로 연관된 데이터를 하나의 문서에 모두 저장하는 방식(embedded 방식)을 많이 사용하기 때문이다. 그러나 reference 방식으로 데이터를 저장한 경우 `$lookup` aggregation을 사용해 여러 컬렉션으로부터 데이터를 모을 수 있다. `$loopup` aggregation은 left outer join을 수행하는 연산자로서, 각 문서(left)에 대해 join 조건을 만족하는 문서(right)들을 찾아서 배열로 만들어 반환해 준다.

MongoDB가 `$loopkup` aggregation을 어떤 방식으로 구현했는지는 공식 문서에서 밝히지 않고 있다. 그러나 NL Join을 사용해 구현한 것으로 보인다.

- MongoDB : NL Join

## Index method

인덱싱이란 특정 속성(또는 여러 개의 속성들)을 사전에 정렬된 상태로 보관하여, 추후 해당 속성에 관련된 탐색 query(`SELECT` query)가 들어왔을 때 빠르게 결과값을 반환할 수 있도록 하는 기법을 뜻한다. 인덱싱을 잘 사용하면 `O(n)`의 탐색 속도를 `O(log n)` 또는 심지어 `O(1)`까지 줄일 수 있다. 하지만 인덱싱은 1) 추가적인 저장 공간을 사용하고, 2) query의 특성에 따라 인덱스를 사용할 수 없거나 사용하면 안 되는 경우도 있고,[^3-3-1] 3) 데이터 추가/변경/삭제 시 인덱스 재구축에 추가적인 시간이 소요되어[^3-3-2] 오히려 성능이 떨어질 수 있다. 따라서 데이터의 특성에 따라, DBMS가 제공하는 인덱싱 알고리즘의 종류에 따라 적절한 인덱싱 전략을 사용하는 것이 중요하다.

[^3-3-1]: 예를 들어 B-tree index를 사용하는 경우, 함수 실행 결과에 대한 query, 부등호 또는 문자열의 후행 일치 조건을 사용하는 query에서는 인덱스를 아예 사용할 수 없다. query하고자 하는 데이터가 데이터베이스 전체 데이터의 20 ~ 25%가 넘어가는 경우 오히려 인덱스를 쓰는게 성능 감소를 가져올 수 있다.
[^3-3-2]: rule of thumb : 정확히 얼마만큼의 추가적인 시간이 필요한지는 물론 상황마다 다르겠지만, 인덱싱을 하지 않은 경우 1의 시간이 걸린다고 하면, 인덱싱을 한 경우 일반적으로 1 ~ 1.5 정도의 시간이 걸린다고 예측한다. 데이터 양이 많아질수록 인덱스 구축을 위한 시간이 더 많이 소요된다.

주로 사용되는 인덱싱 알고리즘으로는 다음이 있다.

- 범용 인덱스
  - B-Tree Index (B+-Tree Index)
    - index할 속성(들)을 key로 하여 B-Tree(조금 더 정확히는, B+-Tree[^3-3-3])에 저장
    - 등호 조건, 부등호 조건, 범위 조건, 전행 일치 조건 등의 조건에 대해 인덱스를 사용할 수 있음
  - Hash Index
    - index할 속성(들)을 key로 하여 Hash Table에 저장
    - 등호 조건에 대해서만 인덱스를 사용할 수 있음
    - B-Tree Index에 비해 크기가 작다는 장점이 있음
- 지리 정보(geometric data) 탐색용 인덱스
  - R-Tree Index
  - GiST (Generalized Search Tree)
  - SP-GiST (Spatial Partitioned GiST)
- 전문 검색(full-text search)용 인덱스
  - Stopword Index
  - N-gram Index
  - GIN (Generalized Inverted Index)

[^3-3-3]: B-Tree에 비해 B+-Tree가 순차탐색에 조금 더 유리하여 B-Tree보다 더 많이 사용된다.

MySQL(Inno DB)과 PostgreSQL, MongoDB가 인덱싱에 사용하는 알고리즘들의 종류는 다음과 같다.

- MySQL : B-tree index, Hash index, Stopword index
- PostgreSQL : B-tree index, Hash index, GiST index, GIN index 등
- MongoDB : B-tree index, Hash index 등

## 동시성

트랜잭션(transaction)은 다음 ACID 조건을 만족해야 한다.

- Atomicity : 트랜잭션의 모든 연산이 성공적으로 완료되거나, 아니면 전혀 실행되지 않은 상태로 유지된다.
- Consistency : 트랜잭션이 성공적으로 완료되면, 데이터베이스는 일관성 있는 상태로 유지된다.
- Isolation : 트랜잭션은 서로 간섭 없이 독립적으로 실행된다.
- Durability : 트랜잭션이 성공적으로 완료되면, 그 결과는 영구적으로 저장된다.

그런데 MySQL, PostgreSQL, MongoDB 모두 다중 세션을 지원하는 데이터베이스이다. 따라서 Isolation 조건을 충족시키기 위해서는 동시성 제어가 필요하다. 너무 낮은 수준의 동시성 제어는 데이터의 정합성을 해치고, 너무 높은 수준의 동시성 제어는 성능을 저하시킬 수 있어 상황에 맞춰, 데이터의 특성에 맞춰 적절한 수준의 동시성 제어가 필요하다.

동시성의 수준은 일반적으로 트랜잭선 격리 수준(Transaction Isolation Level)을 이용해 표현한다.

- Level 0 (Read Uncommitted)
  - 아무런 제약을 하지 않은 상태
  - dirty read 발생 가능 : transaction A가 데이터를 읽으려 하고 transaction B가 데이터를 수정하려고 할 때, transaction A는 transaction B가 아직 commit하지 않은 데이터(수정 중인 데이터)를 읽어버릴 수 있다. transaction B가 다른 추가적인 수정을 하거나 rollback해 버리면 transaction A가 읽은 데이터는 더 이상 유효하지 않은 데이터가 된다.
- Level 1 (Read Committed)
  - dirty read 해결
  - non-repeatable read 발생 가능 : transaction A에서 같은 데이터를 두 번 읽는 사이, transaction B가 데이터를 update하고 commit해 버리면, transaction A가 읽은 두 데이터가 달라질 수 있다.
- Level 2 (Repeatable Read)
  - non-repeatable read 해결
  - phantom read 발생 가능 : transaction A에서 데이터를 읽는 중, transaction B가 데이터를 create하거나 delete하고 commit해 버리면, transaction A가 읽었던 데이터는 결손이 있거나(create된 경우) 실제로 존재하지 않을 수(delete된 경우) 있다.
- Level 3 (Serializable)
  - 동시 접근을 모두 차단하고 transaction을 순차적으로 실행한다. 데이터의 정합성은 보장하지만 매우 느리다.

각 DBMS에서 사용할 수 있는 트랜잭션 격리 수준은 다음과 같다(*은 디폴트 격리 수준을 의미한다).

- MySQL(InnoDB)[^3-4-1]
  - Level 0 (Read Uncommitted)
  - Level 1 (Read Committed)
  - Level 2 (Repeatable Read)*
  - Level 3 (Serializable)
- PostgreSQL[^3-4-2]
  - Level 0 (Read Uncommitted)
  - Level 1 (Read Committed)*
  - Level 2 (Repeatable Read)
  - Level 3 (Serializable)
- MongoDB(WiredTiger)[^3-4-3]
  - Level 0 (Read Uncommitted)
  - Level 1 (Read Committed)
  - Level 2 (Repeatable Read)*

[^3-4-1]: MySQL(InnoDB)은 구현 상 phantom read 현상이 절대 발생하지 않는다.
[^3-4-2]: PostgreSQL은 구문 상으로는 위 4가지 격리 수준을 모두 지원하지만, 내부적으로는 Level 0가 없다. Level 0로 설정해도 Level 1로 동작하게 된다. 즉 PostgreSQL에서는 dirty read 현상이 절대 발생할 수 없다. 또 PostgreSQL에서는 구현 상 phantom read 현상도 절대 발생할 수 없다.
[^3-4-3]: session을 사용하는 경우 Level 2가 디폴트 격리 수준이다. session을 사용하지 않는 경우 Level 0이 디폴트 격리 수준이다. 참고로 MongodB에서는 Level 2를 Snapshot 수준이라고도 부른다.

동시성 제어를 구현하는 방법으로는 크게 다음과 같은 방법들이 있다.

- Locking
  - transaction isolation을 구현하는 가장 간단한 방법. 데이터를 읽거나 쓸 때 lock을 걸어 다른 transaction이 해당 데이터에 접근하지 못하도록 한다.
  - lock의 종류
    - shared lock (= read lock = S) : 데이터를 변경하지 않는(= read만 하는) transaction에서 사용하는 lock. shared lock이 걸려있는 데이터에는 다른 transaction이 shared lock을 걸 수 있지만, exclusive lock을 걸 수는 없다(= 오직 읽기만 할 수 있다).
    - exclusive lock (= write lock = X) : 데이터를 변경하는 transaction에서 사용하는 lock. exclusive lock이 걸려있는 데이터에는 다른 transaction이 lock을 걸 수 없다(= 그 어떤 작업도 할 수 없다).
  - lock 수준
    - 행 단위(row-level) lock : 특정 행에 대해 lock을 건다. 가장 일반적인 lock 수준이다.
    - 페이지 단위(page-level) lock : 특정 페이지에 대해 lock을 건다. 페이지는 여러 행을 포함한다.
    - 테이블 단위(table-level) lock : 특정 테이블에 대해 lock을 건다. DDL 구문 수행 시 사용한다.
    - 파일 단위(file-level) lock : 특정 파일에 대해 lock을 건다. 파일은 여러 테이블을 포함한다. 파일 전체를 백업할 때 사용한다.
    - 데이터베이스 단위(database-level) lock : 특정 데이터베이스에 대해 lock을 건다. 데이터베이스 전체를 백업할 때 사용한다.
- MVCC (Multi-Version Concurrency Control)
  - lock을 사용하지 않고 transaction isolation을 구현하는 방법. lock을 사용하지 않기 때문에 동시성이 높다.
  - MVCC의 종류
    - MGA (Multi Generation Architecture)
      - 데이터를 업데이트할 때, 새로운 값으로 변경하는 것이 아니라 새로운 레코드를 추가하고 이전 레코드는 유효 범위를 마킹하여 처리
      - 즉 데이터베이스에는 여러 버전의 레코드들이 저장되게 된다.
      - 사용자의 query가 들어오면 현재 격리 수준에 맞춰 적절한 버전의 레코드를 선택해 반환
    - Undo Segment, Skip list
      - 데이터를 업데이트할 때, 이전 값을 undo segment에 저장하고, 실제 변경을 수행
      - 즉 데이터베이스에는 언제나 최신 버전의 레코드만 저장되게 되고, 필요할 때는 undo segment를 이용하여 이전 버전의 데이터를 재구성할 수 있게 된다.
      - 사용자의 query가 들어오면 현재 격리 수준에 맞춰 데이터베이스에 저장된 값과 undo segment의 데이터를 참고해서 적절한 데이터를 반환

각 DBMS가 동시성 제어 구현을 위해 사용하는 방법은 다음과 같다.

- MySQL(InnoDB) : Locking, Undo Segment
- PostgreSQL : Locking, MGA
- MongoDB : Locking, Skip list

## 내부 데이터 관리 방법

- PostgreSQL은 MVCC 구현을 위해 데이터에 변경이 일어난 경우 데이터를 직접 변경하지 않고, 변경이 일어난 데이터를 새로 추가하고, 이전 데이터는 유효 범위를 마킹하여 처리한다. 그러다 보니 시간이 지나면 데이터베이스에는 더 이상 사용되지 않는 데이터(dead tuple)들이 쌓이게 된다. 이러한 데이터들을 정리하는 작업을 Vacuum이라 하고, 주기적으로 실행해 줘야 성능을 유지할 수 있다.



