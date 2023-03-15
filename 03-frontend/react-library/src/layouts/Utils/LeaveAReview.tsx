import { useState } from 'react';
import { StarsReview } from './StarsReview';
/* 
首先，组件定义了三个状态变量：

starInput：存储用户选择的星级评分。
displayInput：控制是否显示评论表单。
reviewDescription：存储用户输入的评价描述。
starValue函数用于设置用户选择的星级评分并显示评论表单。

组件的主要部分包括：

一个带有下拉菜单的按钮，用户可以选择星级评分。
使用StarsReview组件渲染用户选择的星级评分。
如果displayInput为true，则显示评论表单。表单包括一个文本域供用户输入评价描述，并包含一个"Submit Review"按钮。点击此按钮会触发传入的submitReview回调，并将starInput和reviewDescription作为参数传递。
在这个组件中，用户可以选择星级评分、输入评价描述，然后点击提交按钮以发送评价。提交后，将调用传入的submitReview回调函数处理用户的评价。 
*/

export const LeaveAReview: React.FC<{ submitReview: any }> = (props) => {

    const [starInput, setStarInput] = useState(0);
    const [displayInput, setDisplayInput] = useState(false);
    const [reviewDescription, setReviewDescription] = useState('');

    function starValue(value: number) {
        setStarInput(value);
        setDisplayInput(true);
    }

    return (
        <div className='dropdown' style={{ cursor: 'pointer' }}>
            <h5 className='dropdown-toggle' id='dropdownMenuButton1' data-bs-toggle='dropdown'>
                Leave a review?
            </h5>
            <ul id='submitReviewRating' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                <li><button onClick={() => starValue(0)} className='dropdown-item'>0 star</button></li>
                <li><button onClick={() => starValue(.5)} className='dropdown-item'>.5 star</button></li>
                <li><button onClick={() => starValue(1)} className='dropdown-item'>1 star</button></li>
                <li><button onClick={() => starValue(1.5)} className='dropdown-item'>1.5 star</button></li>
                <li><button onClick={() => starValue(2)} className='dropdown-item'>2 star</button></li>
                <li><button onClick={() => starValue(2.5)} className='dropdown-item'>2.5 star</button></li>
                <li><button onClick={() => starValue(3)} className='dropdown-item'>3 star</button></li>
                <li><button onClick={() => starValue(3.5)} className='dropdown-item'>3.5 star</button></li>
                <li><button onClick={() => starValue(4)} className='dropdown-item'>4 star</button></li>
                <li><button onClick={() => starValue(4.5)} className='dropdown-item'>4.5 star</button></li>
                <li><button onClick={() => starValue(5)} className='dropdown-item'>5 star</button></li>
            </ul>
            <StarsReview rating={starInput} size={32}/>

            {displayInput && 
                <form method='POST' action='#'>
                    <hr/>

                    <div className='mb-3'>
                        <label className='form-label'>
                            Description
                        </label>
                        <textarea className='form-control' id='submitReviewDescription' placeholder='Optional'
                            rows={3} onChange={e => setReviewDescription(e.target.value)}>
                        </textarea>
                    </div>

                    <div>
                        <button type='button' onClick={() => props.submitReview(starInput, reviewDescription)} className='btn btn-primary mt-3'>Submit Review</button>
                    </div>
                </form>
            }

        </div>
    );
}