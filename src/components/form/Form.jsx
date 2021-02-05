import React, {useState, useEffect} from 'react';
import {
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import classnames from 'classnames';
import {useForm} from "react-hook-form";
import TabButton from "../tabs/tabButton/TabButton";

const AdForm = () => {
    const [activeTab, setActiveTab] = useState('1');
    const {register, handleSubmit, watch, errors, setError, clearErrors} = useForm();

    useEffect(() => {
        disableNextBtns()
    }, [])

    const onSubmit = data => {
        generateFormData(data)

        alert(JSON.stringify(data))
    };

    const onError = (errors) => {
        if (errors) {
            alert('Максимальное кол-во фото 5')
        }
    };

    const nextTab = () => {
        let tab = activeTab;
        if (tab === '0' || tab === '1') {
            disableNextBtns();
        }
        tab++;
        setActiveTab(String(tab))
    }

    const prevTab = () => {
        let tab = activeTab;
        tab--;
        setActiveTab(String(tab))
    }

    const disableNextBtns = () => {
        const buttons = document.querySelectorAll('button');

        for (let button = 0; button < buttons.length; button++) {
            if (buttons[button].innerText === 'Next') {
                buttons[button].setAttribute('disabled', 'disabled');
            }
        }
    }

    const enableNextBtns = () => {
        const buttons = document.querySelectorAll('button');

        for (let button = 0; button < buttons.length; button++) {
            if (buttons[button].innerText === 'Next') {
                buttons[button].removeAttribute('disabled');
            }
        }
    }

    const checkErrors = (inputName) => {
        const value = watch(inputName);

        if (value.trim().length < 1) {
            setError(inputName, {
                type: "minSymbols",
                message: "Поле не может быть пустым"
            });
            disableNextBtns();
        } else {
            clearErrors("title");
            enableNextBtns();
        }
    }

    const renderButtons = () => {
        if (activeTab < 2) {
            return (
                <>
                    <Col xs={{size: 6}}></Col>
                    <Col xs={{size: 1, offset: 5}}><TabButton selectTab={nextTab} title='Next'/></Col>
                </>
            )
        } else if (activeTab > 3) {
            return (
                <>
                    <Col xs={{size: 6}}><TabButton selectTab={prevTab} title='Prev'/></Col>
                    <Col xs={{size: 1, offset: 5}}><Button color="success">Save</Button></Col>
                </>
            )
        } else {
            return (
                <>
                    <Col xs={{size: 6}}><TabButton selectTab={prevTab} title='Prev'/></Col>
                    <Col xs={{size: 1, offset: 5}}><TabButton selectTab={nextTab} title='Next'/></Col>
                </>
            )
        }
    }

    const generateFormData = (data) => {
        const formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }

        return formData;
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '1'})}
                        >
                            Основная информация
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '2'})}
                        >
                            Контактная информация
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '3'})}
                        >
                            Фотография
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '4'})}
                        >
                            Публикация
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <FormGroup className="position-relative">
                                    <Label for="title">Заголовок</Label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Заголовок"
                                        ref={register({required: "Это обязательное поле!"})}
                                        onBlur={() => checkErrors('title')}
                                    />
                                    {errors.title?.message}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="desc">Описание</Label>
                                    <input type="textarea" name="desc" id="desc" ref={register}/>
                                </FormGroup>
                                <FormGroup check>
                                    <input type="checkbox" name="status" id="status" ref={register}/>
                                    <Label for="status" check>Статус on|off</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {renderButtons()}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <FormGroup className="position-relative">
                                    <Label for="phone">Номер телефона</Label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Номер телефона"
                                        ref={register({required: "Это обязательное поле!"})}
                                        onBlur={() => checkErrors('phone')}
                                    />
                                    {errors.phone?.message}
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup>
                                    <Label for="title">Емайл</Label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Емайл"
                                        ref={register}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {renderButtons()}
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <Label for="photo">Фотография</Label>
                                    <input
                                        type="file"
                                        name="photo"
                                        id="photo"
                                        placeholder="Фотография"
                                        ref={register({
                                            validate: value => value.length < 6
                                        })}
                                        multiple
                                    />
                                    {errors.photo && <p>Максимум 5 фото</p>}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {renderButtons()}
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <Col sm="6">
                                <FormGroup check>
                                    <input type="checkbox" name="service1" id="service1" ref={register}/>
                                    <Label for="service1" check>Услуга 1</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <input type="checkbox" name="service2" id="service2" ref={register}/>
                                    <Label for="service2" check>Услуга 2</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <input type="checkbox" name="service3" id="service3" ref={register}/>
                                    <Label for="service3" check>Услуга 3</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <input type="checkbox" name="service4" id="service4" ref={register}/>
                                    <Label for="service4" check>Услуга 4</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <input type="checkbox" name="service5" id="service5" ref={register}/>
                                    <Label for="service5" check>Услуга 5</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {renderButtons()}
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </Form>
    );
}

export default AdForm;
