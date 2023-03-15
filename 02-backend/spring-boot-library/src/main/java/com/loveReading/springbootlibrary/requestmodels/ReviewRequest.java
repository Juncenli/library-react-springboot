package com.loveReading.springbootlibrary.requestmodels;

import lombok.Data;

import java.util.Optional;

/*
    The @Data annotation is from the Lombok library and is used to generate boilerplate code for Java classes.
    Specifically, the @Data annotation generates getters, setters, equals(), hashCode(), and toString() methods for all non-static fields in the class.
*/

@Data
public class ReviewRequest {
    private double rating;

    private Long bookId;
    /*
         Java 8 引入了 Optional 类，它提供了一种优雅的方式来处理可能为空的值，从而避免了空指针异常。

        在 Java 中，当我们使用一个对象的方法或访问其字段时，如果这个对象是 null，那么就会抛出一个 NullPointerException。这种异常可能会导致程序崩溃或产生其他不可预料的错误。

        Optional 类提供了一种解决这个问题的方法，它代表一个可能为空的值。使用 Optional 对象的方法可以判断一个值是否为空，避免了空指针异常的出现。如果一个值是空的，我们可以使用 Optional 对象的方法提供一个默认值或者执行一个备选操作，而不是直接使用这个空值。

        在实际开发中，Optional 类经常用于方法返回值、参数传递以及在流操作中过滤和转换数据。它可以帮助我们写出更加健壮和可读性更高的代码。但是需要注意的是，过度使用 Optional 类也可能会导致代码变得复杂和难以理解，所以需要谨慎使用。

        ---
        null与option的比较

        使用 == null 来判断一个对象是否为空是一个简单有效的方式，但是它并不适用于所有情况。在某些情况下，使用 Optional 类会更加清晰和安全。

        首先，使用 Optional 类可以更加明确地表达一个值是否可能为空。如果一个方法的返回值是一个 Optional 类型，那么调用者就知道这个方法返回的值可能为空，需要使用 Optional 的方法来处理这种情况。相比之下，如果一个方法返回一个普通的对象，调用者可能会认为这个对象不可能为空，从而在使用这个对象时没有进行 null 检查，导致空指针异常。

        其次，使用 Optional 类可以使代码更加简洁和可读。如果我们使用 == null 进行空值检查，那么在代码中可能会出现大量的空指针检查，使代码变得臃肿和难以维护。相比之下，使用 Optional 类可以使用链式调用的方式进行空值检查，使代码更加简洁和易于理解。

        最后，使用 Optional 类可以避免一些常见的空指针异常问题。例如，使用 Optional 类可以避免多线程情况下的空指针异常问题，因为 Optional 类的方法都是线程安全的。
    */
    private Optional<String> reviewDescription;

}
