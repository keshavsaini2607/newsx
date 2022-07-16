import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Image,
  PageItem,
  Row,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import { getValue } from "../../utils/common";
import { getSession } from "next-auth/react";
import { getUserPosts } from "../../client/request";
import HomeCarousel from "../../components/Carousel";
import NewsCard from "../../components/NewsCard";

const Profile = ({ posts, session }) => {
  const router = useRouter();
  const user = getValue(session, ["user"], null);
  const [editingEnabled, setEditingEnabled] = useState(false);

  console.log({ posts });

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <HomeCarousel message="Create a portifolio of your own curated news items" />
      <Container>
        <Form style={{ padding: "0.5rem" }}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" value={user.name} disabled />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={user.email} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup style={{ width: "50%" }}>
              <Button
                variant="secondary"
                style={{ margin: "1rem" }}
                disabled={editingEnabled}
              >
                Enable Editing
              </Button>
              <Button
                variant="primary"
                style={{ margin: "1rem", marginRight: "0" }}
                disabled={!editingEnabled}
              >
                Save Changes
              </Button>
            </ButtonGroup>
          </Row>
        </Form>
        <Row>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="savedNews" title="My Saved News">
              <h1>You have nothing saved</h1>
            </Tab>
            <Tab eventKey="profile" title="My News">
              <Row>
                {posts &&
                  posts.map((item) => (
                    <Col key={item._id}>
                      <NewsCard post={item} />
                    </Col>
                  ))}
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (ctx) => {
  try {
    const session = await getSession({ req: ctx.req });
    if (session) {
      const userPosts = await getUserPosts({ id: session.user.id });
      console.log({ userPosts });
      return {
        props: {
          posts: userPosts.body,
          session,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
