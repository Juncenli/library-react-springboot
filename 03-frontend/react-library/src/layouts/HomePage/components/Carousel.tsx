import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import React from "react";
import { Link } from "react-router-dom";

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    /*
        In React, useEffect is a Hook that allows you to run side effects after a component renders. 
        Side effects are operations that affect something outside the scope of the component itself, such as fetching data from an API, updating the DOM, or setting up event listeners.

        The useEffect Hook takes two arguments: a function that contains the side effect code, and an array of dependencies. 
        The function will be called after the component renders, and any time the dependencies change. 
        If the array of dependencies is empty, the function will only be called once after the component mounts.
    */
    useEffect(() => {
        const fetchBooks = async () => {

            const baseUrl: string = "http://localhost:8080/api/books";

            // In TypeScript to be able to add the baseUrl into url you need to use the back tick ` instead of a single quote '.
            const url: string = `${baseUrl}?page=0&size=9`;

            // fetch data from springboot backend
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            // all of the books data
            const reponseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] = [];

            for (const key in reponseData) {
                loadedBooks.push({
                    id: reponseData[key].id,
                    title: reponseData[key].title,
                    author: reponseData[key].author,
                    description: reponseData[key].description,
                    copies: reponseData[key].copies,
                    copiesAvailable: reponseData[key].copiesAvailable,
                    category: reponseData[key].category,
                    img: reponseData[key].img,
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        }
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6, 9).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[7]} key={books[7].id} />
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
}