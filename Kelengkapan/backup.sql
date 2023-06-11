--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: desk_status; Type: TYPE; Schema: public; Owner: rafie.amandio
--

CREATE TYPE public.desk_status AS ENUM (
    'ATTENDING',
    'FINISHED'
);


ALTER TYPE public.desk_status OWNER TO "rafie.amandio";

--
-- Name: status; Type: TYPE; Schema: public; Owner: rafie.amandio
--

CREATE TYPE public.status AS ENUM (
    'IN QUEUE',
    'PROCESSING',
    'FINISHED'
);


ALTER TYPE public.status OWNER TO "rafie.amandio";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.account (
    account_id uuid NOT NULL,
    email character varying(255),
    full_name character varying(255),
    password character varying(255),
    type_id integer,
    username character varying(255)
);


ALTER TABLE public.account OWNER TO "rafie.amandio";

--
-- Name: customer; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.customer (
    customer_id uuid NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    postal_code character varying(10) NOT NULL,
    bank_account_id character varying(20) NOT NULL
);


ALTER TABLE public.customer OWNER TO "rafie.amandio";

--
-- Name: desk; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.desk (
    desk_no integer NOT NULL,
    desk_name character varying(255)
);


ALTER TABLE public.desk OWNER TO "rafie.amandio";

--
-- Name: queue; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.queue (
    queue_id integer NOT NULL,
    customer_id uuid NOT NULL,
    teller_id uuid,
    arrival_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    process_status public.status NOT NULL,
    desk_id integer
);


ALTER TABLE public.queue OWNER TO "rafie.amandio";

--
-- Name: queue_queue_id_seq; Type: SEQUENCE; Schema: public; Owner: rafie.amandio
--

CREATE SEQUENCE public.queue_queue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.queue_queue_id_seq OWNER TO "rafie.amandio";

--
-- Name: queue_queue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafie.amandio
--

