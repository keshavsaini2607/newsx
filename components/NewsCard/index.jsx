import Link from "next/link";
import React from "react";
import { Button, Card } from "react-bootstrap";

const NewsCard = ({ post }) => {
  return (
    <div
      className="block overflow-hidden border border-gray-100 rounded-lg shadow-sm"
      href=""
    >
      <img className="object-cover w-full h-56" src={post.image} alt="fas" />

      <div className="p-6">
        <h5 className="text-xl font-bold truncate">{post.title}</h5>
        <Link
          href={`/post/${post._id}/${post.slug.toLocaleLowerCase()}`}
          variant="primary"
        >
          <div
            className="inline-block pb-1 mt-4 font-medium text-blue-600 border-b border-blue-500 "
            style={{ cursor: "pointer" }}
          >
            Find out more
            <span aria-hidden="true">&rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
