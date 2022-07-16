import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { createPost } from "../../../client/request";
import Loader from "../../../components/Loader";
import { useStore } from "../../../shared";
import { getValue, useWindowSize } from "../../../utils/common";

const PostCreate = () => {
  const router = useRouter();
  const [state, dispatch] = useStore();
  const window = useWindowSize();
  const [image, setImage] = useState(null);
  const [rawImg, setRawImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const user = getValue(state, ["user"], null);

  const handleImgae = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      console.log(e.target.result);
      setRawImg(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleForm = async(e) => {
    e.preventDefault();
    const session = await getSession();
    console.log({session})
    const form = new FormData();
    form.append('image', image);
    form.append('title', title);
    form.append('description', description);
    form.append('category', category);
    
    const result = await createPost(form);
    if(!result.error) {
      setTitle("");
      setDescription("");
      setImage(null);
      setCategory("");
    }
  }

  console.log('user', user);

  if (user && user.authenticating) {
    return <Loader />
  }
  if (!user.authenticated) {
    router.replace("/");
  }

  return (
    <Container>
      <Row style={{ textAlign: "center" }}>
        <h1 className="heading">Create News</h1>
      </Row>
      <Form
        style={{
          width: `${window[0] > 768 ? "50vw" : "90vw"}`,
          margin: "0 auto",
        }}
        onSubmit={handleForm}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>News Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Describe your post here..."
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Image File"
            onChange={handleImgae}
          />
        </Form.Group>
        {image && (
          <Col style={{marginTop: '0.5rem'}}>
            <Image 
                src={rawImg}
                alt="Selected Image"
                style={{
                    width: '20vh',
                    height: '20vh'
                }}
            />
          </Col>
        )}
        <br />
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
          </Form.Select>
        </Form.Group>
        <Form.Group style={{ marginTop: "1rem" }}>
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default PostCreate;
