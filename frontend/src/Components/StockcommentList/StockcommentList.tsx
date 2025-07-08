import React from 'react'
import { CommentGet } from '../../Models/Comment'
import StockCommentListItem from '../StockCommentListItem/StockCommentListItem'

type Props = {
    comments: CommentGet[]
}

const StockcommentList = ({ comments }: Props) => {
  return (
    <div>
        { comments ? comments.map((comment) => {
            return <StockCommentListItem key={comment.createdBy + comment.content} comment={comment} />
        }) : ""}
    </div>
  )
}

export default StockcommentList