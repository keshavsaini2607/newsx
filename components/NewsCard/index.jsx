import Link from "next/link";
import React from "react";
import { Button, Card } from "react-bootstrap";

const NewsCard = ({ post }) => {
  return (
    <Card style={{ width: "18rem", marginTop: '0.5rem' }}>
      <Card.Img variant="top" src={post.image} height="200px" />
      <Card.Body>
        <Card.Title id="title">{post.title}</Card.Title>
        <Card.Text>
          {new Date(post.createdAt).toDateString()}
        </Card.Text>
        <Link href={`/post/${post._id}/${post.slug.toLocaleLowerCase()}`} variant="primary">Read Full Article</Link>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
