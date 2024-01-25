import { Col, Row, Select, Input, Button, Form, Space, InputNumber } from 'antd';
import { useMainContext } from "../../providers/mainContext"

//Styles
import "./CreateItem.scss"

//Icons
import createCategory from '../../assets/icons/lista-de-verificacion.png';
import { useState } from 'react';

//Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkCategoryFirebase, createCategoryFirebase, createProductFirebase } from '../../services/productsService';
import { NavbarComponent } from '../../components/NavbarComponent/NavbarComponent';


const { TextArea } = Input;

export const CreateItem = () => {

    //States
    const [titleCategory, setTitleCategory] = useState(""); //set title New Category

    //MainContext for bring all categories
    const { categories, getCategoriesFirebase } = useMainContext()

    //Fomr control
    const [form] = Form.useForm();

    //Notifications with Toastify
    // Notification of successful creation of the category
    const notifySuccess = () => toast.success('Created successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });

    // Existing category notification
    const notifyErrorCategory = () => toast.error('Category already exists', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });


    //Create the category
    const handleCreateCategory = async (e) => {
        e.preventDefault();

        const data = {
            titleCategory,
        }

        try {
            const fetchedData = await checkCategoryFirebase(titleCategory);
            if (fetchedData.length > 0) {
                notifyErrorCategory()
                setTitleCategory("")
            } else {
                try {
                    await createCategoryFirebase("categories", data);
                    notifySuccess()
                    setTitleCategory("")
                    await getCategoriesFirebase("categories")
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }



    const handleCreateProduct = async (values) => {
        console.log(values)
        try {
            await createProductFirebase("products", values);
            notifySuccess()
            form.resetFields();
        } catch (error) {
            // notifyErrorProduct()
            form.resetFields();
        }
    }

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <div className="containerCreateItem">
                <NavbarComponent />
                <div className="create-content">
                    <Row>
                        <Col className='createCategory' xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }}>
                            <h1>Create a new Genre</h1>
                            <Input className='inputSend' prefix={<img src={createCategory} height={"50px"} />} onChange={(e) => setTitleCategory(e.target.value)} value={titleCategory} />
                            <Button type="primary" className='buttonSend' onClick={handleCreateCategory} >Create Category</Button>
                            <ToastContainer />
                        </Col>
                        <Col className='createProduct' xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }}>
                            <h1>Create a new video game reference</h1>
                            <Form form={form} name="createProduct" onFinish={handleCreateProduct} style={{ width: "100%", }} initialValues={{ priceGame: 14.5 }}>
                                <Form.Item
                                    name="titleGame"
                                    label={
                                        <span className="custom-label">
                                            Title Game
                                        </span>
                                    }
                                    rules={[{ required: true, },]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="descriptionGame"
                                    label={
                                        <span className="custom-label">
                                            Description Game
                                        </span>
                                    }
                                    rules={[{ required: true, },]}
                                >
                                    <TextArea
                                        rows={4}
                                        maxLength={500}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="genre"
                                    label={
                                        <span className="custom-label">
                                            Genre
                                        </span>
                                    }
                                    rules={[{ required: true, },]}
                                >
                                    <Select
                                        placeholder="Select a option"
                                        style={{ width: "50%" }}
                                    >
                                        {categories && categories.map(category => (
                                            <Select.Option
                                                key={category.id}
                                                value={category.titleCategory}
                                            >
                                                {category.titleCategory}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="priceGame"
                                    label={
                                        <span className="custom-label">
                                            Price Game
                                        </span>
                                    }
                                    rules={[{ required: true, },]}
                                >
                                    <InputNumber
                                        min={0}
                                        max={1000}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="imageLinkGame"
                                    label={
                                        <span className="custom-label">
                                            Image Link Game
                                        </span>
                                    }
                                    rules={[{ required: true, },]}
                                >
                                    <Input
                                        autoComplete="off"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className='buttonsSend'
                                >
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            Create a new reference
                                        </Button>
                                        <Button htmlType="button" onClick={onReset}>
                                            Reset Fields
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>

                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
