import BookModel from "../../../models/BookModel"

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.book.img ?
                            <img src={props.book.img}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                        }
                    </div>
                    {/* 
                        For Mobile 
                        div className='d-none d-lg-block' 是一个具有Bootstrap框架的CSS类名的div元素。它的意思是在小屏幕设备上隐藏该元素（d-none），但在大屏幕设备上显示该元素（d-lg-block）
                    */}
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.book.img ?
                            <img src={props.book.img}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.book.author}
                        </h5>
                        <h4>
                            {props.book.title}
                        </h4>
                        <p className='card-text'>
                            {props.book.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <a className='btn btn-md main-color text-white' href='#'>
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
}