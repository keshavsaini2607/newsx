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
import Layout from "../../components/Layout";
import NothingSaved from "./NothingSaved";
import NothingCreated from "./NothingCreated";

const Profile = ({ posts, session }) => {
  const router = useRouter();
  const user = getValue(session, ["user"], null);
  const [editingEnabled, setEditingEnabled] = useState(false);

  return (
    <Layout>
      <div style={{ flex: 1, minHeight: "120vh", paddingBottom: '4vh' }}>
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
                <NothingSaved />
              </Tab>
              <Tab eventKey="profile" title="My News">
                <div className="grid  gap-4 tablet:grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-1">
                  {posts &&
                    posts.map((item) => (
                      <div key={item._id}>
                        <NewsCard post={item} />
                      </div>
                    ))}
                </div>
                {
                  posts?.length < 1 && <NothingCreated />
                }
              </Tab>
            </Tabs>
          </Row>
        </Container>
      </div>
    </Layout>
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
