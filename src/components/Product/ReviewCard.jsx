import React from 'react'

const ReviewCard = ({review}) => {
    return (
        <>
        {/* use name,comment,user-profile-image and rating */}
        <div className='my-0'>
            <div className="flex flex-row gap-1 md:gap-5 m-auto w-3/4 border border-gray-400 h-auto rounded-2xl shadow-2xl">
                <div className='flex flex-col image w-1/4 left-0'>
                {/* img is changable */}
                    <img src="/Profile.png" alt="" className="h-3/4" />  
                    <span className='flex justify-center text-center text-md'>{review.name}</span>
                </div>
                <div className=' w-3/4 left-1/4 flex flex-col '>
                    <div className='flex justify-center text-center items-center text-gray-900 h-3/4 '>{review.comment}</div>
                    <div className='flex text-center justify-center'>
                        {/* use react starts */}
                        {review.rating} stars
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ReviewCard