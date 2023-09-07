import '../assets/styles/Question.css';
import React, {useEffect, useRef, useState} from "react";
import Tag from '../components/Tag';
import Comment from "../components/Comment";
import data from '../assets/data.json'
import {
  EyeOutlined, MessageOutlined, SearchOutlined, StarFilled, StarOutlined
} from '@ant-design/icons'

export default function Question() {
  const [logs, setLogs] = useState('');
  const [collect, setCollect] = useState(false);
  const containerRef = useRef(null);
  const [showComment, setShowComment] = useState(false);
  useEffect(() => {
    // 在内容更新后使滚动条滚动到最底部
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const descText = '这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。' + '这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。' + '这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。';

  return <div>
    日志：
    <div className='log' ref={containerRef}>
      <p dangerouslySetInnerHTML={{__html: logs}}></p>
    </div>
    <br/>
    <br/>
    <div style={{border: '1px solid #ccc', height: '100vh', padding: "10px"}}>
      {/*最上一排 搜索框及我要评论按钮*/}
      <div className='search'>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="请输入"
            onChange={(e) => setLogs((prevState) => `${prevState}搜索框输入了${e.target.value}<br/>`)}
          />
          <button className="search-button" onClick={async () => setLogs((prevState) => `${prevState}点击了 搜索 按钮<br/>`)}>
            <SearchOutlined/>
            搜索
          </button>
        </div>
        <div className='search-create-question'>
          <button
            className="search-create-question-button"
            onClick={async () => setLogs((prevState) => `${prevState}点击了 我要提问 按钮<br/>`)}
          >
            我要提问
          </button>
        </div>
      </div>
      {/*面包屑*/}
      <p>
        <a href="#" className='bread-crumb'>论坛</a>/ <a href="#" className='bread-crumb'>最新</a>
      </p>
      {/*主体*/}
      <div className='question-container'>
        <div className='question-title'>
          <h3 style={{flex: 1}}>与其等待与能力匹配的机会，不如培养与机会匹配的能力</h3>
          <div style={{textAlign: "right", flex: 1}}>
            <Tag text='未回答' color='#A4E8A4FF'/>
          </div>
        </div>
        {/*编写了一个tag组件，传入文字text和颜色color*/}
        <Tag text='admin' color='#EFEFEFFF'/>
        <div className="desc-container">
          <div className="desc-left-box"/>
          <div className="desc-text" title={descText}>
            {descText}
          </div>
        </div>
        <div className='question-tag'>
          <div className='question-tag-left'>
            <Tag text='数据' color='#EFEFEFFF'/>
            <Tag text='功能' color='#EFEFEFFF'/>
          </div>
          <div className='question-tag-right'>
            <button
              className='question-tag-button'
              onClick={async () => setLogs((prevState) => `${prevState}点击了 评论 按钮<br/>`)}
            >
              <MessageOutlined/> 评论
            </button>
          </div>
        </div>
        <div>
          <p>
            <a className='bread-crumb' href="#" onClick={() => {
              setCollect(!collect)
              setLogs((prevState) => `${prevState}点击了 收藏 按钮<br/>`)
            }}>
              {collect ? <StarFilled/> : <StarOutlined/>} 收藏
            </a>
            <a className='bread-crumb' href="#">
              <EyeOutlined/> 140
            </a>
            <a className='bread-crumb' href="#" onClick={() => {
              setShowComment(!showComment)
              setLogs((prevState) => `${prevState}点击了 查看评论 按钮<br/>`)
            }}>
              <MessageOutlined/> {data.length}
            </a>
          </p>
        </div>
        {
          showComment && <>
            {data.length}回复
            <hr/>
            <Comment commentData={data} fun={setLogs}/>
          </>
        }
      </div>
    </div>
  </div>
}