--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: users; Type: TABLE; Schema: public; Owner: golfapp
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    full_name text NOT NULL,
    handicap double precision,
    is_admin boolean NOT NULL,
    password text
);


ALTER TABLE public.users OWNER TO golfapp;

--
-- Name: Users_ID_seq; Type: SEQUENCE; Schema: public; Owner: golfapp
--

CREATE SEQUENCE public."Users_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_ID_seq" OWNER TO golfapp;

--
-- Name: Users_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: golfapp
--

ALTER SEQUENCE public."Users_ID_seq" OWNED BY public.users.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: golfapp
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    course_name text,
    country text
);


ALTER TABLE public.courses OWNER TO golfapp;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: golfapp
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO golfapp;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: golfapp
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: golfapp
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: golfapp
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."Users_ID_seq"'::regclass);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: golfapp
--

COPY public.courses (id, course_name, country) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: golfapp
--

COPY public.users (id, email, full_name, handicap, is_admin, password) FROM stdin;
1	bp@gmail.com	Birgir	13.4000000000000004	t	123
\.


--
-- Name: Users_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: golfapp
--

SELECT pg_catalog.setval('public."Users_ID_seq"', 1, true);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: golfapp
--

SELECT pg_catalog.setval('public.courses_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

