package com.loveReading.springbootlibrary.dao;

import com.loveReading.springbootlibrary.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

    // 创建了一个新的路径 http://localhost:8080/api/books
    /*

        当你使用JpaRepository来定义数据访问接口时，Spring Boot会自动根据接口的命名规则创建对应的RESTful API。在你的例子中，BookRepository继承了JpaRepository，表示它是一个用于访问Book实体的数据访问接口。由于JpaRepository已经封装了许多基本的数据访问方法（如增删改查等），因此你不需要手动编写这些方法的实现。相反，Spring Boot会根据命名规则自动生成对应的RESTful API。

        具体来说，根据Spring Data JPA的命名规则，当你定义了一个名为BookRepository的接口时，它会自动创建一个名为books的RESTful API资源。其中，books资源支持常见的HTTP方法（GET、POST、PUT、DELETE等），并且自动映射到JpaRepository提供的相应方法。例如，使用HTTP GET方法访问http://localhost:8080/api/books时，它会自动调用JpaRepository的findAll()方法，并返回所有的书籍列表。

        总之，当你定义了一个JpaRepository接口时，Spring Boot会自动创建对应的RESTful API资源，并将它们映射到相应的数据访问方法。这样，你就可以通过简单的命名规则来定义和访问RESTful API资源，从而快速地开发和部署Web应用程序。

    */
public interface BookRepository extends JpaRepository<Book, Long> {
    /*
        DAO接口是用来定义数据访问对象的，它们通常被用于定义数据访问方法和持久化的操作。在Spring Boot中，DAO接口通常通过注入到服务(Service)中使用。
        服务(Service)类通常是业务逻辑层，它们使用DAO接口来访问和操作数据。

        在Spring Boot应用程序中，控制器(Controller)用于处理HTTP请求并返回HTTP响应。控制器通常被定义为@Controller注解的类。而DAO接口通常被定义为@Repository注解的接口。
        但是，即使没有控制器(Controller)，Spring Boot应用程序仍然可以启动，只要所有的依赖项都已经配置好并且应用程序的入口点(main方法)已经定义好即可。
     */

     // Our Spring Boot backend uses Spring Data REST
     // Spring Data REST provides pagination support out of the box
     // By default, Spring Data REST returns: 20 elements
     // We can customize this by passing in parameters -> "http://localhost:8080/api/books?page=1&size=10"


    // Build a new API： http://localhost:8080/api/books/search/findByTitleContaining{?title,page,size,sort}
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);

}
