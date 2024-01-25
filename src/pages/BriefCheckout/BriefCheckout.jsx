import { useEffect, useState } from "react";
import { NavbarComponent } from "../../components/NavbarComponent/NavbarComponent"
import { useMainContext } from "../../providers/mainContext"
import "./BriefCheckoutStyle.scss"

import { Table, Space, Row, Col, Form, Input, Button, InputNumber, Modal } from 'antd';
import youdidit from "../../assets/images/youdidit.png"
export const BriefCheckout = () => {
    const [buttonEnable, setButtonEnable] = useState(true);

    const [emails, setEmails] = useState({
        email: "h",
        reemail: "o",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);



    const { cartShopping, setCartShopping } = useMainContext()

    let counterProduct = 0;
    const newCartShopping = cartShopping.map(item => {
        let priceTotal = 0;
        counterProduct++;
        priceTotal = item.priceGame * item.quantity
        return { ...item, key: counterProduct, subtotal: priceTotal };
    });

    const totalPrice = newCartShopping.reduce((total, item) => total + item.subtotal, 0);

    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageLinkGame',
            key: 'imageLinkGame',
            render: (text) => <img src={text} height={50} />,
        },
        {
            title: 'Title',
            dataIndex: 'titleGame',
            key: 'titleGame',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Unit price',
            dataIndex: 'priceGame',
            key: 'priceGame',
            render: (text) => <p>${text}</p>
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (text) => <p>${text}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <button  onClick={handleRemove(record)}>Remove</button> */}
                    <button onClick={() => { handleRemove(record) }}>Remove</button>
                </Space>
            ),
        },
    ];


    const handleRemove = (data) => {
        const newCart = cartShopping.filter((item) => item.id !== data.id);
        setCartShopping(newCart);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        setIsModalOpen(true);
        setCartShopping([])
        onReset()
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        // console.log(name, value);
        setEmails({ ...emails, [name]: value })
    }

    useEffect(() => {
        if ((emails.email === emails.reemail) && newCartShopping.length != 0) {
            setButtonEnable(false);
        } else {
            setButtonEnable(true);
        }
    }, [emails.email, emails.reemail, newCartShopping]);

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onReset = () => {
        form.resetFields();
    };


    return (
        <>
            <div className="containerBrief">
                <NavbarComponent />
                <Row className="brief-content">
                    <Col className="briefResume" xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }}>
                        <Table dataSource={newCartShopping} columns={columns} />
                        <button className="btn third" onClick={() => { setCartShopping([]) }}>Empty cart</button>
                        <p className="totalPrice">Total price: ${totalPrice},00</p>
                    </Col>
                    <Col className="briefData" xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }}>
                        <Form
                            form={form}
                            className="formData"
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your full name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Please input your full name!" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}>
                                <InputNumber style={{ width: '80%' }} placeholder="1234567" />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input name='email' onChange={handleChange} />
                            </Form.Item>

                            <Form.Item
                                name='reemail'
                                label="Re-Email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input name='reemail' onChange={handleChange} />
                            </Form.Item>

                            <Form.Item className='buttonsSendData'>
                                <Button disabled={buttonEnable} type="primary" htmlType="submit" >
                                    Generate order
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Modal title="Purchase made" open={isModalOpen} footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]} onCancel={handleCancel}>
                    <div className="purchaseMade">
                        <img src={youdidit} alt="purchase made" />
                        <p>Purchase made</p>
                    </div>
                </Modal>
            </div>
        </>
    )
}

