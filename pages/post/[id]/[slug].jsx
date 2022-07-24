import React from "react";
import { Container, Image } from "react-bootstrap";
import { getSinglePost } from "../../../client/request";
import Layout from '../../../components/Layout';

const PostView = ({ post }) => {
  console.log({ post });
  return (
    <Layout>
      <Image
        src={post.image}
        alt={post.slug}
        style={{
          height: "500px",
          width: "100vw",
          objectFit: "cover",
          marginBottom: "2rem",
        }}
      />
      <Container>
        <div style={{ textAlign: "end" }}>
          <p>Written By: {post.user.fullName || "user"}</p>
          <p>On: {new Date(post.createdAt).toDateString()}</p>
        </div>
        <h1 style={{ textAlign: "center" }}>{post.title}</h1>
        <p style={{ textAlign: "justify" }}>{post.description}</p>
      </Container>
    </Layout>
  );
};

export default PostView;

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  console.log({ query });

  const result = await getSinglePost(query.id);
  if (result.error) {
    return {
      props: {
        post: {},
      },
    };
  } else {
    return {
      props: {
        post: result.body,
      },
    };
  }
};
