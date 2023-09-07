import './comment.css';
import React, {useState} from "react";
import Tag from '../components/Tag';
import {
  EyeFilled,
  EyeOutlined,
  MessageFilled,
  MessageOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined
} from '@ant-design/icons'

export default function Question() {
  const [searchInput, setSearchInput] = useState('');
  const [collect, setCollect] = useState(false);
  const descText =
    '这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。' +
    '这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。' +
    '这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。这是一个很长的文本，超过容器宽度将会显示省略号。';

  return <div>
    这是纯手写
    <br/><br/><br/><br/><br/>
    <div>
      <p>搜索框输入了{searchInput}</p>
    </div>
    <div style={{border: '1px solid #ccc', height: '100vh', padding: "10px"}}>
      {/*最上一排 搜索框及我要评论按钮*/}
      <div className='search'>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="请输入"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-button" onClick={async (e) => {
            console.log(e)
          }}>
            <SearchOutlined/>
            搜索
          </button>
        </div>
        <div className='search-create-question'>
          <button className="search-create-question-button">
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
        <h3>与其等待与能力匹配的机会，不如培养与机会匹配的能力</h3>
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
            <button className='question-tag-button'><MessageOutlined/> 评论</button>
          </div>
        </div>
        <div>
          <p>
            <a className='bread-crumb' href="#" onClick={() => setCollect(!collect)}>
              {
                collect ? <StarFilled/> : <StarOutlined/>
              } 收藏
            </a>
            <a className='bread-crumb' href="#">
              <EyeOutlined/> 140
            </a>
            <a className='bread-crumb' href="#" onClick={() => console.log("wwww")}>
              <MessageOutlined/> 6
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
}