ALTER SEQUENCE public.queue_queue_id_seq OWNED BY public.queue.queue_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.roles (
    type_id integer NOT NULL,
    role_type character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO "rafie.amandio";

--
-- Name: teller_desk; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.teller_desk (
    history_id integer NOT NULL,
    teller_id uuid NOT NULL,
    desk_no integer NOT NULL,
    start_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp without time zone,
    duration interval,
    status public.desk_status
);


ALTER TABLE public.teller_desk OWNER TO "rafie.amandio";

--
-- Name: teller_desk_history_id_seq; Type: SEQUENCE; Schema: public; Owner: rafie.amandio
--

CREATE SEQUENCE public.teller_desk_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teller_desk_history_id_seq OWNER TO "rafie.amandio";

--
-- Name: teller_desk_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rafie.amandio
--

ALTER SEQUENCE public.teller_desk_history_id_seq OWNED BY public.teller_desk.history_id;


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.transaction (
    transaction_id uuid NOT NULL,
    customer_id uuid,
    teller_id uuid,
    trans_type_id integer,
    trans_date timestamp without time zone DEFAULT now(),
    trans_desc text,
    trans_amount numeric
);


ALTER TABLE public.transaction OWNER TO "rafie.amandio";

--
-- Name: transaction_type; Type: TABLE; Schema: public; Owner: rafie.amandio
--

CREATE TABLE public.transaction_type (
    trans_type_id integer NOT NULL,
    type_name character varying(255)
);


ALTER TABLE public.transaction_type OWNER TO "rafie.amandio";

--
-- Name: queue queue_id; Type: DEFAULT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.queue ALTER COLUMN queue_id SET DEFAULT nextval('public.queue_queue_id_seq'::regclass);


--
-- Name: teller_desk history_id; Type: DEFAULT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.teller_desk ALTER COLUMN history_id SET DEFAULT nextval('public.teller_desk_history_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.account (account_id, email, full_name, password, type_id, username) FROM stdin;
b2dc1aa0-10d6-4d7d-ac41-52338be4219c	rafieamandio@	Rafie Amandio	$2b$10$eNHU.v1285IjQuRImrhxwurc1h9jqcxnf4hHHw.66WVm/yV5APHhm	2	rafie_updatee
9838c58e-9477-41bc-8363-5ce94869d1a5	rafieamandio@gmail.com	Rafie Amandio Fauzan	$2b$10$966lP5mONuYEtYpsu/ovSO5/mLRY9I7yFN6LAQDi0Er8.Hsquhklq	1	rafie
b8014d48-8f15-4980-b619-b9fbd61697ca	rafieamandio2@gmail.com	Rafie Amandio Fauzan	$2b$10$UGLlHC2wuWdGipVVwOztteJ7CYrX1o9Q1yNkgkCZNUjFdkL.WEK3G	1	rafie2
69220e2b-e521-4ad0-bf78-fbc96f77ff2b	azzah@gmail.com	Rafie Amandio Fauzan	$2b$10$9FcTHqXxdfBMVxe.vEkxf.mHUZswLX15ACrHIPSAvz4aX9EkELugy	1	azzah
39e794b3-d336-43e1-a8c0-df1e4e923e1a	teller1@gmail.com	Teller1	$2b$10$2YkCq6CwMY.XeRJh0.K3GOgxAAgB.V/.p5Jm61UFCbI9jfrxDTmwq	2	Teller1
75ffc957-b7a1-4a46-9db3-2d2b98841651	teller3@gmail.com	Teller3	$2b$10$R29bchruBwd5iV1tm.Ss0O0lRbpZfDWVnPTEvqvuQ1SiyNFpmjdrG	2	Teller3
4005d678-4753-4c2d-be8e-db29b8ac547f	teller123@gmail.com	Rafie Amandio Fauzan	$2b$10$KIamnAb0sYPEhLpXwZO4gufS./7LIm59Zr.D4SaMyjTrt9URETe/y	2	teller
ef90795a-f9b1-4677-8f1f-05fc52b80e7b	lauren@gmail.com	Lauren Christy	$2b$10$kf2l/jHWZQsDOVv.D9NUvOHVoCi4RTH02jdJVM37nUIJlnuxcxN8K	2	lauren
1f6c0a79-29ca-4ff2-8a7e-f26e51c7cf2d	admin1@gmail.com	Lauren Christy	$2b$10$.KCHoWE.Fay68wDW2pW3hOYdrDcCzgCBHoqaZM2UNqZ6/gWWLAUei	1	admin
4aa255e8-f7ff-4b9b-ba18-ec0b31c33a49	bisma@gmail.com	Bisma Alif	$2b$10$DfQv9eTnrhS1H191U9RtYe7R44U/i3kd..UQ8oOlpTOkLIXJD45b.	3	front
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.customer (customer_id, full_name, email, phone_number, address, city, postal_code, bank_account_id) FROM stdin;
21c7c716-5df1-4e99-b288-7912d78aca7c	Rafie Amandio	rafie@gmail.com	081315295842	Jl.Haji	Sleman	123123	
166ad716-0441-4bea-91f9-86acccf06738	Lauren	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
dde21a45-7502-4b3a-bc74-cca27fd0bebb	Rafie Amandio	rafieamandio@gmail.com	0976123791	geqew	qwhe	52252	123123
e0543df7-2bd3-4c3b-8b6a-93b307719146	dio	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
c5331165-662e-4341-b79e-0e5bb1469648	diow	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
469eb977-3437-472e-9b9f-8ddd2956b8ef	diow	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
3d7407c5-c2eb-4333-a07b-89cab1550499	diow	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
c65c707e-c0fd-4937-81e4-2d7c417c184e	ngab	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
da150e76-eb43-49e0-9171-2587c338cfa2	ngab	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
35326168-5ef1-46cc-a1b3-172133186460	Raditya Dito	radit@gmail.com	08131528329	Sleman C	Sleman	500123	12312313
64f5b327-a56a-42d0-b063-62338c603404	anjay	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
3f09ecfc-942b-4924-a88a-325e6ecace88	anjay	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
d4e9f98c-30f2-406f-8161-db210518a461	w	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
1e7f6499-fa66-4088-aa3a-33e938583bfc	x	lauran@gmail.com	081315295842	Jl.Haji	Sleman	123123	123123
d3875a1a-6ae0-4de3-b85b-5d7d81f7dce6							
425a8dd6-c449-4faa-a2b5-b1c108e9984e							
19867ddd-f787-4e92-be12-1d60188a5b5d							
83af1989-72e8-4567-adaa-2533fc084599							
217456ad-3125-4873-8b9e-de010f3d3ea2							
3246aa27-f874-4bd5-97b7-d3c03c130b43							
d30b3963-a058-4147-94fe-e3e1543c2d7e							
0c7816b6-0049-402d-8e50-6921394c6a6e							
c1337174-7b20-4bb1-adcc-fbfac72a2902							
e85a0a95-49aa-4b9b-8465-8be6f30fdc2b							
1b1ad24f-6b34-4f9e-9598-4b4fd6737a8a							
ad8417fe-875e-4ab0-8e9d-96ddca605cd3							
db5683bb-fc75-4ba0-a1a4-72f285f65a91							
fcfab584-8fe8-458d-ae70-e3d2a66e8ef3							
90bb2ebb-9e95-4689-bdab-be90646b94dc							
021e37af-e061-47a9-b3fa-067cfbcea02a							
205dfc79-d202-46fc-8b93-5268a11a5225							
43e8197f-da08-48a4-b58c-9c63e0ac01f7							
9454fce6-bf1f-4fcb-a659-a52410e6020d							
ba56f570-b1d1-4234-96e9-2c1f434c896c							
f49cb323-f26a-4b4d-882b-a74b1bd7f28d							
b94fc55d-40e9-4d3d-8029-5146bdea0771	Rafie Amandio	rafieamandio@gmail.com	(08) 1315295842	sleman	sleman	500505	12345
556630e2-1e7b-480d-98eb-2ade560b5e5b	Rafie Amandio Fauzan	pivaf77927@fretice.com	81315295842	Sleman C	Sleman	500123	12312313
b5852c60-1882-4696-947e-4fe425e24f44							
78183cbf-4dfb-4ae1-8568-6d02ad03c4d7							
90a4d9ee-ce0d-4189-a001-0097f9dafdb9							
\.


--
-- Data for Name: desk; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.desk (desk_no, desk_name) FROM stdin;
1	Loket 1
2	Loket 2
3	Loket 3
4	Loket 4
\.


--
-- Data for Name: queue; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.queue (queue_id, customer_id, teller_id, arrival_time, process_status, desk_id) FROM stdin;
1	b94fc55d-40e9-4d3d-8029-5146bdea0771	4005d678-4753-4c2d-be8e-db29b8ac547f	2023-06-11 11:18:18.994404	FINISHED	1
2	556630e2-1e7b-480d-98eb-2ade560b5e5b	4005d678-4753-4c2d-be8e-db29b8ac547f	2023-06-11 12:52:37.238248	FINISHED	1
3	b5852c60-1882-4696-947e-4fe425e24f44	\N	2023-06-11 13:41:31.715143	IN QUEUE	\N
4	78183cbf-4dfb-4ae1-8568-6d02ad03c4d7	\N	2023-06-11 13:58:40.804803	IN QUEUE	\N
5	90a4d9ee-ce0d-4189-a001-0097f9dafdb9	\N	2023-06-11 14:03:19.81846	IN QUEUE	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.roles (type_id, role_type) FROM stdin;
1	Admin
2	Teller
3	Frontdesk
\.


--
-- Data for Name: teller_desk; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.teller_desk (history_id, teller_id, desk_no, start_time, end_time, duration, status) FROM stdin;
1	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	1	2023-05-28 12:01:00.441823	2023-06-04 08:18:43.375261	6 days 20:17:42.933438	FINISHED
3	39e794b3-d336-43e1-a8c0-df1e4e923e1a	3	2023-06-04 08:04:25.996238	2023-06-04 08:22:16.999467	00:17:51.003229	FINISHED
6	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	1	2023-06-04 09:01:09.736821	2023-06-04 09:04:11.601238	00:03:01.864417	FINISHED
2	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	2	2023-05-28 12:04:49.18449	2023-06-04 09:04:15.234318	6 days 20:59:26.049828	FINISHED
4	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	3	2023-06-04 08:57:11.473739	2023-06-04 09:04:18.373598	00:07:06.899859	FINISHED
5	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	4	2023-06-04 08:59:38.74432	2023-06-04 09:04:20.92658	00:04:42.18226	FINISHED
7	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	1	2023-06-04 09:06:08.879465	2023-06-04 09:10:55.659588	00:04:46.780123	FINISHED
8	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	2	2023-06-04 09:08:17.589233	2023-06-04 09:10:58.125357	00:02:40.536124	FINISHED
9	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	3	2023-06-04 09:08:51.977504	2023-06-04 09:11:00.779457	00:02:08.801953	FINISHED
10	b2dc1aa0-10d6-4d7d-ac41-52338be4219c	1	2023-06-04 09:11:16.72663	2023-06-04 14:54:02.206851	05:42:45.480221	FINISHED
11	4005d678-4753-4c2d-be8e-db29b8ac547f	3	2023-06-04 14:13:55.994792	2023-06-04 14:54:20.105403	00:40:24.110611	FINISHED
12	ef90795a-f9b1-4677-8f1f-05fc52b80e7b	1	2023-06-04 15:25:46.947881	2023-06-04 15:27:37.934761	00:01:50.98688	FINISHED
15	ef90795a-f9b1-4677-8f1f-05fc52b80e7b	1	2023-06-04 15:38:19.974188	2023-06-04 17:56:58.043308	02:18:38.06912	FINISHED
13	ef90795a-f9b1-4677-8f1f-05fc52b80e7b	2	2023-06-04 15:34:10.163286	2023-06-04 17:57:01.867999	02:22:51.704713	FINISHED
14	ef90795a-f9b1-4677-8f1f-05fc52b80e7b	3	2023-06-04 15:35:55.148187	2023-06-04 17:57:04.918398	02:21:09.770211	FINISHED
16	ef90795a-f9b1-4677-8f1f-05fc52b80e7b	4	2023-06-04 16:35:58.233118	2023-06-04 17:57:07.768669	01:21:09.535551	FINISHED
19	4005d678-4753-4c2d-be8e-db29b8ac547f	4	2023-06-05 02:07:41.20204	2023-06-06 00:53:08.364064	22:45:27.162024	FINISHED
20	4005d678-4753-4c2d-be8e-db29b8ac547f	3	2023-06-05 03:31:43.286662	2023-06-06 00:53:12.399238	21:21:29.112576	FINISHED
18	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-05 02:07:02.863266	2023-06-06 00:53:15.79089	22:46:12.927624	FINISHED
17	ef90795a-f9b1-4677-8f1f-05fc52b80e7b	1	2023-06-04 17:57:38.244414	2023-06-06 00:53:18.62638	1 day 06:55:40.381966	FINISHED
23	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-06 14:08:08.715383	2023-06-08 20:04:57.406074	2 days 05:56:48.690691	FINISHED
21	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-06 00:53:22.357207	2023-06-08 20:05:03.517165	2 days 19:11:41.159958	FINISHED
22	4005d678-4753-4c2d-be8e-db29b8ac547f	3	2023-06-06 02:37:27.630999	2023-06-08 20:05:07.491257	2 days 17:27:39.860258	FINISHED
24	4005d678-4753-4c2d-be8e-db29b8ac547f	4	2023-06-06 15:19:12.805698	2023-06-08 20:05:10.744924	2 days 04:45:57.939226	FINISHED
26	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-08 20:15:45.889305	2023-06-08 20:15:50.522187	00:00:04.632882	FINISHED
27	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-08 20:16:25.861258	2023-06-08 20:16:30.302967	00:00:04.441709	FINISHED
25	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-08 20:05:19.777484	2023-06-08 20:16:44.621004	00:11:24.84352	FINISHED
28	4005d678-4753-4c2d-be8e-db29b8ac547f	4	2023-06-09 07:31:22.601294	2023-06-09 07:33:04.240744	00:01:41.63945	FINISHED
29	4005d678-4753-4c2d-be8e-db29b8ac547f	3	2023-06-09 09:46:06.217657	2023-06-09 09:51:08.933079	00:05:02.715422	FINISHED
31	4005d678-4753-4c2d-be8e-db29b8ac547f	3	2023-06-10 03:06:57.240871	2023-06-10 03:07:25.930601	00:00:28.68973	FINISHED
30	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-10 03:03:46.938383	2023-06-10 03:08:45.624219	00:04:58.685836	FINISHED
32	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 03:08:48.612027	2023-06-10 03:08:51.445174	00:00:02.833147	FINISHED
34	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-10 16:11:39.648993	2023-06-10 16:16:31.048875	00:04:51.399882	FINISHED
35	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-10 18:06:27.457051	2023-06-10 18:27:43.780955	00:21:16.323904	FINISHED
37	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-10 20:23:30.777075	2023-06-10 20:23:34.596927	00:00:03.819852	FINISHED
36	4005d678-4753-4c2d-be8e-db29b8ac547f	3	2023-06-10 18:29:51.280129	2023-06-10 20:43:11.347658	02:13:20.067529	FINISHED
33	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 13:05:05.084663	2023-06-10 20:43:16.423784	07:38:11.339121	FINISHED
38	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-10 20:43:24.071672	2023-06-10 20:46:04.876446	00:02:40.804774	FINISHED
42	4005d678-4753-4c2d-be8e-db29b8ac547f	4	2023-06-11 09:58:24.571931	2023-06-11 10:18:47.049455	00:20:22.477524	FINISHED
43	4005d678-4753-4c2d-be8e-db29b8ac547f	4	2023-06-11 10:22:33.965184	2023-06-11 10:23:14.133464	00:00:40.16828	FINISHED
44	4005d678-4753-4c2d-be8e-db29b8ac547f	4	2023-06-11 10:23:37.964055	2023-06-11 10:29:30.140712	00:05:52.176657	FINISHED
39	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-11 04:16:46.924759	2023-06-11 11:16:30.265452	06:59:43.340693	FINISHED
41	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 08:23:40.537652	2023-06-11 11:16:32.770643	02:52:52.232991	FINISHED
40	4005d678-4753-4c2d-be8e-db29b8ac547f	3	2023-06-11 07:54:27.423456	2023-06-11 11:16:36.817175	03:22:09.393719	FINISHED
45	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-11 11:20:21.588413	2023-06-11 11:20:41.980631	00:00:20.392218	FINISHED
46	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-11 12:51:47.165415	\N	\N	ATTENDING
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.transaction (transaction_id, customer_id, teller_id, trans_type_id, trans_date, trans_desc, trans_amount) FROM stdin;
897f2bc1-c384-4ca5-a59a-b46a713b0575	166ad716-0441-4bea-91f9-86acccf06738	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-06 01:16:41.198306	tes deposit	50000
237b4e67-2e42-4864-b16a-93227b02aad6	166ad716-0441-4bea-91f9-86acccf06738	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-06 14:09:49.341401	tes deposit	200000
5a7a8643-9ac0-4105-8b3f-6cad0ee5b444	166ad716-0441-4bea-91f9-86acccf06738	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-08 20:09:34.481236	anjay	20000
b5f85ec5-344b-4ef5-a00d-04a5647a9fa3	166ad716-0441-4bea-91f9-86acccf06738	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-08 20:10:43.485344	anjay	2333
fe0b2670-13ac-48f4-b87c-a2d46fb0ec13	21c7c716-5df1-4e99-b288-7912d78aca7c	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-09 07:32:35.719171	halo	20000
a3eb8dde-17d7-4573-86d7-7a5f306665ee	21c7c716-5df1-4e99-b288-7912d78aca7c	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-09 09:46:25.861378	aaaaa	30000
ab820561-e34b-460e-84c3-d4e23753d892	166ad716-0441-4bea-91f9-86acccf06738	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 03:04:32.757059	qweqweqwe	2
87c6042c-c235-47eb-b4c8-97ca0840f1f8	166ad716-0441-4bea-91f9-86acccf06738	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 13:06:45.525195	asdasd	2123
2ddd0ae0-0cd7-4f57-9d15-1eaff8e30331	c5331165-662e-4341-b79e-0e5bb1469648	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 16:11:56.251742	asdads	123
d79000f1-00f5-4895-b34a-17abb67a92c4	469eb977-3437-472e-9b9f-8ddd2956b8ef	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 16:14:14.569333	qwe	12
54372600-716b-4873-9dfc-b9511fdd01be	3d7407c5-c2eb-4333-a07b-89cab1550499	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-10 16:15:40.049222	qweqw	1233
273f9990-93e5-4c41-b8b6-4b3bf8a5aaf9	c65c707e-c0fd-4937-81e4-2d7c417c184e	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 18:09:25.856988	qweqwe	123
10f91d6c-7f72-45fd-8410-4fc2ef82315f	da150e76-eb43-49e0-9171-2587c338cfa2	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 18:27:37.128446	qweq	123
0b55dfd6-0a02-42c6-a7ea-022c819b63c5	35326168-5ef1-46cc-a1b3-172133186460	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-10 18:30:07.389177	qweqwe	422
494da05e-f9c8-4cb2-af4d-149a8b65e3bb	3f09ecfc-942b-4924-a88a-325e6ecace88	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 07:40:56.923341	qweqwe	123
1fdf52ef-0e67-4ab0-91e3-c0fe1392fca6	d4e9f98c-30f2-406f-8161-db210518a461	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-11 07:42:05.357588	qwe	3
0ff2cabc-9eff-4ff1-bb35-1d3a12c3f618	1e7f6499-fa66-4088-aa3a-33e938583bfc	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-11 08:20:54.885581	wqeqweqwe	1231
da818625-8599-405c-9a8e-d721cce607d4	d3875a1a-6ae0-4de3-b85b-5d7d81f7dce6	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 08:26:24.516552	asdasd	233
9a8da037-f843-4a79-981a-214d5929df32	425a8dd6-c449-4faa-a2b5-b1c108e9984e	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-11 08:29:51.11147	asddas	12
4b95be54-887f-4b71-bf7c-c56c960f5441	19867ddd-f787-4e92-be12-1d60188a5b5d	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 08:31:21.305949	asdasd	12313
393752b3-5723-4a6f-9f86-a093770d066b	83af1989-72e8-4567-adaa-2533fc084599	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 08:32:34.784221	asdsa	123
36628bee-b964-4619-8ef3-c9f85a210eea	3246aa27-f874-4bd5-97b7-d3c03c130b43	4005d678-4753-4c2d-be8e-db29b8ac547f	1	2023-06-11 09:59:09.543843	asdads	123
8f13074e-28d8-4f1f-b544-d97297c9e267	d30b3963-a058-4147-94fe-e3e1543c2d7e	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 10:18:42.338006	qweqweqw	33
5c004078-497b-4000-b73d-97b1f74a0750	b94fc55d-40e9-4d3d-8029-5146bdea0771	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 11:20:35.589062	qweqwe	1234
d67e942f-838d-4e0e-836a-db4d451f3a1f	556630e2-1e7b-480d-98eb-2ade560b5e5b	4005d678-4753-4c2d-be8e-db29b8ac547f	2	2023-06-11 12:52:57.573576	qwe	50000
\.


--
-- Data for Name: transaction_type; Type: TABLE DATA; Schema: public; Owner: rafie.amandio
--

COPY public.transaction_type (trans_type_id, type_name) FROM stdin;
1	Deposit
2	Withdraw
\.


--
-- Name: queue_queue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafie.amandio
--

SELECT pg_catalog.setval('public.queue_queue_id_seq', 5, true);


--
-- Name: teller_desk_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rafie.amandio
--

SELECT pg_catalog.setval('public.teller_desk_history_id_seq', 46, true);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: desk desk_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.desk
    ADD CONSTRAINT desk_pkey PRIMARY KEY (desk_no);


--
-- Name: queue queue_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.queue
    ADD CONSTRAINT queue_pkey PRIMARY KEY (queue_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (type_id);


--
-- Name: teller_desk teller_desk_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.teller_desk
    ADD CONSTRAINT teller_desk_pkey PRIMARY KEY (history_id);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (transaction_id);


--
-- Name: transaction_type transaction_type_pkey; Type: CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pkey PRIMARY KEY (trans_type_id);


--
-- Name: queue fk_queue_desk; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.queue
    ADD CONSTRAINT fk_queue_desk FOREIGN KEY (desk_id) REFERENCES public.desk(desk_no);


--
-- Name: queue queue_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.queue
    ADD CONSTRAINT queue_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: queue queue_teller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.queue
    ADD CONSTRAINT queue_teller_id_fkey FOREIGN KEY (teller_id) REFERENCES public.account(account_id);


--
-- Name: teller_desk teller_desk_desk_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.teller_desk
    ADD CONSTRAINT teller_desk_desk_no_fkey FOREIGN KEY (desk_no) REFERENCES public.desk(desk_no);


--
-- Name: teller_desk teller_desk_teller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.teller_desk
    ADD CONSTRAINT teller_desk_teller_id_fkey FOREIGN KEY (teller_id) REFERENCES public.account(account_id);


--
-- Name: transaction transaction_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: transaction transaction_teller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_teller_id_fkey FOREIGN KEY (teller_id) REFERENCES public.account(account_id);


--
-- Name: transaction transaction_trans_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rafie.amandio
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_trans_type_id_fkey FOREIGN KEY (trans_type_id) REFERENCES public.transaction_type(trans_type_id);


--
-- PostgreSQL database dump complete
--

