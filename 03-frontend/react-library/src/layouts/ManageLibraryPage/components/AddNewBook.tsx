import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import AddBookRequest from '../../../models/AddBookRequest';

export const AddNewBook = () => {

    const { authState } = useOktaAuth();

    // New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }

    /* 
        Blob（Binary Large Object，二进制大对象）是一种表示大量二进制数据的通用数据结构。在计算机编程中，Blob通常用于存储和传输诸如图像、音频、视频等大型媒体文件，以及其他二进制数据。Blob文件不限于特定的文件类型，它们可以是任何形式的大型二进制数据。

        在Web开发中，Blob对象表示不可变的原始二进制数据。它们通常用于处理大型文件，如图像、PDF等，以及用于文件操作、上传、下载等场景 
    */
    async function base64ConversionForImages(e: any) {
        // file存在
        if (e.target.files[0]) {
            // 任何形式的文件都可以转换为Base64编码。
            // Base64编码是一种二进制到文本的编码方案，用于将二进制数据转换为可打印的ASCII字符组成的字符串。这种编码主要用于在文本协议（如电子邮件、HTML中的嵌入图像）中传输二进制数据。由于文本协议通常只允许使用可打印的字符，因此Base64编码成为一种将二进制数据转换为文本格式的有效方法。
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        // 创建一个新的FileReader实例：let reader = new FileReader();
        let reader = new FileReader();
        // 调用reader.readAsDataURL(file);，将文件作为参数传入。这个方法将异步读取文件，并将其转换为Base64编码的数据URL。
        reader.readAsDataURL(file);
        // reader.onload：定义一个事件处理程序，当文件成功读取完成时执行。在这个例子中，处理程序将读取到的数据URL赋值给setSelectedImage。
        reader.onload = function () {
            setSelectedImage(reader.result);
        };
        // reader.onerror：定义一个事件处理程序，当文件读取发生错误时执行。在这个例子中，处理程序将错误信息打印到控制台。
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewBook() {
        const url = `${process.env.REACT_APP_API}/admin/secure/add/book`;
        if (authState?.isAuthenticated && title !== '' && author !== '' && category !== 'Category' 
            && description !== '' && copies >= 0) {
                const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category);
                book.img = selectedImage;
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                };

                const submitNewBookResponse = await fetch(url, requestOptions);
                if (!submitNewBookResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                setTitle('');
                setAuthor('');
                setDescription('');
                setCopies(0);
                setCategory('Category');
                setSelectedImage(null);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
    }

    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                    Book added successfully
                </div>
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Add a new book
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Author </label>
                                <input type="text" className='form-control' name='author' required 
                                    onChange={e => setAuthor(e.target.value)} value={author}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Category</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {category}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => categoryField('FE')} className='dropdown-item'>Front End</a></li>
                                    <li><a onClick={() => categoryField('BE')} className='dropdown-item'>Back End</a></li>
                                    <li><a onClick={() => categoryField('Data')} className='dropdown-item'>Data</a></li>
                                    <li><a onClick={() => categoryField('DevOps')} className='dropdown-item'>DevOps</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies</label>
                            <input type='number' className='form-control' name='Copies' required 
                                onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                        </div>
                        <input type='file' onChange={e => base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewBook}>
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}