import React from 'react';
import { useParams } from 'react-router-dom';
import AuthorDetailsPage from '../Pages/AuthorDetailsPage';

export default function AuthorDetailContainer() {
    const params = useParams();
    const authorId = params.authorId;
  return (
    <AuthorDetailsPage authorId={authorId} />
  )
}
