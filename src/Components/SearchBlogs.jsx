import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MiniNav from './Feature/MiniNav';
import BlogLoader from './utils/BlogLoader';
import CardBlogs from './CardBlogs';
import { fetchBlogsBySearch } from '../Store/slices/blogSlices';
import { useParams } from 'react-router';

function SearchBlogs() {
    const dispatch = useDispatch()
    const {term} = useParams()
    useEffect(() => {
        dispatch(fetchBlogsBySearch(term))
    }, [term])
    const { SearchBlogs, error, loading } = useSelector((state) => state?.blogs);
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
            ) :(<div className="row">
                <h3 style={{color : 'teal', fontWeight: 'bolder'}}>
                    Search for : <button className='btn btn-outline'>{term}</button>
                    <button className='btn btn-outline'>Results: {SearchBlogs.length} found</button>
                    </h3>
                {
                    SearchBlogs.length===0 && (
                        <div>No Results Found!</div>
                    )
                }
            {SearchBlogs.map((blogObj) => {
              return <CardBlogs key={blogObj.id} blog={blogObj} />; 
            })}
          </div>) }
        
        </>
          
    )
}

export default SearchBlogs