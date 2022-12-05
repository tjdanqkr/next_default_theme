import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Post from "../types/post";
import { env } from "process";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const [list, setList] = useState([
    { name: "kkk", age: 20 },
    { name: "aaa", age: 22 },
    { name: "fff", age: 23 },
  ]);
  useEffect(() => {
    funx();
  }, []);
  const funx = () => {
    const agereduce = list.reduce((pre, cur) => {
      return { name: pre.name + cur.name, age: pre.age + cur.age };
    });
    setList([agereduce, ...list]);
  };
  const [checked, setChecked] = useState(0);
  const onChange = (age: any) => {
    if (checked === age) {
      setChecked(0);
    } else {
      setChecked(age);
    }
  };
  return (
    <>
      <Layout>
        <Head>
          <title>Eng_Study</title>
        </Head>
        <Container>
          <table>
            <tr>
              <td>check</td>
              <td>name</td>
              <td>age</td>
            </tr>
            {list.map((data) => (
              <tr>
                <td>
                  <input
                    type="checkBox" //
                    onChange={() => onChange(data.age)}
                    checked={data.age === checked}
                  ></input>
                </td>
                <td>{data.name}</td>
                <td>{data.age}</td>
              </tr>
            ))}
            <tr></tr>
          </table>
          <button>submit</button>
          <Intro />
          {heroPost && <HeroPost title={heroPost.title} coverImage={heroPost.coverImage} date={heroPost.date} author={heroPost.author} slug={heroPost.slug} excerpt={heroPost.excerpt} />}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

  return {
    props: { allPosts },
  };
};
