package com.loveReading.springbootlibrary.service;

import com.loveReading.springbootlibrary.dao.BookRepository;
import com.loveReading.springbootlibrary.dao.ReviewRepository;
import com.loveReading.springbootlibrary.entity.Review;
import com.loveReading.springbootlibrary.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {
    private BookRepository bookRepository;

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(BookRepository bookRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
    }


    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        /*
        map()是一种常见的函数式编程方法，通常用于将一个值转换为另一个值，并返回一个新的集合或对象，而不会改变原始集合或对象。
        map()方法接受一个函数作为参数，该函数将被应用于集合中的每个元素，并将其转换为另一个类型的元素。

        例如，假设有一个整数列表，我们想将每个元素乘以2，然后得到一个新的列表。
        我们可以使用map()方法来实现这个转换。具体实现如下：
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> doubledNumbers = numbers.stream().map(n -> n * 2).collect(Collectors.toList());
        在这个例子中，numbers列表包含5个整数，我们使用Java 8中的stream()方法将其转换为一个流。
        然后，我们调用map()方法并传递一个Lambda表达式，该表达式将每个元素乘以2。
        最后，我们使用collect()方法将转换后的元素收集到一个新的列表中，并将其赋值给doubledNumbers变量。

        map()方法还可以用于处理其他类型的集合或对象，如Optional、Map和Stream等。
        总之，map()方法是一种灵活且强大的函数式编程方法，可以大大简化代码，提高代码的可读性和可维护性。
        */
        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        // ::是Java 8中的方法引用操作符。它用于创建一个对现有方法的引用，而不是在Lambda表达式中编写完整的方法体。
        //  在这种情况下，Object::toString是一个方法引用，表示将Object类的toString()方法作为一个函数对象引用。
        // 它等价于使用Lambda表达式编写以下代码：reviewRequest -> reviewRequest.getReviewDescription().toString()
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateReview != null) {
            return true;
        } else {
            return false;
        }
    }

}
