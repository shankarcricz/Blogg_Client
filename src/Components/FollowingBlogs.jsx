import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowPosts } from '../Store/slices/blogSlices';
import CardBlogs from './CardBlogs';
import MiniNav from './Feature/MiniNav';
import BlogLoader from './utils/BlogLoader';
import Cookies from 'js-cookie';
import LoginChecker from './Feature/LoginChecker';

const FollowingBlogs = React.memo(() => {
    const dispatch = useDispatch()
    const { followPosts, error, loading } = useSelector((state) => state?.blogs);
    useEffect(() => {
        dispatch(fetchFollowPosts())
    }, [])
    window.document.addEventListener('scroll', () => {
      let a = document.querySelector('#navbar')
      if(window.pageYOffset > 75) {
        a?.classList.add('fixed')
      } else {
        a?.classList.remove('fixed')
      }
      
    })
    return (
      <>
      <MiniNav/>
      {loading ? (
            <>
            <div className='row'>
            <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
            </div>
              
            </>
          ) :(
          
          !Cookies.get('jwt') ? <LoginChecker/> :
          <div className="row">
           {followPosts.length === 0 && <>
            <div className='paper p-5'>Follow someone to see their feeds here!</div>
           </>}
          {followPosts?.map((blogObj) => {
            return <CardBlogs key={blogObj.id} blog={blogObj} />; 
          })}
        </div>) }
      </>
        
  )
})

export default FollowingBlogs