import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import { getAllPosts } from "../client/request";
import Banner from "../components/Banner";
import HomeCarousel from "../components/Carousel";
import NewsCard from "../components/NewsCard";
import Layout from "../components/Layout";

export default function Home({ posts }) {
  console.log("posts", posts);

  return (
    <Layout>
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <Banner />
        <div style={{ padding: "2rem" }}>
          <div className="grid  gap-4 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-1"> 
            {posts &&
              posts.map((post) => (
                <div key={post._id} >
                  <NewsCard post={post} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await getAllPosts();
  if (!result.error) {
    return {
      props: {
        posts: result?.body,
      },
    };
  } else {
    return {
      props: {
        posts: null,
      },
      revalidate: 5,
    };
  }
}
