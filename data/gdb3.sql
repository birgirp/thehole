PGDMP                         w            d9nps47np7nuj2     11.2 (Ubuntu 11.2-1.pgdg16.04+1)    11.2 J    R           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            S           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            T           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            U           1262    14437925    d9nps47np7nuj2    DATABASE     �   CREATE DATABASE d9nps47np7nuj2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE d9nps47np7nuj2;
             wdjicccgirusxg    false            V           0    0    DATABASE d9nps47np7nuj2    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE d9nps47np7nuj2 FROM PUBLIC;
                  wdjicccgirusxg    false    3925            W           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO wdjicccgirusxg;
GRANT ALL ON SCHEMA public TO PUBLIC;
                  wdjicccgirusxg    false    3            X           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO wdjicccgirusxg;
                  postgres    false    640            �            1259    14763555    courses    TABLE     �   CREATE TABLE public.courses (
    id integer NOT NULL,
    course_name text NOT NULL,
    country text NOT NULL,
    tee text NOT NULL
);
    DROP TABLE public.courses;
       public         wdjicccgirusxg    false            �            1259    14763553    courses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.courses_id_seq;
       public       wdjicccgirusxg    false    199            Y           0    0    courses_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;
            public       wdjicccgirusxg    false    198            �            1259    17066227    hole_scores    TABLE     �   CREATE TABLE public.hole_scores (
    scorecard_id integer NOT NULL,
    hole_id integer NOT NULL,
    strokes integer,
    points integer
);
    DROP TABLE public.hole_scores;
       public         wdjicccgirusxg    false            �            1259    14763953    holes    TABLE     �   CREATE TABLE public.holes (
    hole integer NOT NULL,
    par integer NOT NULL,
    handicap integer NOT NULL,
    course_id integer NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.holes;
       public         wdjicccgirusxg    false            �            1259    15393124    holes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.holes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.holes_id_seq;
       public       wdjicccgirusxg    false    200            Z           0    0    holes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.holes_id_seq OWNED BY public.holes.id;
            public       wdjicccgirusxg    false    201            �            1259    17066069 
   scorecards    TABLE     �   CREATE TABLE public.scorecards (
    id integer NOT NULL,
    tour_round_id integer NOT NULL,
    player_id integer NOT NULL,
    round_date date NOT NULL,
    course_id integer NOT NULL,
    handicap integer NOT NULL,
    status text NOT NULL
);
    DROP TABLE public.scorecards;
       public         wdjicccgirusxg    false            �            1259    17066067    scorecards_id_seq    SEQUENCE     �   CREATE SEQUENCE public.scorecards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.scorecards_id_seq;
       public       wdjicccgirusxg    false    209            [           0    0    scorecards_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.scorecards_id_seq OWNED BY public.scorecards.id;
            public       wdjicccgirusxg    false    208            �            1259    17065921    tour_courses    TABLE     c   CREATE TABLE public.tour_courses (
    tour_id integer NOT NULL,
    course_id integer NOT NULL
);
     DROP TABLE public.tour_courses;
       public         wdjicccgirusxg    false            �            1259    17065863    tour_players    TABLE     c   CREATE TABLE public.tour_players (
    tour_id integer NOT NULL,
    player_id integer NOT NULL
);
     DROP TABLE public.tour_players;
       public         wdjicccgirusxg    false            �            1259    17066017    tour_rounds    TABLE     ~   CREATE TABLE public.tour_rounds (
    id integer NOT NULL,
    tour_id integer NOT NULL,
    round_number integer NOT NULL
);
    DROP TABLE public.tour_rounds;
       public         wdjicccgirusxg    false            �            1259    17066015    tour_rounds_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tour_rounds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tour_rounds_id_seq;
       public       wdjicccgirusxg    false    207            \           0    0    tour_rounds_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tour_rounds_id_seq OWNED BY public.tour_rounds.id;
            public       wdjicccgirusxg    false    206            �            1259    17065848    tours    TABLE     s   CREATE TABLE public.tours (
    id integer NOT NULL,
    tour_name text NOT NULL,
    tour_status text NOT NULL
);
    DROP TABLE public.tours;
       public         wdjicccgirusxg    false            �            1259    17065846    tours_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tours_id_seq;
       public       wdjicccgirusxg    false    203            ]           0    0    tours_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tours_id_seq OWNED BY public.tours.id;
            public       wdjicccgirusxg    false    202            �            1259    14763367    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    full_name text NOT NULL,
    handicap double precision NOT NULL,
    password text NOT NULL,
    is_admin boolean NOT NULL
);
    DROP TABLE public.users;
       public         wdjicccgirusxg    false            �            1259    14763365    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       wdjicccgirusxg    false    197            ^           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            public       wdjicccgirusxg    false    196            �           2604    14763558 
   courses id    DEFAULT     h   ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);
 9   ALTER TABLE public.courses ALTER COLUMN id DROP DEFAULT;
       public       wdjicccgirusxg    false    198    199    199            �           2604    15393126    holes id    DEFAULT     d   ALTER TABLE ONLY public.holes ALTER COLUMN id SET DEFAULT nextval('public.holes_id_seq'::regclass);
 7   ALTER TABLE public.holes ALTER COLUMN id DROP DEFAULT;
       public       wdjicccgirusxg    false    201    200            �           2604    17066072    scorecards id    DEFAULT     n   ALTER TABLE ONLY public.scorecards ALTER COLUMN id SET DEFAULT nextval('public.scorecards_id_seq'::regclass);
 <   ALTER TABLE public.scorecards ALTER COLUMN id DROP DEFAULT;
       public       wdjicccgirusxg    false    208    209    209            �           2604    17066020    tour_rounds id    DEFAULT     p   ALTER TABLE ONLY public.tour_rounds ALTER COLUMN id SET DEFAULT nextval('public.tour_rounds_id_seq'::regclass);
 =   ALTER TABLE public.tour_rounds ALTER COLUMN id DROP DEFAULT;
       public       wdjicccgirusxg    false    207    206    207            �           2604    17065851    tours id    DEFAULT     d   ALTER TABLE ONLY public.tours ALTER COLUMN id SET DEFAULT nextval('public.tours_id_seq'::regclass);
 7   ALTER TABLE public.tours ALTER COLUMN id DROP DEFAULT;
       public       wdjicccgirusxg    false    202    203    203            �           2604    14763370    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       wdjicccgirusxg    false    197    196    197            D          0    14763555    courses 
   TABLE DATA               @   COPY public.courses (id, course_name, country, tee) FROM stdin;
    public       wdjicccgirusxg    false    199   fP       O          0    17066227    hole_scores 
   TABLE DATA               M   COPY public.hole_scores (scorecard_id, hole_id, strokes, points) FROM stdin;
    public       wdjicccgirusxg    false    210   �P       E          0    14763953    holes 
   TABLE DATA               C   COPY public.holes (hole, par, handicap, course_id, id) FROM stdin;
    public       wdjicccgirusxg    false    200   �P       N          0    17066069 
   scorecards 
   TABLE DATA               k   COPY public.scorecards (id, tour_round_id, player_id, round_date, course_id, handicap, status) FROM stdin;
    public       wdjicccgirusxg    false    209   KQ       J          0    17065921    tour_courses 
   TABLE DATA               :   COPY public.tour_courses (tour_id, course_id) FROM stdin;
    public       wdjicccgirusxg    false    205   hQ       I          0    17065863    tour_players 
   TABLE DATA               :   COPY public.tour_players (tour_id, player_id) FROM stdin;
    public       wdjicccgirusxg    false    204   �Q       L          0    17066017    tour_rounds 
   TABLE DATA               @   COPY public.tour_rounds (id, tour_id, round_number) FROM stdin;
    public       wdjicccgirusxg    false    207   �Q       H          0    17065848    tours 
   TABLE DATA               ;   COPY public.tours (id, tour_name, tour_status) FROM stdin;
    public       wdjicccgirusxg    false    203   �Q       B          0    14763367    users 
   TABLE DATA               S   COPY public.users (id, email, full_name, handicap, password, is_admin) FROM stdin;
    public       wdjicccgirusxg    false    197   �Q       _           0    0    courses_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.courses_id_seq', 2, true);
            public       wdjicccgirusxg    false    198            `           0    0    holes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.holes_id_seq', 18, true);
            public       wdjicccgirusxg    false    201            a           0    0    scorecards_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.scorecards_id_seq', 1, false);
            public       wdjicccgirusxg    false    208            b           0    0    tour_rounds_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tour_rounds_id_seq', 1, false);
            public       wdjicccgirusxg    false    206            c           0    0    tours_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tours_id_seq', 3, true);
            public       wdjicccgirusxg    false    202            d           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 40, true);
            public       wdjicccgirusxg    false    196            �           2606    14763952    courses pk_courses 
   CONSTRAINT     P   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT pk_courses PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.courses DROP CONSTRAINT pk_courses;
       public         wdjicccgirusxg    false    199            �           2606    15393133    holes pk_holes 
   CONSTRAINT     L   ALTER TABLE ONLY public.holes
    ADD CONSTRAINT pk_holes PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.holes DROP CONSTRAINT pk_holes;
       public         wdjicccgirusxg    false    200            �           2606    17066022    tour_rounds pk_round_id 
   CONSTRAINT     U   ALTER TABLE ONLY public.tour_rounds
    ADD CONSTRAINT pk_round_id PRIMARY KEY (id);
 A   ALTER TABLE ONLY public.tour_rounds DROP CONSTRAINT pk_round_id;
       public         wdjicccgirusxg    false    207            �           2606    17066077    scorecards pk_scorecard_id 
   CONSTRAINT     X   ALTER TABLE ONLY public.scorecards
    ADD CONSTRAINT pk_scorecard_id PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.scorecards DROP CONSTRAINT pk_scorecard_id;
       public         wdjicccgirusxg    false    209            �           2606    17065862    tours pk_tour_id 
   CONSTRAINT     N   ALTER TABLE ONLY public.tours
    ADD CONSTRAINT pk_tour_id PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tours DROP CONSTRAINT pk_tour_id;
       public         wdjicccgirusxg    false    203            �           2606    14763946    users pk_users 
   CONSTRAINT     L   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT pk_users;
       public         wdjicccgirusxg    false    197            �           1259    17065936    fki_fk_course_id    INDEX     N   CREATE INDEX fki_fk_course_id ON public.tour_courses USING btree (course_id);
 $   DROP INDEX public.fki_fk_course_id;
       public         wdjicccgirusxg    false    205            �           1259    17066213    fki_fk_course_id2    INDEX     M   CREATE INDEX fki_fk_course_id2 ON public.scorecards USING btree (course_id);
 %   DROP INDEX public.fki_fk_course_id2;
       public         wdjicccgirusxg    false    209            �           1259    17066241    fki_fk_hole    INDEX     F   CREATE INDEX fki_fk_hole ON public.hole_scores USING btree (hole_id);
    DROP INDEX public.fki_fk_hole;
       public         wdjicccgirusxg    false    210            �           1259    14763962    fki_fk_holes    INDEX     C   CREATE INDEX fki_fk_holes ON public.holes USING btree (course_id);
     DROP INDEX public.fki_fk_holes;
       public         wdjicccgirusxg    false    200            �           1259    17065871    fki_fk_player_id    INDEX     L   CREATE INDEX fki_fk_player_id ON public.tour_players USING btree (tour_id);
 $   DROP INDEX public.fki_fk_player_id;
       public         wdjicccgirusxg    false    204            �           1259    17066219    fki_fk_round_id    INDEX     O   CREATE INDEX fki_fk_round_id ON public.scorecards USING btree (tour_round_id);
 #   DROP INDEX public.fki_fk_round_id;
       public         wdjicccgirusxg    false    209            �           1259    17066235    fki_fk_scorecard    INDEX     P   CREATE INDEX fki_fk_scorecard ON public.hole_scores USING btree (scorecard_id);
 $   DROP INDEX public.fki_fk_scorecard;
       public         wdjicccgirusxg    false    210            �           1259    17065929    fki_fk_tour_id    INDEX     J   CREATE INDEX fki_fk_tour_id ON public.tour_courses USING btree (tour_id);
 "   DROP INDEX public.fki_fk_tour_id;
       public         wdjicccgirusxg    false    205            �           2606    17065931    tour_courses fk_course_id    FK CONSTRAINT     |   ALTER TABLE ONLY public.tour_courses
    ADD CONSTRAINT fk_course_id FOREIGN KEY (course_id) REFERENCES public.courses(id);
 C   ALTER TABLE ONLY public.tour_courses DROP CONSTRAINT fk_course_id;
       public       wdjicccgirusxg    false    199    205    3756            �           2606    17066208    scorecards fk_course_id2    FK CONSTRAINT     {   ALTER TABLE ONLY public.scorecards
    ADD CONSTRAINT fk_course_id2 FOREIGN KEY (course_id) REFERENCES public.courses(id);
 B   ALTER TABLE ONLY public.scorecards DROP CONSTRAINT fk_course_id2;
       public       wdjicccgirusxg    false    199    209    3756            �           2606    17066236    hole_scores fk_hole    FK CONSTRAINT     r   ALTER TABLE ONLY public.hole_scores
    ADD CONSTRAINT fk_hole FOREIGN KEY (hole_id) REFERENCES public.holes(id);
 =   ALTER TABLE ONLY public.hole_scores DROP CONSTRAINT fk_hole;
       public       wdjicccgirusxg    false    3759    200    210            �           2606    14763957    holes fk_holes    FK CONSTRAINT     q   ALTER TABLE ONLY public.holes
    ADD CONSTRAINT fk_holes FOREIGN KEY (course_id) REFERENCES public.courses(id);
 8   ALTER TABLE ONLY public.holes DROP CONSTRAINT fk_holes;
       public       wdjicccgirusxg    false    200    3756    199            �           2606    17065916    tour_players fk_player_id    FK CONSTRAINT     z   ALTER TABLE ONLY public.tour_players
    ADD CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES public.users(id);
 C   ALTER TABLE ONLY public.tour_players DROP CONSTRAINT fk_player_id;
       public       wdjicccgirusxg    false    3754    204    197            �           2606    17066078    scorecards fk_player_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.scorecards
    ADD CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES public.users(id);
 A   ALTER TABLE ONLY public.scorecards DROP CONSTRAINT fk_player_id;
       public       wdjicccgirusxg    false    197    3754    209            �           2606    17066214    scorecards fk_round_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.scorecards
    ADD CONSTRAINT fk_round_id FOREIGN KEY (tour_round_id) REFERENCES public.tour_rounds(id);
 @   ALTER TABLE ONLY public.scorecards DROP CONSTRAINT fk_round_id;
       public       wdjicccgirusxg    false    3766    207    209            �           2606    17066230    hole_scores fk_scorecard    FK CONSTRAINT     �   ALTER TABLE ONLY public.hole_scores
    ADD CONSTRAINT fk_scorecard FOREIGN KEY (scorecard_id) REFERENCES public.scorecards(id);
 B   ALTER TABLE ONLY public.hole_scores DROP CONSTRAINT fk_scorecard;
       public       wdjicccgirusxg    false    209    3770    210            �           2606    17065911    tour_players fk_tour_id    FK CONSTRAINT     v   ALTER TABLE ONLY public.tour_players
    ADD CONSTRAINT fk_tour_id FOREIGN KEY (tour_id) REFERENCES public.tours(id);
 A   ALTER TABLE ONLY public.tour_players DROP CONSTRAINT fk_tour_id;
       public       wdjicccgirusxg    false    3761    204    203            �           2606    17065924    tour_courses fk_tour_id    FK CONSTRAINT     v   ALTER TABLE ONLY public.tour_courses
    ADD CONSTRAINT fk_tour_id FOREIGN KEY (tour_id) REFERENCES public.tours(id);
 A   ALTER TABLE ONLY public.tour_courses DROP CONSTRAINT fk_tour_id;
       public       wdjicccgirusxg    false    203    205    3761            �           2606    17066060    tour_rounds fk_tour_id    FK CONSTRAINT     u   ALTER TABLE ONLY public.tour_rounds
    ADD CONSTRAINT fk_tour_id FOREIGN KEY (tour_id) REFERENCES public.tours(id);
 @   ALTER TABLE ONLY public.tour_rounds DROP CONSTRAINT fk_tour_id;
       public       wdjicccgirusxg    false    207    3761    203            D   4   x�3��/*�I����L���/�2�t��/�L�)-�N�䬄��qqq x��      O      x������ � �      E   t   x�%N�0:�0}!�|v��s��$�
�'������KX,��g��f�����kvx�^\��i��auWנTz�JTo�&ݕ���-	�hS�Z�.Ѧ/r����h˨���!��<      N      x������ � �      J      x������ � �      I      x������ � �      L      x������ � �      H      x�3�LKCN���<.#T�1*7F��� �{�      B   �   x�eMI�0<O^�"�I���/@�����"uSˇx#�y��69tK�1����m^%��8	C,,`f��*pd��r58|�����KvIö��ߋ�������>н"Kj/�d}���+������^�@TBQ&7k�y1=�     