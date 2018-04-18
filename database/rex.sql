--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: books; Type: TABLE; Schema: public; Owner: Mike
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title text NOT NULL,
    thumbnail_url text,
    description text,
    url text
);


ALTER TABLE public.books OWNER TO "Mike";

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: Mike
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO "Mike";

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Mike
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: Mike
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    recommender_id integer,
    user_id integer NOT NULL,
    recommender_name text,
    comment text,
    item_id integer NOT NULL,
    date_added timestamp with time zone DEFAULT now(),
    category text
);


ALTER TABLE public.recommendations OWNER TO "Mike";

--
-- Name: users; Type: TABLE; Schema: public; Owner: Mike
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text
);


ALTER TABLE public.users OWNER TO "Mike";

--
-- Name: users_books_id_seq; Type: SEQUENCE; Schema: public; Owner: Mike
--

CREATE SEQUENCE public.users_books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_books_id_seq OWNER TO "Mike";

--
-- Name: users_books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Mike
--

ALTER SEQUENCE public.users_books_id_seq OWNED BY public.recommendations.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: Mike
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "Mike";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Mike
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.users_books_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: Mike
--

COPY public.books (id, title, thumbnail_url, description, url) FROM stdin;
2	Harry Potter	somesite	harry potter	potterlink
3	Twilight	vampires.com	vampires and romance, yay	vampires.com
4	biography	somebio.image	this is a biography	bio.com
\.


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: Mike
--

COPY public.recommendations (id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category) FROM stdin;
6	\N	3	Bob	read this	2	2018-04-10 16:03:13.518751-05	books
7	\N	3	Sarah	its a book	2	2018-04-14 10:42:00.693776-05	books
8	\N	3	Jill	Moving	3	2018-04-14 10:42:45.556004-05	books
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: Mike
--

COPY public.users (id, username, password, first_name, last_name) FROM stdin;
3	mike	12345	mike	\N
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Mike
--

SELECT pg_catalog.setval('public.books_id_seq', 3, true);


--
-- Name: users_books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Mike
--

SELECT pg_catalog.setval('public.users_books_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Mike
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: recommendations users_books_pkey; Type: CONSTRAINT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT users_books_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: recommendations users_books_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT users_books_book_id_fkey FOREIGN KEY (item_id) REFERENCES public.books(id);


--
-- Name: recommendations users_books_recommender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT users_books_recommender_id_fkey FOREIGN KEY (recommender_id) REFERENCES public.users(id);


--
-- Name: recommendations users_books_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Mike
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT users_books_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

