import React, {useEffect, useState} from "react";
import '../assets/styles/Comments.css'
import {LikeFilled, LikeOutlined, MessageOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import data from "../assets/data.json";

export default function Comment({commentData,fun, parentId = 0}) {
  const [showCommentDetail, setShowCommentDetail] = useState(false)
  const [comment, setComment] = useState([]);
  //拿到所有replyId为根回复的数组
  const parentData = commentData.filter(item => item.replyId === parentId);

  //写一个递归，将回复组合为包含为children格式的数据
  function findChildren(list, data) {
    const newList = [];
    list.forEach((item) => {
      //如果没有showChildren字段，则是第一次更新，则增加一个默认值，是否展示子评论
      if (!item.showChildren) {
        item.showChildren = false
      }
      item.children = data.filter((ep) => ep.replyId === item.id);
      const remainingData = data.filter((ep) => ep.replyId !== item.id); // 过滤出未被处理的数据
      if (item.children.length > 0) {
        findChildren(item.children, remainingData);
      }
      newList.push(item);
    });
    return newList;
  }

  //写一个方法，可以改变数组中的点赞数
  function ChangeLikedFlag(list, targetId) {
    fun((prevState) => `${prevState}点击了 点赞 按钮<br/>`)
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === targetId) {
        list[i].likedFlag = !list[i].likedFlag;
        if (list[i].likedFlag) {
          list[i].likedCount += 1
        } else {
          list[i].likedCount -= 1
        }
      }
      if (list[i].children && list[i].children.length > 0) {
        ChangeLikedFlag(list[i].children, targetId)
      }
    }
    setComment(findChildren(parentData, list))
  }

  //写一个方法，可以改变数组中的收藏数
  function ChangeCollectedFlag(list, targetId) {
    fun((prevState) => `${prevState}点击了 收藏 按钮<br/>`)
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === targetId) {
        list[i].collectedFlag = !list[i].collectedFlag;
        if (list[i].collectedFlag) {
          list[i].collectedCount += 1
        } else {
          list[i].collectedCount -= 1
        }
      }
      if (list[i].children && list[i].children.length > 0) {
        ChangeCollectedFlag(list[i].children, targetId)
      }
    }
    setComment(findChildren(parentData, list))
  }

  //写一个方法，可以改变数组中的是否展示评论
  function ChangeCommentFlag(list, targetId) {
    fun((prevState) => `${prevState}点击了 展开子评论 按钮<br/>`)
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === targetId) {
        console.log(list[i].showChildren)
        list[i].showChildren = !list[i].showChildren;
      }
      if (list[i].children && list[i].children.length > 0) {
        ChangeCollectedFlag(list[i].children, targetId)
      }
    }
    setComment(findChildren(parentData, list))
  }

  useEffect(() => {
    setComment(findChildren(parentData, commentData))
  }, []);

  const CommentDetail = ({commentDetail}) => {
    return (
      <div className="comment">
        <div className="avatar">
          {commentDetail.avatar ?
            <img src={commentDetail.avatar} alt="Avatar" className="avatar-image"/>
            :
            <div className="avatar-icon">{commentDetail.createUser.substring(0, 1)}</div>}
        </div>
        <div className="comment-content">
          <div className="name">{commentDetail.createUser}</div>
          <div className="text">{commentDetail.comment}</div>
          <div className="actions">
            <a className="like-action" onClick={() => ChangeLikedFlag(comment, commentDetail.id)}>
              {
                commentDetail.likedFlag ?
                  <><LikeFilled/>{commentDetail.likedCount}</>
                  :
                  <><LikeOutlined/>{commentDetail.likedCount}</>
              }
            </a>
            <a className="collect-action" onClick={() => ChangeCollectedFlag(comment, commentDetail.id)}>
              {
                commentDetail.collectedFlag ?
                  <><StarFilled/>{commentDetail.collectedCount}</>
                  :
                  <><StarOutlined/>{commentDetail.collectedCount}</>
              }
            </a>
            <a className="comment-action" onClick={() => ChangeCommentFlag(comment, commentDetail.id)}>
              <MessageOutlined/>{commentDetail.repliedCount}
            </a>
          </div>
          {
            commentDetail.showChildren && <Comment commentData={commentDetail.children} parentId={commentDetail.id}/>
          }
        </div>
      </div>
    );
  }

  return <div>
    {
      comment.map(item => {
        return <CommentDetail key={item.id} commentDetail={item}/>
      })
    }
  </div>
}