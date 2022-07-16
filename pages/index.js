import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import { getAllPosts } from "../client/request";
import HomeCarousel from "../components/Carousel";
import NewsCard from "../components/NewsCard";

export default function Home({ posts }) {
  console.log("posts", posts);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <HomeCarousel message='Daily new headlines from all over the world' />
      <div style={{ padding: '2rem' }}>
        <Row>
          {posts &&
            posts.map((post) => (
              <Col key={post._id}>
                <NewsCard post={post} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
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
      revalidate: 5
    };
  }
}
