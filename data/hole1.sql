PGDMP     "                    w            d9nps47np7nuj2     11.2 (Ubuntu 11.2-1.pgdg16.04+1)    11.2     *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            -           1262    14437925    d9nps47np7nuj2    DATABASE     �   CREATE DATABASE d9nps47np7nuj2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE d9nps47np7nuj2;
             wdjicccgirusxg    false            .           0    0    DATABASE d9nps47np7nuj2    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE d9nps47np7nuj2 FROM PUBLIC;
                  wdjicccgirusxg    false    3885            /           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO wdjicccgirusxg;
                  postgres    false    643            �            1259    17066227    hole_scores    TABLE     �   CREATE TABLE public.hole_scores (
    scorecard_id integer NOT NULL,
    hole_id integer NOT NULL,
    strokes integer,
    points integer
);
    DROP TABLE public.hole_scores;
       public         wdjicccgirusxg    false            '          0    17066227    hole_scores 
   TABLE DATA               M   COPY public.hole_scores (scorecard_id, hole_id, strokes, points) FROM stdin;
    public       wdjicccgirusxg    false    210   �       �           1259    17066241    fki_fk_hole    INDEX     F   CREATE INDEX fki_fk_hole ON public.hole_scores USING btree (hole_id);
    DROP INDEX public.fki_fk_hole;
       public         wdjicccgirusxg    false    210            �           1259    17066235    fki_fk_scorecard    INDEX     P   CREATE INDEX fki_fk_scorecard ON public.hole_scores USING btree (scorecard_id);
 $   DROP INDEX public.fki_fk_scorecard;
       public         wdjicccgirusxg    false    210            �           2606    17066236    hole_scores fk_hole    FK CONSTRAINT     r   ALTER TABLE ONLY public.hole_scores
    ADD CONSTRAINT fk_hole FOREIGN KEY (hole_id) REFERENCES public.holes(id);
 =   ALTER TABLE ONLY public.hole_scores DROP CONSTRAINT fk_hole;
       public       wdjicccgirusxg    false    210            �           2606    17066230    hole_scores fk_scorecard    FK CONSTRAINT     �   ALTER TABLE ONLY public.hole_scores
    ADD CONSTRAINT fk_scorecard FOREIGN KEY (scorecard_id) REFERENCES public.scorecards(id);
 B   ALTER TABLE ONLY public.hole_scores DROP CONSTRAINT fk_scorecard;
       public       wdjicccgirusxg    false    210            '     x�=�A�D!D���LDQ�.}�sP@ҋ���Mw�3�X�o� iM�(�m�;K�T;�w��7���$M��d6Q���v�O)��/c£+iQʡ����Z:�tk�N����5(2S�`YU�p=��!^##6�v�n���u3���� ��)���^�C��N�cq;�s�s���ݜ��8厍;h�2xq�;�b�� �UK���|r;�R�b�v�T�̘�'�pf�K��-� �;��0 ��Wq6�� P�jmw��ˇA2�'�8���J��:�&!���:����l��մ���4ݦ����;���s��q:����n��F����a�<Sn�"�������-^Th�n:ڠ�'�Sb0"���8�Ww�8�AzÝL�]
��O���[��h)����R"j���&Շ�)���Sɩ���_P�T�V_P�T"[ۥ�Z&�U����݊fy���PT��x�/7b��O�rC��H�r}W4ȗ��F{�˺��rqc$sb|��_ZU�ve����!����t���넯�����<��     