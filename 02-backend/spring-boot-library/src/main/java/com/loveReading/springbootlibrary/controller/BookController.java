package com.loveReading.springbootlibrary.controller;

import com.loveReading.springbootlibrary.entity.Book;
import com.loveReading.springbootlibrary.service.BookService;
import com.loveReading.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// 用于允许跨域资源共享（CORS）。它可以用于控制Web应用程序如何处理来自其他域的请求，从而实现安全的跨域数据交换。
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

//    @GetMapping("/secure/currentloans")
//    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token)
//            throws Exception
//    {
//        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
//        return bookService.currentLoans(userEmail);
//    }

    // 具体的HTTP请求头中的"Authorization"标头通常包含一个身份验证令牌或密钥，以验证发送请求的用户身份。
    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token,
                                      @RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook (@RequestHeader(value = "Authorization") String token,
                              @RequestParam Long bookId) throws Exception {
        // @RequestParam 注解用于获取 URL 查询字符串中的参数值，而其中的 bookId 表示参数的名称，即查询字符串中的键名，对应于前面提到的 bookId。
        // 它是一个 Long 类型的参数，表示查询字符串中的值需要被转换为 Long 类型的数据。
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBook(userEmail, bookId);
    }

//    @PutMapping("/secure/return")
//    public void returnBook(@RequestHeader(value = "Authorization") String token,
//                           @RequestParam Long bookId) throws Exception {
//        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
//        bookService.returnBook(userEmail, bookId);
//    }
//
//    @PutMapping("/secure/renew/loan")
//    public void renewLoan(@RequestHeader(value = "Authorization") String token,
//                          @RequestParam Long bookId) throws Exception {
//        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
//        bookService.renewLoan(userEmail, bookId);
//    }

}
