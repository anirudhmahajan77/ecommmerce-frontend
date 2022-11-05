import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ProductDetailPage() {
  const params = useParams();
  const [bookId, setBookId] = useState(params.bookId)
  return (
    <div>
      <Header searchValue="" />
      <p>{bookId}</p>
      <Footer />
    </div>
  )
}
