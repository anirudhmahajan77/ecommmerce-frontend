import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import ProductDetailsContent from '../Components/ProductDetailsContent';
import Footer from '../Components/Footer';


export default function ProductDetailPage() {
  const params = useParams();
  const [bookId, setBookId] = useState(params.bookId);

  return (
    <div>
      <Header searchValue="" />
      <ProductDetailsContent bookId={bookId} />
      <Footer />
    </div>
  )
}
