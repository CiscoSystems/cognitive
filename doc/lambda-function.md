# Lambda Function
Arbitrary Code Executor using Docker Container

base_url: /api
version: v1

|Endpoint|Method|Remarks|
|---|---|---|
|/functions|GET||
|/functions|POST||
|/functions/:id|GET||
|/functions/:id|PUT||
|/functions/:id/executable|POST| Create executable|
|/functions/:id|DELETE|||

|/executables/|GET| list executables|
|/executables/:id|GET| inspect a executable|
|/executables/:id/start|POST| start a executable|
|/executables/:id/resize|POST| start a executable|
|/executables/:id/|DELETE| remove a executable|


Note: *the code execution can be done by not only via rest api, but also monitoring kafka queue, timer, rpc, ... and so on.
This design is aimed to determine the first step, so the other features will come mostly in the future version*

#### DB Schema

**functions**

|name|type|remarks|example|
|---|---|---|---|
|id|integer|primary key||
|user_id|integer|||
|environment_id|integer|||
|language_id|integer|||
|name|string|not null||
|description|text|not null||
|code|text|not null||
|timeout_s|integer|not null default 3||
|status|string|not null default 'stop'|[stop, run, wait]|
|created_time|Datetime|not null||
|updated_time|Datetime|not null|||


**function_languages**
|name|type|remarks|example|
|---|---|---|---|
|id|integer|primary key||
|name|string|not null||
|description|text|not null||


**function_containers**

|name|type|remarks|example|
|---|---|---|---|
|id|integer|primary key||
|name|string|not null||
|description|text|not null||


*will write details*


**function_histories**

|name|type|remarks|example|
|---|---|---|---|
|id|integer|primary key||
|name|string|not null||
|description|text|not null||
|code|text|not null||
|execution_time|integer|not null default 3||
|created_time|Datetime|not null||
|updated_time|Datetime|not null|||

*will write details*



NOTE: *`code` is plain text in the database, but encoded to base64 format during the rest api call*




**For the first step, that's it** Will implement new features accordingly.
