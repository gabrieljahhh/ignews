import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import React from 'react';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>26 de novembro de 2021</time>
                        <strong>Permanent access tokens</strong>
                        <p>These tokens allow your application to permanently access this repository.</p>
                    </a>
                    <a href="#">
                        <time>26 de novembro de 2021</time>
                        <strong>Permanent access tokens</strong>
                        <p>These tokens allow your application to permanently access this repository.</p>
                    </a>
                    <a href="#">
                        <time>26 de novembro de 2021</time>
                        <strong>Permanent access tokens</strong>
                        <p>These tokens allow your application to permanently access this repository.</p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()
    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['post.title', 'post.content'],
        pageSize: 100
    })
    console.log(JSON.stringify(response, null, 2))
    return {
        props: {

        }
    }
}