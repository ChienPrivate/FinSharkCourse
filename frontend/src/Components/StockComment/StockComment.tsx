import React, { useEffect } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentGetAPI, commentPostAPI } from '../../Service/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import Spinner from '../Spinner/Spinner';
import StockcommentList from '../StockcommentList/StockcommentList';

type Props = {
    stockSymbol : string;
};

type CommentFormInputs = {
  title : string;
  content: string;
}

const StockComment = ({ stockSymbol }: Props) => {
  const [comment, setComment] = React.useState<CommentGet[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>();

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol)
    .then((res) => {
      if(res) {
        toast.success("Comment created successfully!");
        getComments();
      }
    })
    .catch((e) => {
      toast.warning(e);
    })
  }

  const getComments = () => {
    setLoading(true);
    commentGetAPI(stockSymbol).then((res) => {
      if(res) {
        setLoading(false);
        setComment(res?.data);
      }
    })
      
  }

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockcommentList comments={comment!} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  )
}

export default StockComment