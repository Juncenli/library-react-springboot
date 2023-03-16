import React from "react";
import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import Review from "../Utils/Review"

// 选择最近三条评论
export const LatestReviews: React.FC<{
    reviews: ReviewModel[], bookId: number | undefined, mobile: boolean
}> = (props) => {

    return (
        <div className={props.mobile ? 'mt-3' : 'row mt-5'}>
            <div className={props.mobile ? '' : 'col-sm-2 col-md-2'}>
                <h2>Latest Reviews: </h2>
            </div>
            <div className='col-sm-10 col-md-10'>
                {/* 使用Fragment组件（或简写形式<>和</>）将子组件包裹起来，而不需要额外的<div>元素。这可以帮助减少不必要的DOM节点，并使组件结构更清晰。 */}
                {props.reviews.length > 0 ?
                    <>
                        {props.reviews.slice(0, 3).map(eachReview => (
                            <Review review={eachReview} key={eachReview.id}></Review>
                        ))}

                        <div className='m-3'>
                            <Link type='button' className='btn main-color btn-md text-white'
                                to={`/reviewlist/${props.bookId}`}>
                                Reach all reviews.
                            </Link>
                        </div>
                    </>
                    :
                    <div className='m-3'>
                        <p className='lead'>
                            Currently there are no reviews for this book
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default LatestReviews;